import { createContext, ReactNode, useEffect, useState } from "react";

import challenges from "../../challenges.json";

interface ChallengeContextData {
  level: number;
  currentExperience: number;
  chanllengeCompleted: number;
  experienceToNextLevel: number;
  activeChallenge: typeof challenges[0];
  levelUp(): void;
  startNewChallenge(): void;
  resetChallenge(): void;
  completeChallenge(): void;
}

interface ChallengeProviderProps {
  children: ReactNode;
}

export const ChallehngeContext = createContext({} as ChallengeContextData);

export const ChallengeProvider = ({ children }: ChallengeProviderProps) => {
  const [level, setLevel] = useState(1);
  const [currentExperience, setCurrentExperience] = useState(0);
  const [chanllengeCompleted, setChanllengeCompleted] = useState(0);
  const [activeChallenge, setActiveChallenge] = useState<typeof challenges[0]>(
    null
  );

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const levelUp = () => {
    setLevel(level + 1);
  };

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    if (Notification.permission === "granted") {
      new Notification("Novo desafio 🎉", {
        body: `Valendo ${challenge.amount}xp`,
      });
    }
  };

  const resetChallenge = () => {
    setActiveChallenge(null);
  };

  const completeChallenge = () => {
    if (!activeChallenge) {
      return;
    }

    const { amount } = activeChallenge;
    let finalExperience = currentExperience + amount;

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel;
      levelUp();
    }

    setCurrentExperience(finalExperience);
    setActiveChallenge(null);
    setChanllengeCompleted(chanllengeCompleted + 1);
  };

  return (
    <ChallehngeContext.Provider
      value={{
        level,
        currentExperience,
        chanllengeCompleted,
        activeChallenge,
        experienceToNextLevel,
        levelUp,
        startNewChallenge,
        resetChallenge,
        completeChallenge,
      }}
    >
      {children}
    </ChallehngeContext.Provider>
  );
};
