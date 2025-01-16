import React from "react";
import { Button } from "@/components/ui/button";
import { Bot, FileText, PenLine } from "lucide-react";

interface IAIOptions {
  onWriteModeChange: () => void;
}

const AIOptions = ({ onWriteModeChange }: IAIOptions) => {
  return (
    <>
      <Button variant="ghost" className="w-full justify-start gap-2">
        <Bot size={20} /> Run AI
      </Button>
      <Button variant="ghost" className="w-full justify-start gap-2">
        <FileText size={20} /> Summarize
      </Button>
      <Button
        variant="ghost"
        className="w-full justify-start gap-2"
        onClick={onWriteModeChange}
      >
        <PenLine size={20} /> Write
      </Button>
    </>
  );
};

export default AIOptions;
