import { createContext, ReactNode, useState } from "react";

export const ChallehngeContext = createContext({});

interface ChallengeProvider {
  children: ReactNode;
}

export const ChallengeProvider = ({ children }: ChallengeProvider) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [chanllengeCompleted, setChanllengeCompleted] = useState(0);

  const levelUp = () => {};

  const startNewChallenge = () => {};

  return (
    <ChallehngeContext.Provider
      value={{
        level,
        currentExperience,
        chanllengeCompleted,
        levelUp,
        startNewChallenge,
      }}
    >
      {children}
    </ChallehngeContext.Provider>
  );
};
