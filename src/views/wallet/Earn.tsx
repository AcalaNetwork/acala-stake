import React from "react";
import { Layout } from "../../components/layout";
import { Spacing } from "../../components/Spacing";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";
import { DisplaySelector } from "./components/DisplaySelector";
import { EarnOverview } from "./components/earn/EarnOverview";
import { TokenCard } from "./components/earn/TokenCard";
import { WalletSubPageTabs } from "./components/WalletSubPageTabs";

export const Earn = () => {
	return (
		<Layout>
			<WalletSubPageTabs active={2} />
			<div className="container">
				<EnsureSDKReady requires={['acala-wallet', 'karura-wallet']}>
					<Spacing h={40} />
					<EarnOverview />
					<Spacing h={68} />
					<DisplaySelector />
					<div className="mt-20 text-20 leading-[24px] text-494853 font-medium">
						Staking Programs
					</div>
					<Spacing h={20} />
					<TokenCard />
				</EnsureSDKReady>
			</div>
		</Layout>
	);
};
