import React, { useState } from "react";
import { ButtonGroup, LinkButton } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import EyeIcon from "/public/icons/eye.svg";
import ProtfolioIcon from "/public/pages/wallet/portfolio.svg";
import { formatNumber } from "../../../../utils/formatNumber";

export const AssetBalance = () => {
	const [balance, setBalance] = useState(121323.55);
	const [ratio, setRatio] = useState(0.01);
	const [hourPnl, setHourPnl] = useState(100.22);

	const labelClassName = "text-14 text-7b7986 leading-17 font-medium";
	return (
		<Card
			variant="gradient-border"
			className="pt-20 pb-24 px-30 overflow-hidden"
		>
			<div className="wallet-card-gradient-bg absolute w-full h-full top-0 left-0" />
			<div className="w-full flex items-center justify-end mb-2 cursor-pointer">
				<EyeIcon />
			</div>
			<div className="w-full flex">
        <ProtfolioIcon className='flex-shrink-0 flex-grow-0 w-64 h-64'/>
				<div className="flex-1 ml-[49px]">
					<div className="flex">
						<div className="flex-1">
							<div className={labelClassName}>Asset Balance</div>
							<div className="text-2e2d33 font-semibold text-28 leading-34 mt-8">
								{`$${formatNumber(balance)}`}
							</div>
						</div>
						<div className="flex-1">
							<div className={labelClassName}>24 Hour PnL</div>
							<div
								className={`mt-8 text-28 leading-34 font-semibold ${
									ratio > 0 ? "text-31c26b" : ""
								}`}
							>
								{`$${formatNumber(hourPnl)}`}/
								{` ${ratio > 0 ? "+" : "-"}${ratio}%`}
							</div>
						</div>
					</div>
					<ButtonGroup className="mt-32">
						<LinkButton
							size="sm"
              round='sm'
              link='/swap'
						>
							Bug Crypto
						</LinkButton>
						<LinkButton
							size="sm"
              round='sm'
							variant="outline"
              link='/swap'
						>
							Bridge
						</LinkButton>
						<LinkButton
							size="sm"
              round='sm'
							variant="outline"
              link='/swap'
						>
							Transfer
						</LinkButton>
					</ButtonGroup>
				</div>
			</div>
		</Card>
	);
};
