import { useState } from "react";

export function Inputs() {
  const [url, setUrl] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [keyword, setKeyword] = useState<string>("");

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await submitInputs(keyword, url, companyName);
      }}
    >
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="Input your website URL"
      ></input>
      <input
        type="text"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        placeholder="Input your company name"
      ></input>
      <input
        type="text"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Input your target keyword"
      ></input>
      <button type="submit">Lets go!</button>
    </form>
  );
}

async function submitInputs(keyword: string, url: string, companyName: string) {
  const test = await fetch("/api/metadata", {
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
}
