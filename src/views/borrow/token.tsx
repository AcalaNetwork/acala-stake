import { FC } from "react";
import { Layout } from "../../components/layout";
import { BorrowSubPageTabs } from "./components/BorrowSubPageTabs";
import { ActionCard } from "./components/vaults/ActionCard";
import { CloseVault } from "./components/vaults/CloseVault";
import { TokenOverviewCard } from "./components/vaults/TokenOverviewCard";

interface TokenVaultProps {
  token: string;
}

export const TokenVault: FC<TokenVaultProps> = ({ token }) => {
  return (
    <Layout>
      <BorrowSubPageTabs active={1} />
      <div className="container">
        <div className="mt-36 text-24 leading-29 text-2e2d33 font-medium">{token} Vault</div>
        <div>
          <TokenOverviewCard />
        </div>
        <div className="mt-12">
          <CloseVault />
        </div>
        <div className="mt-32">
          <ActionCard />
        </div>
      </div>
    </Layout>
  );
};
