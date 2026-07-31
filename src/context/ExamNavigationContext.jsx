import { createContext, useContext } from "react";

const ExamNavigationContext = createContext(null);

export function ExamNavigationProvider({ value, children }) {
  return <ExamNavigationContext.Provider value={value}>{children}</ExamNavigationContext.Provider>;
}

export function useExamNavigation() {
  const context = useContext(ExamNavigationContext);
  if (!context) throw new Error("useExamNavigation must be used inside ExamNavigationProvider");
  return context;
}
