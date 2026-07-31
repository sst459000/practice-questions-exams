import { createContext, useContext } from "react";

const BankNavigationContext = createContext(null);

export function BankNavigationProvider({ value, children }) {
  return <BankNavigationContext.Provider value={value}>{children}</BankNavigationContext.Provider>;
}

export function useBankNavigation() {
  const context = useContext(BankNavigationContext);
  if (!context) throw new Error("useBankNavigation must be used inside BankNavigationProvider");
  return context;
}
