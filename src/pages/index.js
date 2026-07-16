import Head from "next/head";
import { useState } from "react";
import userData from "../constant/data";
import LatestCode from "@/components/LatestCode";
import getLatestRepos from "@/lib/getLatestRepo";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Preloader from "@/components/Preloader";

export default function Home({ repositories }) {
  const [isDay, setIsDay] = useState(false);
  const [introReady, setIntroReady] = useState(false);

  return (
    <div className={isDay ? "bg-day" : "bg-asphalt"}>
      <Head>
        <title>Muhammad Emirzaki — Front-End Engineer</title>
        <meta
          name="description"
          content="Portfolio of Muhammad Emirzaki, a front-end engineer building web applications."
        />
      </Head>
      <Preloader isDay={isDay} onDone={() => setIntroReady(true)} />
      <main>
        <Navbar isDay={isDay} onToggleMode={() => setIsDay(!isDay)} />
        <About isDay={isDay} introReady={introReady} />
        <Projects isDay={isDay} />
        <Experience isDay={isDay} />
        <LatestCode repositories={repositories} isDay={isDay} />
      </main>
    </div>
  );
}

export const getServerSideProps = async () => {
  let token = process.env.GITHUB_AUTH_TOKEN;
  const repositories = await getLatestRepos(userData, token);
  return {
    props: {
      repositories,
    },
  };
};