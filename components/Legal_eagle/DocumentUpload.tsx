"use client";
import React, { useState } from "react";
import mammoth from "mammoth";
import { useClause } from "@/hooks/useClause";



const DocxUpload: React.FC = () => {
  const { content, setContent } = useClause();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (
      file &&
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const arrayBuffer = e.target?.result;
        if (arrayBuffer instanceof ArrayBuffer) {
          mammoth
            .extractRawText({ arrayBuffer })
            .then((result) => {
              setContent(result.value);
            })
            .catch((err) => {
              console.error("Error reading DOCX file", err);
            });
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert("Please upload a valid DOCX file.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 font-roboto">
      {!content.length && (
        <div className="flex items-center justify-center w-full">
          <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-300 ease-in-out">
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg
                className="w-8 h-8 mb-4 text-gray-500"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 16"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">
                Only DOCX files are allowed.
              </p>
            </div>
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              accept=".docx"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      )}
      {content && (
        <div className="flex gap-4">
          <a
            className="inline-block  text-center  py-2 px-4 text-white transition-all rounded-md shadow-xl sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:bg-gradient-to-b dark:shadow-blue-900 shadow-blue-200 hover:shadow-2xl hover:shadow-blue-400 hover:-tranneutral-y-px "
            onClick={() => setContent("")}
          >
            Reset
          </a>
        </div>
      )}
      {content && (
          <div className="mt-8 p-6 border rounded-md bg-white shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4">
              Document Content:
            </h3>
            <div className="overflow-y-auto max-h-96">
              <pre className="whitespace-pre-wrap text-sm text-gray-700 break-words">
                {content}
              </pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocxUpload;
