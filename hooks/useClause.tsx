import { analyzeClause } from "@/app/actions/clauseAnalysis";
import { createContext, ReactNode, useContext, useState } from "react";

const ClauseContext = createContext<IClause>({
  clauses: [],
  handleClause: () => {},
  setContent: () => {},
  content: "",
  loading: false,
});

interface IClause {
  clauses: IClauseData[];
  handleClause: () => void;
  setContent: (v: string) => void;
  content: string;
  loading: boolean;
}

interface IClauseData {
  title: string;
  description: string;
  status: "Needs Review" | "Missing" | string;
}

const ClauseProvider = ({ children }: { children: ReactNode }) => {
  const [clauses, setClauses] = useState<IClauseData[]>([]);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClause = async () => {
    try {
      setLoading(true);
      const { result } = await analyzeClause(content);

      setClauses(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <ClauseContext.Provider
      value={{ clauses, handleClause, content, setContent, loading }}
    >
      {children}
    </ClauseContext.Provider>
  );
};

export default ClauseProvider;

export const useClause = () => useContext(ClauseContext);
