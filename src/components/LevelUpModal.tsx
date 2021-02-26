import { useContext } from "react";

import { ChallehngeContext } from "../contexts/ChallengeContext";

import styles from "../styles/components/LevelUpModal.module.css";

export const LevelUpModal = () => {
  const { level, closeLevelUpModal } = useContext(ChallehngeContext);

  return (
    <div className={styles.overlay}>
      <div className={styles.container}>
        <header>{level}</header>

        <strong>Parabéns</strong>
        <p>Você aclcançou um novo level</p>

        <button onClick={closeLevelUpModal} aria-label="Fechar">
          <img src="/icons/close.svg" alt="Fechar modal" />
        </button>
      </div>
    </div>
  );
};
