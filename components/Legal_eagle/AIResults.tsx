"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Edit } from "lucide-react";
import { useClause } from "@/hooks/useClause";
import { MoonLoader, RotateLoader } from "react-spinners";

interface IAIResults {
  onSelectedResult: (v: any) => void;
  onClose: () => void;
}

const AIResults = ({ onSelectedResult, onClose }: IAIResults) => {
  const { clauses, handleClause, loading } = useClause();
  console.log({ clauses });
  useEffect(() => {
    handleClause();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center mt-32">
        <RotateLoader color="#7FFFD4" />
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-1">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">AI Results</h3>

        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      {clauses?.map((result, index) => (
        <div key={index} className="border rounded-lg p-4 relative">
          <div
            className={`inline-flex items-center gap-2 mb-2 ${
              result.status === "Missing" ? "text-red-500" : "text-yellow-500"
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-current" />
            {result.status}
          </div>
          <h4 className="font-medium">{result.title}</h4>
          <p className="text-sm text-gray-600">{result.description}</p>
          <div className="absolute top-4 right-4 space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onSelectedResult(result)}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AIResults;
