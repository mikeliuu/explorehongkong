'use client';

import { createContext, useContext, useState } from 'react';

export enum IntroStatus {
  NotStarted = 'NOT_STARTED',
  InProgress = 'IN_PROGRESS',
  Completed = 'COMPLETED',
}

interface AppContextState {
  introStatus: IntroStatus;
  isIntroCompleted: boolean;
  setIntroStatus: (status: IntroStatus) => void;
}

const AppContext = createContext<AppContextState>({
  introStatus: IntroStatus.NotStarted,
  isIntroCompleted: false,
  setIntroStatus: () => {},
});

export function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [introStatus, setIntroStatus] = useState(IntroStatus.NotStarted);

  return (
    <AppContext.Provider
      value={{
        introStatus,
        isIntroCompleted: introStatus === IntroStatus.Completed,
        setIntroStatus,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => useContext(AppContext);
