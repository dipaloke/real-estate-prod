"use client";

// This component wraps the application with necessary providers, such as Redux store.

import StoreProvider from "@/state/redux";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      {children}
    </StoreProvider>
  );
}

export default Providers;
