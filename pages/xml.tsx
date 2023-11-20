import { useState } from "react";

export default function XmlInput() {
  const [url, setUrl] = useState("");

  return (
    <div>
      <h1>Input the URL to your XML File</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendSitemapUrl(url);
        }}
        className="flex flex-col"
      >
        <input
          onChange={(e) => setUrl(e.target.value)}
          type="url"
          placeholder="mywebsite.com/sitemap.xml"
        ></input>
        <button type="submit">Go</button>
      </form>
    </div>
  );
}

async function sendSitemapUrl(sitemapUrl: string) {
  await fetch(`${window.location.origin}/api/crawl-sitemap`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sitemapUrl }),
  });
}
