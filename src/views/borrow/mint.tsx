import { useContext } from "react";
import { Layout } from "../../components/layout";
import { BorrowProvider, BorrowProviderContext } from "./BorrowContext";
import { BorrowSubPageTabs } from "./components/BorrowSubPageTabs";
import { CollateralCard, FAQ, OverviewCard } from "./components/mint";
import { ConfirmVault } from "./components/mint/ConfirmVault";
import { CreateVault } from "./components/mint/CreateVault";
import { VaultResult } from "./components/mint/VaultResult";
import { TopNav } from "./components/TopNav";

const Inner = () => {
  const { step } = useContext(BorrowProviderContext);
  return (
    <>
      <TopNav />
      <BorrowSubPageTabs active={0} />
      <div className="container">
        {step === "overview" ? <Overview /> : null}
        {step === "create" ? <CreateVault /> : null}
        {step === "confirm" ? <ConfirmVault /> : null}
        {step === "result" ? <VaultResult /> : null}
      </div>
    </>
  );
};

export const Mint = () => {
  return (
    <Layout>
      <BorrowProvider>
        <Inner />
      </BorrowProvider>
    </Layout>
  );
};

const Overview = () => {
  return (
    <>
      <div className="mt-[31px]">
        <OverviewCard />
      </div>
      <div className="mt-[25px]">
        <CollateralCard />
      </div>
      <div className="mt-32">
        <FAQ />
      </div>
    </>
  );
};
