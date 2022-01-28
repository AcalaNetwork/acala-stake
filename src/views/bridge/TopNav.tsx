import { FC } from "react";
import { Button } from "../../components/Button";
import { TopBoard } from "../../components/TopBoard";

export const TopNav: FC = () => {
  return (
    <TopBoard>
      <div className="flex flex-between w-full h-full min-h-126">
        <div>
          <p className="text-20 leading-24 text-2e2d33 font-semibold mb-12">
            Bridge
          </p>
          <p className="text-16 leading-27 text-494853 max-w-[513px] font-medium">
            Bridge cross-chain assets to Acala.
          </p>
        </div>
        <div className="flex flex-center">
          <Button size="sm" variant="filled" round="lg">
            Watch Video
          </Button>
          <Button size="sm" variant="outline" round="lg" className="ml-32">
            User Guide
          </Button>
        </div>
      </div>
    </TopBoard>
  );
};
