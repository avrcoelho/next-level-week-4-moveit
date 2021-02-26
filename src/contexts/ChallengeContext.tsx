import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";

import { LevelUpModal } from "../components/LevelUpModal";

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
  closeLevelUpModal(): void;
}

interface ChallengeProviderProps {
  level: number;
  currentExperience: number;
  chanllengeCompleted: number;
  children: ReactNode;
}

export const ChallehngeContext = createContext({} as ChallengeContextData);

export const ChallengeProvider = ({
  children,
  ...rest
}: ChallengeProviderProps) => {
  const [level, setLevel] = useState(rest.level ?? 1);
  const [currentExperience, setCurrentExperience] = useState(
    rest.currentExperience ?? 1
  );
  const [chanllengeCompleted, setChanllengeCompleted] = useState(
    rest.chanllengeCompleted ?? 1
  );
  const [activeChallenge, setActiveChallenge] = useState<typeof challenges[0]>(
    null
  );
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false);

  useEffect(() => {
    Notification.requestPermission();
  }, []);

  useEffect(() => {
    Cookies.set("level", String(level));
    Cookies.set("currentExperience", String(currentExperience));
    Cookies.set("chanllengeCompleted", String(chanllengeCompleted));
  }, [level, currentExperience, chanllengeCompleted]);

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

  const levelUp = () => {
    setLevel(level + 1);
    setIsLevelUpModalOpen(true);
  };

  const closeLevelUpModal = () => {
    setIsLevelUpModalOpen(false);
  };

  const startNewChallenge = () => {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
    const challenge = challenges[randomChallengeIndex];

    setActiveChallenge(challenge);

    if (Notification.permission === "granted") {
      new Audio("/notification.mp3").play();
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
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallehngeContext.Provider>
  );
};
