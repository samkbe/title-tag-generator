import type { Dispatch, SetStateAction } from "react";

type Props = {
  initalInputs: InitialInputProps;
  setInitialInputs: Dispatch<SetStateAction<InitialInputProps>>;
};

type InitialInputProps = {
  seedKeyword: string;
  websiteUrl: string;
  companyName: string;
};

export function InitialInputs({ initalInputs, setInitialInputs }: Props) {
  return (
    <div className="flex flex-col space-y-6 items-center w-full sm:max-w-xs md:max-w-sm lg:max-w-xl p-8 border-2 rounded-lg">
      <label
        className="block text-sm font-medium dark:text-white w-full"
        htmlFor="company_name"
      >
        Company Name
        <input
          minLength={3}
          className="border border-lightGrey text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          name="company_name"
          required
          placeholder="My cool company"
          value={initalInputs.companyName}
          onChange={(e) =>
            setInitialInputs({ ...initalInputs, companyName: e.target.value })
          }
        />
      </label>
      <label
        className="block text-sm font-medium dark:text-white w-full"
        htmlFor="website"
      >
        Website URL
        <input
          minLength={3}
          name="website"
          className="border border-lightGrey text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          placeholder="www.mywebsite.com"
          value={initalInputs.websiteUrl}
          onChange={(e) =>
            setInitialInputs({ ...initalInputs, websiteUrl: e.target.value })
          }
        />
      </label>
      <label
        className="block text-sm font-medium dark:text-white w-full"
        htmlFor="keyword"
      >
        Target Keyword
        <input
          minLength={3}
          name="keyword"
          className="border border-lightGrey text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          placeholder="keyword"
          value={initalInputs.seedKeyword}
          onChange={(e) =>
            setInitialInputs({ ...initalInputs, seedKeyword: e.target.value })
          }
        />
      </label>
    </div>
  );
}
