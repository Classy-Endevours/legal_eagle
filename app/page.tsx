"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Maximize2, Star } from "lucide-react";
import { Label } from "@radix-ui/react-context-menu";
import ClauseLibrary from "@/components/Legal_eagle/ClauseLibrary";
import TermsAndCondition from "@/components/Legal_eagle/TermsAndCondition";
import AIResults from "@/components/Legal_eagle/AIResults";
import EditDialog from "@/components/Legal_eagle/EditDialog";
import { Bot, FileText, PenLine } from "lucide-react";
import Summarize from "@/components/Legal_eagle/Summarize";
enum EUserAction {
  runAI = "runAI",
  summarize = "summarize",
  write = "write",
  default = "default",
}

export default function Home() {
  const [isSheetStarted, setIsSheetStarted] = useState(false);
  const [activeTab, setActiveTab] = useState("review");
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [isWriteMode, setIsWriteMode] = useState(false);
  const [selectedAction, setSelectedAction] = useState<EUserAction>(
    EUserAction.default
  );

  const ActionContent = {
    [EUserAction.runAI]: (
      <AIResults
        onSelectedResult={(v) => setSelectedResult(v)}
        onClose={() => setSelectedAction(EUserAction.default)}
      />
    ),
    [EUserAction.summarize]: (
      <Summarize
        onClose={() => setSelectedAction(EUserAction.default)}
        onSelectedResult={(v) => setSelectedResult(v)}
      />
    ),
    [EUserAction.write]: (
      <div className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Write</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSelectedAction(EUserAction.default)}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-gray-600">Lorem ipsum dolor sit amet, consectetur</p>
        <Input placeholder="Enter your text here..." className="mb-4" />
        <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 mb-4">
          Submit
        </Button>
        <div className="border rounded-lg p-4 min-h-[200px] relative">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2"
          >
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
        <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
          Insert in Doc
        </Button>
      </div>
    ),
    [EUserAction.default]: <></>,
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Main Content Area */}
      <div className="flex-1 px-4">
        <div className="max-w-4xl mx-auto pt-20">
          <div className="flex justify-center items-center gap-4 text-4xl m-8 font-bold">
            <Label className="bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent leading-normal">
              Legal Eagle
            </Label>
            <Star color="#4032a4" />
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-[400px] sm:w-[540px] border-l min-h-screen flex flex-col">
        {!isSheetStarted ? (
          <TermsAndCondition onGetStarted={() => setIsSheetStarted(true)} />
        ) : (
          <>
            <div className="bg-[#1e3a8a] p-4">
              <h2 className="text-xl font-semibold text-white">
                Legal Eagle AI
              </h2>
            </div>

            <Tabs
              defaultValue="review"
              className="w-full flex-1"
              onValueChange={setActiveTab}
            >
              <TabsList className="w-full justify-start p-4 bg-transparent">
                <TabsTrigger
                  value="review"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#1e3a8a] data-[state=active]:underline"
                >
                  Review
                </TabsTrigger>
                <TabsTrigger
                  value="clause-library"
                  className="data-[state=active]:bg-transparent data-[state=active]:text-[#1e3a8a] data-[state=active]:underline"
                >
                  Clause Library
                </TabsTrigger>
              </TabsList>

              <TabsContent value="review" className="p-4 flex-1">
                {selectedAction === EUserAction.default && (
                  <div className="space-y-4 max-h-[calc(100vh-180px)] overflow-y-auto">
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => setSelectedAction(EUserAction.runAI)}
                    >
                      <Bot size={20} /> Run AI
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => setSelectedAction(EUserAction.summarize)}
                    >
                      <FileText size={20} /> Summarize
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-2"
                      onClick={() => setSelectedAction(EUserAction.write)}
                    >
                      <PenLine size={20} /> Write
                    </Button>
                  </div>
                )}
                {ActionContent[selectedAction]}
              </TabsContent>

              <TabsContent value="clause-library" className="p-4 flex-1">
                <ClauseLibrary />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>

      <EditDialog
        onOpenChange={() => setSelectedResult(null)}
        selectedResult={selectedResult}
      />
    </div>
  );
}
