import { Layout } from "../../components/layout";
import { AvailableCard } from "./components/credit/AvailableCard";
import { DetailTable } from "./components/credit/DetailTable";
import { WalletSubPageTabs } from "./components/WalletSubPageTabs";

export const Credit = () => {
  return (
    <Layout>
      <WalletSubPageTabs active={3} />
      <div className="container">
        <div className="mt-34">
          <AvailableCard />
        </div>
        <div className="mt-32 text-20 leading-[24px] text-494853 font-medium">
          Detail
        </div>
        <div className="mt-20">
          <DetailTable />
        </div>
      </div>
    </Layout>
  );
};
