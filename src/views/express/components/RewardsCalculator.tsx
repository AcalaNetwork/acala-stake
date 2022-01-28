import React, { useState } from "react";
import { BalanceValue } from "../../../components/BalanceValue";
import { Button, LinkButton } from "../../../components/Button";
import { BalanceInput } from "../../../components/form";
import { FormatBalance } from "../../../components/FormatBalance";
import { FormatRatio } from "../../../components/FormatRatio";
import { Spacing } from "../../../components/Spacing";
import { Tab, TabProps, Tabs, TabsContext } from "../../../components/Tabs";
import { useHomaConts } from "../../../sdk/hooks/homa";
import { SDKNetwork } from "../../../sdk/types";
import { getTokenName } from "../../../utils/token";
import { useRewardsCalculator } from "../hooks/useRewardsCalculator";

type RewardType = "acala" | "karura";

export const RewardsCalculator = () => {
	const [type, setType] = useState<RewardType>("acala");
	const [apy, rewardsOneMonth, rewardsOneYear, value, onChange] =
		useRewardsCalculator(type as SDKNetwork);
	const acalaHomaConsts = useHomaConts("acala");
	const karuraHomaConsts = useHomaConts("karura");
	const activeToken =
		type === "acala"
			? acalaHomaConsts.stakingToken
			: karuraHomaConsts.stakingToken;

	return (
		<div className="text-center bg-fff pt-68 pb-72">
			<div className="text-[36px] leading-30 font-bold text-333">
				{" "}
				Calculate Rewards
			</div>
			<Spacing h={37} />
			<TabsContext init="acala">
				<Tabs init="acala">
					<Tab value="acala" onChange={setType as TabProps["onChange"]}>
						STAKE {getTokenName(acalaHomaConsts.stakingToken)}
					</Tab>
					<Tab value="karura" onChange={setType as TabProps["onChange"]}>
						STAKE {getTokenName(karuraHomaConsts.stakingToken)}
					</Tab>
				</Tabs>
				<Spacing h={84} />
				<div className="max-w-[700px] mx-auto">
					<p className="flex flex-between text-12 leading-15 font-medium mb-8">
						Enter Amount to Stake
					</p>
					<BalanceInput
						placeholder="Enter Amount to Stake"
						value={value}
						onChange={onChange}
					/>
					<div className="mt-44 flex w-full h-[108px] text-16 border border-d6d3de rounded-[24px] pt-20 pb-18 pl-60 text-494853">
						<div className="flex-1 flex flex-col items-start">
							<FormatRatio
								className="text-24 leading-29 font-bold text-primary"
								data={apy}
							/>
							<span className="text-14 leading-17 mt-12 text-7b7986">APY</span>
						</div>
						<div className="flex-1 flex flex-col items-start">
							<FormatBalance
								human
								balance={rewardsOneMonth}
								token={activeToken}
								className="text-20 leading-[24px] font-semibold"
							/>
							<BalanceValue
								className="text-16 leading-20 font-medium mt-4"
								network={type}
								balance={rewardsOneMonth}
								token={activeToken}
							/>
							<span className="text-14 leading-17 mt-12 text-7b7986">
								{" "}
								Est. Earning/Month{" "}
							</span>
						</div>
						<div className="flex-1 flex flex-col items-start">
							<FormatBalance
								human
								balance={rewardsOneYear}
								token={activeToken}
								className="text-20 leading-[24px] font-semibold"
							/>
							<BalanceValue
								className="text-16 leading-20 font-medium mt-4"
								network={type}
								balance={rewardsOneYear}
								token={activeToken}
							/>
							<span className="text-14 leading-17 mt-12 text-7b7986">
								{" "}
								Est. Earning/Year{" "}
							</span>
						</div>
					</div>
					<LinkButton
						className="w-full mt-46"
						href={`stake/${type === "acala" ? "ksm" : "dot"}`}
					>
						Stake now
					</LinkButton>
				</div>
			</TabsContext>
		</div>
	);
};
