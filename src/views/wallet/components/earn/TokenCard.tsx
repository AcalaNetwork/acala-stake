import { useState } from "react";
import { Button } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { TokenImage } from "../../../../components/TokenImage";
import { TokenName } from "../../../../components/TokenName";
import { getTokenFullName } from "../../../../utils/token";

export const TokenCard = () => {
	const [token, setToken] = useState("DOT");

	return (
		<Card variant="gradient-border" className="px-[52px] py-32">
			<div className="wallet-card-gradient-bg absolute w-full h-full top-0 left-0" />
			<div className="flex items-center">
				<TokenImage token={token} size={52} />
				<div className="ml-[17px]">
					<TokenName
						className="text-20 leading-[24px] text-494853 font-semibold"
						token={token}
					/>
					<div className="text-16 leading-20 font-medium text-7b7986 mt-8">
						{getTokenFullName(token)}
					</div>
				</div>
			</div>
			<div className="mt-24 flex flex-between bg-primary bg-opacity-5 border border-eae9f0 rounded-16 h-[105px] px-[50px]">
				<div className="text-494853">
					<div className="text-20 leading-[24px] font-semibold text-center">
						2000
					</div>
					<div className="text-14 leading-17 mt-8">Total Amount</div>
				</div>
				<div>
					<div className="text-20 leading-[24px] font-semibold text-31c26b text-center">
						20
					</div>
					<div className="text-14 leading-17 text-494853 mt-8">
						Est. Yield/Month*
					</div>
				</div>
				<div>
					<div className="text-20 leading-[24px] text-primary font-semibold">
						16%
					</div>
					<div className="text-14 leading-17 text-494853 mt-8">Est. APY</div>
				</div>
				<div className="text-494853">
					<div className="text-20 leading-[24px] font-semibold text-center">
						10
					</div>
					<div className="text-14 leading-17 mt-8">ACA Airdrop</div>
				</div>
			</div>
			<div className="mt-[33px] flex flex-between">
				<Button className="w-[218px] h-40 py-0 text-14" size="sm" round="lg">
					Stake More
				</Button>
				<Button className="w-[218px] h-40 py-0 text-14" size="sm" round="lg">
					Redeem
				</Button>
				<Button className="w-[218px] h-40 py-0 text-14" size="sm" round="lg">
					Claim Airdrop
				</Button>
			</div>
		</Card>
	);
};
