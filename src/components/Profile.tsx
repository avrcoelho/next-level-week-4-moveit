import { useContext } from "react";

import { ChallehngeContext } from "../contexts/ChallengeContext";
import styles from "../styles/components/Profile.module.css";

export const Profile = () => {
  const { level } = useContext(ChallehngeContext);

  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/avrcoelho.png" alt="André Coelho" />
      <div>
        <strong>André Coelho</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level {level}
        </p>
      </div>
    </div>
  );
};
