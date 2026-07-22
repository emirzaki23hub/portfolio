import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import Header from "../components/Header";
import Hero from "../components/Hero";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

const About = dynamic(() => import("../components/About"), { ssr: true });
const Projects = dynamic(() => import("../components/Projects"), { ssr: true });
const Contact = dynamic(() => import("../components/Contact"), { ssr: true });

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const scrollingRef = useRef(false);

  const handleSetActive = (id) => {
    scrollingRef.current = true;
    setActiveSection(id);
  };

  useEffect(() => {
    const sections = ["hero", "about", "projects", "contact"];

    // Block observer during programmatic smooth scroll
    // Reset flag when scrolling stops (scrollend) or after inactivity (fallback)
    let scrollTimer;
    const resetScrollFlag = () => { scrollingRef.current = false; };
    const onScroll = () => {
      if (scrollingRef.current) {
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(resetScrollFlag, 300);
      }
    };
    window.addEventListener("scrollend", resetScrollFlag);
    window.addEventListener("scroll", onScroll, { passive: true });

    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -30% 0px",
      threshold: 0,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !scrollingRef.current) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
      window.removeEventListener("scrollend", resetScrollFlag);
      window.removeEventListener("scroll", onScroll);
      clearTimeout(scrollTimer);
    };
  }, []);

  const siteUrl = "https://www.emirzaki.my.id";
  const siteName = "Emirzaki — Frontend Engineer & Portfolio";
  const title = "Emirzaki | Frontend Engineer & Web Developer";
  const description =
    "Frontend engineer specializing in React, TypeScript, and high-performance web architectures. Based in Jakarta, building scalable digital experiences.";
  const ogImage = `${siteUrl}/og-image.png`;

  return (
    <>
      <Head>
        {/* Page Title */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="frontend engineer, react developer, typescript, web developer, portfolio, jakarta, indonesia, emir zaki" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content={siteName} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content="en_ID" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Robots */}
        <meta name="robots" content="index, follow" />

        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Muhammad Emirzaki",
              givenName: "Emirzaki",
              familyName: "Muhammad",
              jobTitle: "Frontend Engineer",
              url: siteUrl,
              email: "emirzakimuhammad@gmail.com",
              address: { "@type": "PostalAddress", addressLocality: "Jakarta, Indonesia" },
              sameAs: [
                "https://github.com/emirzaki",
                "https://linkedin.com/in/emir-zaki",
              ],
            }),
          }}
        />
      </Head>

      {/* Awwwards-style Preloader */}
      <Preloader />

      {/* Main Content with fade-in after preloader */}
      <div
        className="bg-navy text-[#F0F0F0] min-h-screen font-sans selection:bg-white selection:text-black overflow-x-hidden antialiased"
      >
      <Header
        activeSection={activeSection}
        setActiveSection={handleSetActive}
      />

      <main>
        <Hero setActiveSection={handleSetActive} />
        <About />
        <Projects />
        <Contact />
      </main>

      <Footer />
    </div>
    </>
  );
}

