import { Layout } from "../../components/layout";
import { BorrowSubPageTabs } from "./components/BorrowSubPageTabs";
import { TopNav } from "./components/TopNav";
import { Aggregated } from "./components/oracle/Aggregated";
import { DetailTable } from "./components/oracle/DetailTable";

export const Oracle = () => {
  return (
    <Layout>
      <TopNav />
      <BorrowSubPageTabs active={2} />
      <div className="container">
        <div className="mt-32">
          <Aggregated />
        </div>
        <div className="mt-28">
          <DetailTable />
        </div>
      </div>
    </Layout>
  );
};
