import React, { useState } from "react";
import { Layout } from "../../components/layout";
import { TopBoard } from "../../components/TopBoard";
import { DisplaySelector } from "../wallet/components/DisplaySelector";
import { LiquidityOverview } from "./components/LiquidityOverview";
import { ShareOverview } from "./components/ShareOverview";
import { ShareTable } from "./components/ShareTable";
import { SwapSubPageTabs } from "./components/SwapSubPageTabs";

export const Share = () => {
  const [tab, setTab] = useState<"USD" | "TOKEN">("TOKEN");
  return (
    <Layout>
      <TopBoard>
        <LiquidityOverview />
      </TopBoard>
      <SwapSubPageTabs active={3} />
      <div className="container">
        <div className="mt-36">
          <ShareOverview />
        </div>
        <div className="mt-30">
          <DisplaySelector value={tab} onChange={setTab} />
        </div>
        <div className="mt-20">
          <ShareTable tab={tab}/>
        </div>
      </div>
    </Layout>
  );
};
