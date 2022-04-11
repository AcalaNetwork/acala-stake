import { Card } from "@components/Card";
import { WrapInfo } from "@components/WrapInfo";

export const Wraps = () => {
  return (
    <Card variant="border" className="mt-32 pt-32 px-68">
      <div className="text-[32px] leading-[39px] font-semibold text-center w-full mb-32">FAQ</div>
      <WrapInfo title="Lorem ipsum  consectetur adipiscing elit?" content="Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?"/>
      <WrapInfo title="Lorem ipsum  consectetur adipiscing elit?" content="Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?"/>
      <WrapInfo title="Lorem ipsum  consectetur adipiscing elit?" content="Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?"/>
    </Card>
  );
};
