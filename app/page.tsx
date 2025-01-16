"use client";

import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Search,
  Plus,
  Bot,
  FileText,
  PenLine,
  X,
  Edit,
  Maximize2,
  Check,
  Star,
} from "lucide-react";
import { Label } from "@radix-ui/react-context-menu";

export default function Home() {
  const [isSheetStarted, setIsSheetStarted] = useState(true || false);
  const [activeTab, setActiveTab] = useState("review");
  const [selectedResult, setSelectedResult] = useState<any>(null);
  const [isWriteMode, setIsWriteMode] = useState(false);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const mockAIResults = [
    {
      type: "Missing",
      title: "Indemnity",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      type: "Needs Review",
      title: "Warranty",
      description: "Lorem ipsum dolor sit amet, consectetur",
    },
    {
      type: "Needs Review",
      title: "Terms",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    {
      type: "Missing",
      title: "Payments",
      description: "Lorem ipsum dolor sit amet, consectetur",
    },
  ];

  const handleSheetOpenChange = (open: boolean) => {
    setIsSheetOpen(open);
    if (!open) {
      // Reset sheet to welcome state when closed
      setIsSheetStarted(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto pt-20 px-4">
        <div className="flex justify-center items-center gap-4 text-4xl m-8 font-bold">
          <Label className="bg-gradient-to-bl from-blue-500 to-blue-800 bg-clip-text text-transparent leading-normal">
            Leagle Eagle
          </Label>{" "}
          <Star />
        </div>
        <div className="relative">
          <Input
            className="w-full pl-12 pr-4 py-3 text-lg rounded-lg border-2 border-gray-200 focus:border-[#1e3a8a] focus:ring-[#1e3a8a]"
            placeholder="Ask anything..."
          />
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
      </div>

      <Sheet open={isSheetOpen} onOpenChange={handleSheetOpenChange}>
        <SheetTrigger asChild>
          <Button className="fixed right-4 top-4 bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
            Open Menu
          </Button>
        </SheetTrigger>
        <SheetContent className="w-[400px] sm:w-[540px] p-0">
          {!isSheetStarted ? (
            <div className="h-full flex flex-col items-center justify-center p-6 text-center bg-white">
              <h2 className="text-2xl font-bold text-[#1e3a8a] mb-4">
                Legal Eagle AI
              </h2>
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
                  onClick={() => setIsSheetStarted(true)}
                >
                  Get started
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="bg-[#1e3a8a] p-4">
                <h2 className="text-xl font-semibold text-white">
                  Legal Eagle AI
                </h2>
              </div>

              <Tabs
                defaultValue="review"
                className="w-full"
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

                <TabsContent value="review" className="p-4">
                  {isWriteMode ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">Write</h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setIsWriteMode(false)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-gray-600">
                        Lorem ipsum dolor sit amet, consectetur
                      </p>
                      <Input
                        placeholder="Enter your text here..."
                        className="mb-4"
                      />
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
                  ) : (
                    <div className="space-y-4">
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                      >
                        <Bot size={20} /> Run AI
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                      >
                        <FileText size={20} /> Summarize
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full justify-start gap-2"
                        onClick={() => setIsWriteMode(true)}
                      >
                        <PenLine size={20} /> Write
                      </Button>

                      <div className="space-y-4 mt-8">
                        <h3 className="font-semibold">AI Results</h3>
                        {mockAIResults.map((result, index) => (
                          <div
                            key={index}
                            className="border rounded-lg p-4 relative"
                          >
                            <div
                              className={`inline-flex items-center gap-2 mb-2 ${
                                result.type === "Missing"
                                  ? "text-red-500"
                                  : "text-yellow-500"
                              }`}
                            >
                              <span className="w-2 h-2 rounded-full bg-current" />
                              {result.type}
                            </div>
                            <h4 className="font-medium">{result.title}</h4>
                            <p className="text-sm text-gray-600">
                              {result.description}
                            </p>
                            <div className="absolute top-4 right-4 space-x-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => setSelectedResult(result)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="clause-library" className="p-4">
                  <div className="space-y-4">
                    <Button className="w-full justify-start gap-2">
                      <Plus size={20} /> Add Clause
                    </Button>
                    <div className="relative">
                      <Input placeholder="Search Library" className="pl-10" />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    </div>

                    <div className="space-y-4 mt-4">
                      <div className="space-y-4">
                        <Input placeholder="Clause Type" />
                        <Input placeholder="Category" />
                        <Input placeholder="Preferences" />
                        <textarea
                          className="w-full h-32 p-3 border rounded-md"
                          placeholder="Enter Clause text here"
                        />
                        <div className="text-right text-sm text-gray-500">
                          0/100
                        </div>
                        <Button className="w-full bg-[#1e3a8a] hover:bg-[#1e3a8a]/90">
                          Save to Library
                        </Button>
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Dialog
        open={!!selectedResult}
        onOpenChange={() => setSelectedResult(null)}
      >
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>
              <div
                className={`inline-flex items-center gap-2 ${
                  selectedResult?.type === "Missing"
                    ? "text-red-500"
                    : "text-yellow-500"
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-current" />
                {selectedResult?.type}
              </div>
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
    </div>
  );
}
