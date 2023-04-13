import { useState } from "react";

export function Inputs() {
  const [url, setUrl] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  return (
    <form
      className="flex flex-col justify-between"
      onSubmit={async (e) => {
        e.preventDefault();
        await submitInputs(keyword, url, companyName);
      }}
    >
      <div className="h-2/5 flex flex-col justify-between">
        <input
          className="p-2 rounded-md w-full"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Input your website URL"
        ></input>
        <input
          className="p-2 rounded-md"
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Input your company name"
        ></input>
        <input
          className="p-2 rounded-md"
          type="text"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          placeholder="Input your target keyword"
        ></input>
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        type="submit"
      >
        Lets go!
      </button>
    </form>
  );
}

async function submitInputs(keyword: string, url: string, companyName: string) {
  const response = await fetch("/api/metadata", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      keyword: keyword,
      url: url,
      companyName: companyName,
    }),
  });
  const data = await response.json();
  console.log(data);
  return data;
}
