import React, { useState } from "react";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="flex mb-0 lg:-mb-12 items-center justify-between flex-wrap container mx-auto p-6">
      {/* <div className="flex md:flex-row justify-between items-center w-full"> */}
      <div className="flex flex-col">
        <img
          className="h-16"
          src="https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
        />
      </div>
      {/* <div className="space-x-8 md:block"> */}
      <div className="block lg:hidden">
        <button
          onClick={() => {
            setOpen(!open);
          }}
          className="items-center px-3 py-2 border rounded text-black border-black"
        >
          <svg
            className="fill-current h-4 w-full"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path
              className={`${open ? "hidden" : "block"}`}
              d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
            />

            <path
              clipRule="evenodd"
              fillRule="evenodd"
              className={`${open ? "block" : "hidden"}`}
              d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            />
          </svg>
        </button>
      </div>
      <div
        className={`${
          open ? "block border-b" : "hidden"
        }  w-full lg:block lg:border-none lg:items-center lg:w-auto `}
      >
        <div className="text-base lg:flex-grow">
          <a
            href="#About"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:underline mr-4"
          >
            About
          </a>
          <a
            href="#Projects"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:underline mr-4"
          >
            Projects
          </a>
          <a
            href="#Experience"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:underline mr-4"
          >
            Experience
          </a>
          <a
            href="#Repository"
            className="block mt-4 lg:inline-block lg:mt-0 text-black hover:underline mr-4"
          >
            Repository
          </a>
        </div>
      </div>
      {/* </div> */}
      {/* </div> */}
    </nav>
    // <nav className="flex container mx-auto items-center justify-between flex-wrap p-6">
    //   <div className="flex items-center flex-shrink-0 text-white mr-6">
    //     <img
    //       className="h-10"
    //       src="https://upload.wikimedia.org/wikipedia/en/6/60/No_Picture.jpg"
    //     />
    //   </div>
    //   <div className="block lg:hidden">
    //     <button className="flex items-center px-3 py-2 border rounded text-teal-200 border-black hover:text-teal-400 hover:border-teal-400">
    //       <svg
    //         className="fill-current h-3 w-3"
    //         viewBox="0 0 20 20"
    //         xmlns="http://www.w3.org/2000/svg"
    //       >
    //         <title>Menu</title>
    //         <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
    //       </svg>
    //     </button>
    //   </div>
    //   <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
    //     <div className="lg:flex-grow">
    //       <a href="#About" className="block mt-4 lg:inline-block lg:mt-0 mr-4">
    //         About
    //       </a>
    //       <a
    //         href="#Projects"
    //         className="block mt-4 lg:inline-block mr-4 lg:mt-0"
    //       >
    //         Projects
    //       </a>
    //       <a
    //         href="#Experience"
    //         className="block mt-4 lg:inline-block lg:mt-0  mr-4"
    //       >
    //         Experience
    //       </a>
    //       <a
    //         href="#Repository"
    //         className="block mt-4 lg:inline-block mr-4 lg:mt-0"
    //       >
    //         Repository
    //       </a>
    //     </div>
    //     <div>
    //       <a
    //         href="#"
    //         className="inline-block text-sm px-4 py-2 leading-none border roundedhover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
    //       >
    //         Download
    //       </a>
    //     </div>
    //   </div>
    // </nav>
  );
};

export default Navbar;
