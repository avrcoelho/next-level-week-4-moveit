import { createContext, ReactNode, useState } from "react";

import challenges from "../../challenges.json";

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  chanllengeCompleted: number;
  activeChallenge: typeof challenges[0];
  levelUp(): void;
  startNewChallenge(): void;
}

interface ChallengeProvider {
  children: ReactNode;
}

export const ChallehngeContext = createContext({} as ChallengeContextData);

export const ChallengeProvider = ({ children }: ChallengeProvider) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [chanllengeCompleted, setChanllengeCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState(null);

  const levelUp = () => {};

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);
  };

  return (
    <ChallehngeContext.Provider
      value={{
        level,
        currentExperience,
        chanllengeCompleted,
        activeChallenge,
        levelUp,
        startNewChallenge,
      }}
    >
      {children}
    </ChallehngeContext.Provider>
  );
};
