import { FC, useState } from "react";
import { Card } from "../../../../components/Card";
import WalletIcon from "/public/icons/wallet.svg";
import { formatNumber } from "../../../../utils/formatNumber";

interface EarnOverviewProps {
	onChange?: (tab: number) => void;
	activeTab?: number;
}

export const EarnOverview: FC<EarnOverviewProps> = ({
	activeTab,
	onChange,
}) => {
	const [active, setActive] = useState(activeTab ?? 0);

	const hanldeClick = (tab: number) => {
		setActive(tab);
		onChange && onChange(tab);
	};

	return (
		<>
			<div className="flex items-center text-[12px] leading-[15px] text-7b7986">
				<div
					className={` cursor-pointer ${
						active == 0 ? "text-primary font-semibold" : " font-medium"
					}`}
					onClick={() => hanldeClick(0)}
				>
					Stake & Lock
				</div>
				<div
					className={`ml-34 cursor-pointer ${
						active == 1 ? "text-primary font-semibold" : " font-medium"
					}`}
					onClick={() => hanldeClick(1)}
				>
					Stake Swap Liquidity
				</div>
			</div>
			<div className="mt-16">
				<LockCard />
			</div>
		</>
	);
};

const LockCard = () => {
	const [value, setValue] = useState(121323.55);
	const [earned, setEarned] = useState(3222);
	return (
		<Card
			variant="gradient-border"
			className="px-[57px] py-[33px] flex items-center"
		>
			<div className="wallet-card-gradient-bg absolute w-full h-full top-0 left-0" />
			<div className="flex items-center w-full">
				<div className="w-64 h-64 bg-eae9f0 border border-d6d3de rounded-circle flex flex-center">
					<WalletIcon />
				</div>
				<div className="flex items-center flex-1 justify-start ml-[49px]">
					<div className="flex-1">
						<div className="text-14 leading-17 text-7b7986 font-medium">
							Est. Value
						</div>
						<div className="text-28 leading-34 text-2e2d33 font-semibold mt-8">{`$${formatNumber(
							value
						)}`}</div>
					</div>
					<div className="flex-1">
						<div className="text-14 leading-17 text-7b7986 font-medium">
							Yield Earned
						</div>
						<div className="text-28 leading-34 text-2e2d33 font-semibold mt-8">{`$${formatNumber(
							earned
						)}`}</div>
					</div>
				</div>
			</div>
		</Card>
	);
};
