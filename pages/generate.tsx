import type { NextPage } from "next";
import { Inputs, NavBar } from "../components/";

const Generate: NextPage = () => {
  return (
    <>
      <NavBar />
      <div className="flex flex-col justify-center items-center pt-12">
        <h1 className="text-2xl font-bold">{"The <title> Tag Generator"}</h1>
        <div className="rounded-md shadow-xl bg-white w-full max-w-screen-md flex flex-col md:w-3/4 m-2 items-center justify-center transition-all duration-500">
          <Inputs />
        </div>
      </div>
    </>
  );
};

export default Generate;
