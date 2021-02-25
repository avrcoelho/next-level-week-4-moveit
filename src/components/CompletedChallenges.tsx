import { useContext } from "react";
import { ChallehngeContext } from "../contexts/ChallengeContext";

import styles from "../styles/components/CompletedChallenges.module.css";

export const CompletedChallenges = () => {
  const { chanllengeCompleted } = useContext(ChallehngeContext);

  return (
    <div className={styles.completedChallengesContainer}>
      <span>Desafios completos</span>
      <span>{chanllengeCompleted}</span>
    </div>
  );
};
