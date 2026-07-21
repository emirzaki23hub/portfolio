import Head from "next/head";
import { useEffect, useState } from "react";
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
  const [userOverride, setUserOverride] = useState(false);

  // Initialize theme from localStorage if available, otherwise follow OS.
  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const storedTheme = window.localStorage.getItem("theme");
    if (storedTheme === "light" || storedTheme === "dark") {
      setIsDay(storedTheme === "light");
      setUserOverride(true);
      return;
    }

    const media = window.matchMedia("(prefers-color-scheme: light)");
    setIsDay(media.matches);

    const handleChange = (e) => {
      if (!window.localStorage.getItem("theme")) {
        setIsDay(e.matches);
      }
    };

    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !userOverride) return;
    window.localStorage.setItem("theme", isDay ? "light" : "dark");
  }, [isDay, userOverride]);

  const handleToggle = () => {
    setUserOverride(true);
    setIsDay((prev) => !prev);
  };

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
        <Navbar isDay={isDay} onToggleMode={handleToggle} />
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