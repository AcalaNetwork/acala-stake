import clsx from "clsx";
import { memo } from "react";
import { BaseComponentProps, Card, WrapInfo } from "@components";

export const FAQ = memo<BaseComponentProps>(({ className }) => {
  return (
    <Card className={clsx("mt-32 pt-32 px-68", className)}
      variant="border">
      <div className="text-[32px] leading-[39px] font-semibold text-center w-full mb-32">FAQ</div>
      <WrapInfo content="Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?"
        title="Lorem ipsum  consectetur adipiscing elit?"/>
      <WrapInfo content="Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?"
        title="Lorem ipsum  consectetur adipiscing elit?"/>
      <WrapInfo content="Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?Lorem ipsum  consectetur adipiscing elit?"
        title="Lorem ipsum  consectetur adipiscing elit?"/>
    </Card>
  );
});
