import React from "react";
import userData from "@/constant/data";

import {
  AiFillTwitterCircle,
  AiFillLinkedin,
  AiFillYoutube,
} from "react-icons/ai";
import { BsFillMoonStarsFill } from "react-icons/bs";

const About = () => {
  return (
    <section className="md:py-20">
      <div className="text-center items-center grid grid-cols-1 md:grid-cols-2 gap-4  container mx-auto">
        <div>
          <h2 className="text-5xl py-2 text-black font-medium md:text-6xl">
            Hi, I am Emir!
          </h2>
          <h3 className="text-4xl py-2 text-black font-medium ">
            {userData.designation}
          </h3>
          <p className="md:p-0 p-4">{userData.about.description}</p>
        </div>

        {/* <div className="text-5xl flex justify-center gap-16 py-3 text-gray-600 dark:text-gray-400">
          <AiFillTwitterCircle />
          <AiFillLinkedin />
          <AiFillYoutube />
        </div> */}
        <div className="bg-gradient-to-b from-teal-500 h-80 md:h-96 md:mt-20 md:w-96 mx-auto overflow-hidden relative rounded-full w-80">
          <img src="https://avatars.githubusercontent.com/u/81272344?v=4" />
        </div>
      </div>
    </section>
  );
};

export default About;
