import styles from "../styles/components/Profile.module.css";

export const Profile = () => {
  return (
    <div className={styles.profileContainer}>
      <img src="https://github.com/avrcoelho.png" alt="André Coelho" />
      <div>
        <strong>André Coelho</strong>
        <p>
          <img src="icons/level.svg" alt="Level" />
          Level 1
        </p>
      </div>
    </div>
  );
};
