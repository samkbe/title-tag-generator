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
        value={initalInputs.companyName}
        onChange={(e) =>
          setInitialInputs({ ...initalInputs, companyName: e.target.value })
        }
      />
      <input
        required
        placeholder="Website Url"
        value={initalInputs.websiteUrl}
        onChange={(e) =>
          setInitialInputs({ ...initalInputs, websiteUrl: e.target.value })
        }
      />
      <input
        required
        placeholder="Target Keyword"
        value={initalInputs.seedKeyword}
        onChange={(e) =>
          setInitialInputs({ ...initalInputs, seedKeyword: e.target.value })
        }
      />
    </div>
  );
}
