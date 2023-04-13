export function MetaTagDisplay(props: SerpPanelProps[]) {
  return (
    <div>
      {props.map(({ url, descriptionTag, titleTag }) => (
        <SerpPanel
          key={titleTag}
          titleTag={titleTag}
          url={url}
          descriptionTag={descriptionTag}
        />
      ))}
    </div>
  );
}

type SerpPanelProps = {
  url: string;
  descriptionTag: string;
  titleTag: string;
};

function SerpPanel({ url, descriptionTag, titleTag }: SerpPanelProps) {
  return <></>;
}
