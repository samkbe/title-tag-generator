import type { NextPage } from "next";
import { useQuery } from "@tanstack/react-query";
import { Inputs, MetaTagDisplay } from "../components/";

const Home: NextPage = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    queryFn: () =>
      fetch("https://api.github.com/repos/tannerlinsley/react-query").then(
        (res) => res.json()
      ),
  });

  return (
    <div className="bg-gray-100 h-screen flex justify-center items-center">
      <div className="rounded-md shadow-xl bg-white w-full max-w-screen-sm flex flex-col md:w-2/4 mx-4">
        <Inputs />
        <SERP
          titleTag="Culligan Water: Home & Business Water Treatment Systems"
          descriptionTag="Culligan is the top company in Orange County for water softeners, reverse osmosis filters & full-service water treatment!"
          url="www.google.com"
        />
        <SERP
          titleTag="Culligan Water: Water Filters & Purifiers | Water Softeners"
          descriptionTag="Culligan International has 800 dealers in over 90 countries, and is a worldwide leader in water treatment solutions."
          url="www.google.com"
        />
        <SERP
          titleTag="Water Softeners | Culligan: Water Filters in Los Angeles"
          descriptionTag="Culligan is the top company in Los Angeles for water filters, softeners, water purification, and full-service water treatment."
          url="www.google.com"
        />

        {/* <MetaTagDisplay
          titleTag="Culligan San Antonio - Water Softener Experts"
          descriptionTag="Culligan San Antonio is your local water softener expert. We offer a variety of water softener systems to fit your needs. Call us today for a free water analysis!"
        /> */}
      </div>
    </div>
  );
};

type serpProps = {
  titleTag: string;
  descriptionTag: string;
  url: string;
};

function SERP({ titleTag, descriptionTag, url }: serpProps) {
  return (
    <div className="p-2 m-1">
      <div className="">
        <h3 className="text-googleBlue text-2xl">{titleTag}</h3>
      </div>
      <div>
        <h3 className="text-googleGrey text-sm">{descriptionTag}</h3>
      </div>
    </div>
  );
}
//1A0DAB
export default Home;
