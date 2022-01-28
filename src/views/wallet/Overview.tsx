
import React from "react";
import { Layout } from "../../components/layout";
import { Spacing } from "../../components/Spacing";
import { AccountCard, AssetCard, TransactionHistory } from "./components/wallet";
import { WalletSubPageTabs } from "./components/WalletSubPageTabs";

export const Overview = () => {
  return (
    <Layout>
      <WalletSubPageTabs active={0} />
      <div className="container">
        <Spacing h={36} />
        <AssetCard />
        <Spacing h={40} />
        <AccountCard />
        <div className="mt-40 text-494853 font-medium text-20 leading-[24px]">
          Transaction History
        </div>
        <div className="mt-20">
          <TransactionHistory />
        </div>
      </div>
    </Layout>
  );
};
