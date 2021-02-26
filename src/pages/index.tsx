import Head from "next/head";
import { GetServerSideProps } from "next";

import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import { CompletedChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengeProvider } from "../contexts/ChallengeContext";

import styles from "../styles/pages/Home.module.css";

interface HomeProps {
  level: number;
  currentExperience: number;
  chanllengeCompleted: number;
}

export default function Home({
  level,
  currentExperience,
  chanllengeCompleted,
}: HomeProps) {
  return (
    <ChallengeProvider
      level={level}
      currentExperience={currentExperience}
      chanllengeCompleted={chanllengeCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | move.it</title>
        </Head>

        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async ({
  req,
}) => {
  const { level, currentExperience, chanllengeCompleted } = req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      chanllengeCompleted: Number(chanllengeCompleted),
    },
  };
};
