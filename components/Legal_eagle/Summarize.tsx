import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Edit, X } from "lucide-react";
import { useClause } from "@/hooks/useClause";
import { RotateLoader } from "react-spinners";

interface IAIResults {
  // onSelectedResult: (v: { title: string; description: string }) => void;
  onClose: () => void;
}

const mockAIResults = [
  {
    title: "Indemnity",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  },
  {
    title: "Warranty",
    description: "Lorem ipsum dolor sit amet, consectetur",
  },
  {
    title: "Terms",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    title: "Payments",
    description: "Lorem ipsum dolor sit amet, consectetur",
  },
];

const Summarize = ({
  //  onSelectedResult,
  onClose,
}: IAIResults) => {
  const { generateSummary, loading, summary } = useClause();

  useEffect(() => {
    generateSummary();
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
        <h3 className="font-semibold">Summarize</h3>

        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>
      {summary.map((item, index) => (
        <div key={index} className="border rounded-lg p-4 relative">
          <h4 className="font-medium">{item.title}</h4>
          <p className="text-sm text-gray-600">{item.summary}</p>
          {/* <div className="absolute top-4 right-4 space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              // onClick={() => onSelectedResult(result)}
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default Summarize;
