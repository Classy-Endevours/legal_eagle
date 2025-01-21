"use client";
import Home from "@/components/Legal_eagle/Home";
import ClauseProvider from "@/hooks/useClause";
import React from "react";

const Page = () => {
  return (
    <ClauseProvider>
      <Home />
    </ClauseProvider>
  );
};

export default Page;
