import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const TermsAndCondition = ({ onGetStarted }: { onGetStarted: () => void }) => {

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-white">
      <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">Legal Eagle AI</h2>
      <p className="text-gray-600 mb-8">Lorem ipsum dolor sit amet</p>
      <div className="w-full space-y-4 max-w-sm">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <Check className="w-5 h-5 text-[#1e3a8a]" />
            </div>
            <p className="text-gray-600 text-left">
              Lorem ipsum dolor sit amet, consectetur
            </p>
          </div>
        ))}
        <Button
          className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 mt-6"
          onClick={onGetStarted}
        >
          Get started
        </Button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
