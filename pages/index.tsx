import type { NextPage } from "next";
import { Inputs } from "../components/";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="rounded-md shadow-xl bg-white w-full max-w-screen-md flex flex-col md:w-2/4 mx-4 h-3/4">
        <Inputs />
      </div>
    </div>
  );
};

export default Home;
