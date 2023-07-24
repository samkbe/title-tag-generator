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
    <div>
      <input
        required
        placeholder="Company Name"
        onChange={(e) =>
          setInitialInputs({ ...initalInputs, companyName: e.target.value })
        }
      />
      <input
        required
        placeholder="Website Url"
        onChange={(e) =>
          setInitialInputs({ ...initalInputs, websiteUrl: e.target.value })
        }
      />
      <input
        required
        placeholder="Target Keyword"
        onChange={(e) =>
          setInitialInputs({ ...initalInputs, seedKeyword: e.target.value })
        }
      />
    </div>
  );
}
