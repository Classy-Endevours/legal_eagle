"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X } from "lucide-react";
import ClauseLibrary from "@/components/Legal_eagle/ClauseLibrary";
import TermsAndCondition from "@/components/Legal_eagle/TermsAndCondition";
import AIResults from "@/components/Legal_eagle/AIResults";
import EditDialog from "@/components/Legal_eagle/EditDialog";
import { Bot, FileText, PenLine } from "lucide-react";
import Summarize from "@/components/Legal_eagle/Summarize";
import DocxUpload from "@/components/Legal_eagle/DocumentUpload";
import ClauseProvider, { useClause } from "@/hooks/useClause";
import FileList from "@/components/Legal_eagle/DisplayFiles";
import { Textarea } from "@/components/ui/textarea";
import { fetchAllFiles } from "@/app/actions/document";
import { modifyClause } from "@/app/actions/user/modifyClause";
import { BeatLoader } from "react-spinners";
enum EUserAction {
  runAI = "runAI",
  summarize = "summarize",
  write = "write",
  default = "default",
}

export interface IFile {
  content: string;
  _id: string;
}
export interface ISelectedResult {
  status: string;
  title: string;
  description: string;
}

export default function Home() {
  const [isSheetStarted, setIsSheetStarted] = useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("isSheetStarted");
      return saved === "true";
    }
    return false;
  });
  const [activeTab, setActiveTab] = useState("review");
  const [userPrompt, setUserPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedResult, setSelectedResult] =
    useState<ISelectedResult | null>();
  const [selectedAction, setSelectedAction] = useState<EUserAction>(
    EUserAction.default
  );
  const [files, setFiles] = useState<IFile[]>();
  const [aiGeneratedEdit, setAiGeneratedEdit] = useState("");
  const { content, setContent } = useClause();

  useEffect(() => {
    localStorage.setItem("isSheetStarted", isSheetStarted.toString());
  }, [isSheetStarted]);

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = async () => {
    try {
      const data = await fetchAllFiles();
      setFiles(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModifyClause = async () => {
    try {
      setLoading(true);
      const response = await modifyClause(userPrompt, content);
      setAiGeneratedEdit(response.result);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const handleInsertDoc = () => {
    setContent(aiGeneratedEdit);
  };

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
        // onSelectedResult={(v) => setSelectedResult(v)}
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

        <div className="flex justify-center p-4">
          <Textarea
            placeholder="Enter your prompt..."
            className="mb-4"
            onChange={(e) => setUserPrompt(e.target.value)}
          />
        </div>
        <Button
          className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90 mb-4"
          onClick={handleModifyClause}
        >
          {loading ? (
            <>
              <BeatLoader color="white" />
            </>
          ) : (
            "Submit"
          )}
        </Button>

        {aiGeneratedEdit && (
          <>
            <div className="mt-8 p-6 border rounded-md bg-white shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">
                Document Content:
              </h3>
              <div className="overflow-y-auto max-h-96">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 break-words">
                  {aiGeneratedEdit}
                </pre>
              </div>
            </div>
            <Button
              onClick={handleInsertDoc}
              className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90"
            >
              Insert in Doc
            </Button>
          </>
        )}
      </div>
    ),
    [EUserAction.default]: <></>,
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Main Content Area */}
      <div className="flex-1 px-4">
        <div className="max-w-4xl mx-auto pt-20">
          <DocxUpload />
        </div>
        <FileList files={files!} />
      </div>

      {/* Right Panel */}
      <div className="w-[50vw] border-l min-h-screen flex flex-col">
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
              value={activeTab}
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
        selectedResult={selectedResult as ISelectedResult}
      />
    </div>
  );
}
