import { useClause } from "@/hooks/useClause";
import React from "react";

interface FileItem {
  _id: string;
  content: string;
}

interface FileListProps {
  files: FileItem[];
}

const FileList = ({ files }: FileListProps) => {
  const { setContent, setDocument } = useClause();

  const handleClick = (file: FileItem) => {
    setDocument(file);
    setContent(file.content);
  };
  console.log({ files });
  if (!files?.length) {
    return <></>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <ul className="space-y-2">
        {files?.map((file) => (
          <li
            key={file._id}
            className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm border border-gray-200"
          >
            <span className="text-gray-700 truncate flex-1">
              {file.content}
            </span>
            <button
              onClick={() => handleClick(file)}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              Load
            </button>
          </li>
        ))}
      </ul>

      {files.length === 0 && (
        <p className="text-gray-500 text-center py-4">No items available</p>
      )}
    </div>
  );
};

export default FileList;
