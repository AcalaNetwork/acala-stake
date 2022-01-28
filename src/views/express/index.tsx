import React from "react";
import { StakeLayout } from "../../components/layout";
import { Spacing } from "../../components/Spacing";
import { EnsureSDKReady } from "../../sdk/components/EnsureSDKReady";
import { Ecosystem } from "./components/Ecosystem";
import { StakeCard } from "./components/StakeCard";
import { TotalStake } from "./components/TotalStake";
import { Trusted } from "./components/Trusted";
import { Validators } from "./components/Validators";
import { Information } from "./components/Information";
import StakeBg from "/public/images/stake-bg.svg";
import { RewardsCalculator } from "./components/RewardsCalculator";

const Bg = () => {
	return (
		<div
			className="w-full h-full"
			style={{
				background:
					"linear-gradient(102.39deg, rgba(255, 255, 255, 0.2) 36.43%, rgba(255, 255, 255, 0) 146.59%), linear-gradient(320.77deg, #645AFF -40.33%, #E40C5B 41.3%, #FF4C3B 114.21%)",
			}}
		>
			<StakeBg className='w-full' />
		</div>
	);
};

const Top = () => {
	return (
		<div className="w-screen relative">
			<div className="z-0 absolute left-0 right-0 top-0 h-[656px]">
				<Bg />
			</div>
			<div className="container">
				<TotalStake />
				<Spacing h={99} />
				<StakeCard />
			</div>
		</div>
	);
};

export const Express = () => {
	return (
		<StakeLayout>
			<EnsureSDKReady
				requires={[
					"acala-homa",
					"acala-wallet",
					"karura-homa",
					"karura-wallet",
				]}
			>
				<Top />
				<Spacing h={162} />
				<Information />
				<Spacing h={135} />
        <RewardsCalculator />
				<Spacing h={75} />
				<Validators />
				<Spacing h={112} />
				<Ecosystem />
				<Spacing h={105} />
				<Trusted />
			</EnsureSDKReady>
		</StakeLayout>
	);
};
