import userData from "@/constant/data";
import React from "react";

export default function Projects() {
  return (
    <section className="py-20" id="Projects">
      <div className="container mx-auto bg-white">
        <h1 className="text-6xl max-w-lg font-bold text-gray-500 mb-10 md:mb-20 dark:text-gray-600 text-center lg:text-left">
          Projects
        </h1>

        {/* Grid starts here */}
        <div className="grid grid-cols-1  ">
          {userData.projects.map((proj, idx) => (
            <ProjectCard
              title={proj.title}
              link={proj.link}
              imgUrl={proj.imgUrl}
              number={`${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const ProjectCard = ({ title, link, imgUrl, number }) => {
  return (
    <a href={link} target="_blank" className="w-full block shadow-2xl">
      <div className="relative overflow-hidden ">
        <div className="object-cover">
          <img
            src={imgUrl}
            alt="portfolio"
            className="transform hover:scale-105 transition duration-2000 ease-out object-cover h-full w-full"
          />
        </div>
        <h1 className="absolute top-10 left-10 text-gray-50 font-bold text-xl bg-red-500 rounded-md px-2">
          {title}
        </h1>
        {/* <h1 className="absolute bottom-10 left-10 text-black font-bold text-xl">
          {number.length === 1 ? "0" + number : number}
        </h1> */}
      </div>
    </a>
  );
};
