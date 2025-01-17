import { analyzeClause } from "@/app/actions/clauseAnalysis";
import { createContext, ReactNode, useContext, useState } from "react";

const ClauseContext = createContext<IClause>({
  clauses: [],
  handleClause: () => {},
  setContent: () => {},
  content: "",
});

interface IClause {
  clauses: IClauseData[];
  handleClause: () => void;
  setContent: (v: string) => void;
  content: string;
}

interface IClauseData {
  title: string;
  description: string;
  status: "Needs Review" | "Missing" | string;
}

const ClauseProvider = ({ children }: { children: ReactNode }) => {
  const [clauses, setClauses] = useState<IClauseData[]>([]);
  const [content, setContent] = useState("");

  const handleClause = async () => {
    const { result } = await analyzeClause(content);

    setClauses(result);
  };
  return (
    <ClauseContext.Provider
      value={{ clauses, handleClause, content, setContent }}
    >
      {children}
    </ClauseContext.Provider>
  );
};

export default ClauseProvider;

export const useClause = () => useContext(ClauseContext);
