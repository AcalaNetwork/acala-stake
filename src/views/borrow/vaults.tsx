import { Layout } from "../../components/layout"
import { BorrowSubPageTabs } from "./components/BorrowSubPageTabs"
import { TopNav } from "./components/TopNav"
import { AssetTable } from "./components/vaults/AssetTable"
import { VaultOverviewCard } from "./components/vaults/VaultOverviewCard"

export const Vaults = () => {
  return <Layout>
    <TopNav />
    <BorrowSubPageTabs active={1} />
    <div className="container">
      <div className="mt-32">
        <VaultOverviewCard />
      </div>
      <div className=" mt-56">
        <AssetTable />
      </div>
    </div>
  </Layout>
}