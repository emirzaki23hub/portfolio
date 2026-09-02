import React, { createContext, useContext } from "react";
import { portfolioData } from "@/data";
import type { PortfolioData } from "@/lib/strapi";

const PortfolioContext = createContext<PortfolioData>(portfolioData);

export function PortfolioProvider({
  value,
  children,
}: {
  value?: PortfolioData;
  children: React.ReactNode;
}) {
  return (
    <PortfolioContext.Provider value={value ?? portfolioData}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolio(): PortfolioData {
  return useContext(PortfolioContext);
}
