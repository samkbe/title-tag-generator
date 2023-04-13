type serpProps = {
  titleTag: string;
  descriptionTag: string;
  url: string;
};
type Response = Success | Failed;
type Failed = {
  __typename: "failed";
  message: string;
};
type Success = {
  __typename: "success";
  url: string;
  options: Metadata[];
};
type Metadata = {
  titleTag: string;
  descriptionTag: string;
};

type JSONresponse = {
  data?: Response;
  isRefetching: boolean;
};

export function MetaTagDisplay({ data, isRefetching }: JSONresponse) {
  if (isRefetching) {
    return (
      <div>
        <SERPLoading />
        <SERPLoading />
        <SERPLoading />
      </div>
    );
  }
  if (data && data.__typename === "success") {
    return (
      <div>
        {data.options.map(({ descriptionTag, titleTag }) => (
          <SERP
            url={data.url}
            key={titleTag}
            descriptionTag={descriptionTag}
            titleTag={titleTag}
          />
        ))}
      </div>
    );
  } else {
    return <>Error....</>;
  }
}

function SERPLoading() {
  return (
    <div role="status" className="max-w-sm animate-pulse p-2 m-1">
      <div className="h-2.5 bg-lightGrey rounded-full w-48 mb-4"></div>
      <div className="h-2 bg-lightGrey rounded-full max-w-[360px] mb-2.5"></div>
      <div className="h-2 bg-lightGrey rounded-full mb-2.5"></div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

function SERP({ titleTag, descriptionTag, url }: serpProps) {
  return (
    <div className="p-2 m-1">
      <div className="hover:bg-lightestGrey relative">
        {/* <RiFileCopyLine size="12" className="top-0 left-0" /> */}
        <h3 className="text-googleBlue text-2xl p-1">{titleTag}</h3>
      </div>
      <div className="hover:bg-lightestGrey relative">
        <h3 className="text-googleGrey text-sm p-1">{descriptionTag}</h3>
      </div>
    </div>
  );
}
