import React from "react";
import { Card } from "../../components/Card";
import { Layout } from "../../components/layout";
import { TopBoard } from "../../components/TopBoard";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";
import { LiquidityOverview } from "./components/LiquidityOverview";
import { SwapConsole } from "./components/SwapConsole";
import { SwapSubPageTabs } from "./components/SwapSubPageTabs";

export const Swap = () => {
	return (
		<Layout>
			<TopBoard>
				<LiquidityOverview />
			</TopBoard>
			<SwapSubPageTabs active={0} />
			<EnsureSDKReady requires={['acala-wallet', 'karura-wallet']}>
				<div className="container mt-32 ">
					<Card variant="gradient-border" className="pt-36 pb-46">
						<SwapConsole />
					</Card>
				</div>
			</EnsureSDKReady>
		</Layout>
	);
};
