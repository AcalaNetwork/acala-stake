import { Card } from "../../../../components/Card";
import { WrapInfo } from "../../../../components/WrapInfo";

export const FAQ = () => {
  const faqs = [
    {
      title: "Lorem ipsum  consectetur adipiscing elit?",
      content:
        "Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?",
    },
    {
      title: "Lorem ipsum  consectetur adipiscing elit?",
      content:
        "Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?",
    },
    {
      title: "Lorem ipsum  consectetur adipiscing elit?",
      content:
        "Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?",
    },
    {
      title: "Lorem ipsum  consectetur adipiscing elit?",
      content:
        "Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?",
    },
  ];

  return (
    <Card className="px-68 pt-32">
      <div className="text-[32px] leading-[39px] font-semibold text-2e2d33 w-full text-center pb-24">
        FAQ
      </div>
      <div>
        {faqs.map((item, i) => (
          <WrapInfo title={item.title} content={item.content} key={i} />
        ))}
      </div>
    </Card>
  );
};
