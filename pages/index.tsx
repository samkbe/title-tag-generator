import type { NextPage } from "next";
import { Inputs } from "../components/inputs";

const Home: NextPage = () => {
  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="rounded-md shadow-2xl bg-blue-300 flex h-96 w-96">
        <Inputs />
      </div>
    </div>
  );
};

export default Home;
