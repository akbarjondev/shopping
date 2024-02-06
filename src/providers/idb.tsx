"use client";

import { seedDatabase } from "@/config/seeds";
import { PropsWithChildren, createContext, useEffect } from "react";

const IDBContext = createContext(null);

export const IDBProvider = ({ children }: PropsWithChildren) => {
  // initialize the IndexedDB
  useEffect(() => {
    (async () => {
      await seedDatabase();
    })();
  }, []);

  return <IDBContext.Provider value={null}>{children}</IDBContext.Provider>;
};
