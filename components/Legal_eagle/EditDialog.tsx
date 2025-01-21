import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ISelectedResult } from "./Home";

interface IEditDialog {
  selectedResult: ISelectedResult;
  onOpenChange: () => void;
}

const EditDialog = ({
  selectedResult,
  onOpenChange,
}: //  onOpenChange
IEditDialog) => {
  
  return (
    <Dialog
      open={!!selectedResult}
      onOpenChange={onOpenChange}
      // onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {selectedResult?.title && (
              <div
                className={`inline-flex items-center gap-2 ${
                  selectedResult?.status === "Missing"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {selectedResult?.status}
              </div>
            )}
            {/* <DialogClose
              
              className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700"
            >
              <span className="text-xl">&times;</span> 
            </DialogClose> */}
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{selectedResult?.title}</h3>
          <p className="text-gray-600">{selectedResult?.description}</p>
          <div className="flex justify-between gap-4">
            <Button className="flex-1 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
              Edit
            </Button>
            <Button className="flex-1" variant="outline">
              Replace
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
