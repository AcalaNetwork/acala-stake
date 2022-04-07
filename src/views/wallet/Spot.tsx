import { Layout } from "../../components/layout";
import { Spacing } from "../../components/Spacing";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";
import { AssetBalance } from "./components/spot";
import { BalanceTable } from "./components/spot/BalanceTable";
import { WalletSubPageTabs } from "./components/WalletSubPageTabs";

export const Spot = () => {
	return (
		<Layout>
			<WalletSubPageTabs active={1} />
			<EnsureSDKReady requires={['acala-wallet', 'karura-wallet']}>
				<div className="container">
					<Spacing h={44} />
					<AssetBalance />
					<Spacing h={40} />
					<BalanceTable />
				</div>
			</EnsureSDKReady>
		</Layout>
	);
};
