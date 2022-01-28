import SearchIcon from "/public/icons/search.svg";
import { Button, ButtonGroup } from "../../../../components/Button";
import { Card } from "../../../../components/Card";
import { Table } from "../../../../components/Table";
import { TokenImage } from "../../../../components/TokenImage";
import { TokenFullName, TokenName } from "../../../../components/TokenName";
import { useAccountBalanceOverview } from "../../../../sdk/hooks/wallet/useAccountBalanceOverview";
import { useActiveAccount } from "../../../../connector";
import { FormatBalance } from "../../../../components/FormatBalance";
import { Spacing } from "../../../../components/Spacing";
import { DisplaySelector } from "../DisplaySelector";
import { useState } from "react";
import { DisplayType } from "../types";

const fullName = (value: string) => `(${value})`;

export const BalanceTable = () => {
	const active = useActiveAccount();
	const [displayType, setDisplayType] = useState<DisplayType>("USD");
	const balanceData = useAccountBalanceOverview({
		address: active?.address,
		display: displayType,
	});

	const columns = [
		{
			Header: "ASSETS",
			accessor: "token",
			Cell: (token: any) => (
				<div className="flex items-center">
					<TokenImage size="sm" token={token.value} />
					<TokenName
						className="mx-8 text-494853 text-14 leading-15"
						token={token.value}
					/>
					<TokenFullName
						className="text-7b7986 text-12 leading-15 font-medium"
						token={token.value}
						render={fullName}
					/>
				</div>
			),
		},
		{
			Header: "TOTAL",
			accessor: "display",
			Cell: (props: any) => (
				<div className="flex items-center text-494853 text-16 font-semibold">
					{props.value}
				</div>
			),
		},
		{
			Header: () => {
				return (
					<div className="w-full flex justify-end">
						<div className="w-[273px] h-32 bg-eae9f0 rounded-16 flex flex-between px-24">
							<input
								type="text"
								placeholder="Search token"
								className="bg-transparent outline-none flex-1 h-20"
							/>
							<SearchIcon className="ml-4" width={16} height={16} />
						</div>
					</div>
				);
			},
			accessor: "suffix",
			disableSortBy: true,
			Cell: (props: any) => (
				<ButtonGroup className="justify-end" spacing={0}>
					<Button size="sm" variant="text" className="py-0">
						Buy
					</Button>
					<Button size="sm" variant="text" className="py-0">
						Withdraw
					</Button>
					<Button size="sm" variant="text" className="py-0">
						Earn
					</Button>
					<Button size="sm" variant="text" className="py-0">
						Swap
					</Button>
					<Button size="sm" variant="text" className="pr-0 py-0">
						Get aUSD Credit
					</Button>
				</ButtonGroup>
			),
		},
	];

	return (
		<>
			<DisplaySelector value={displayType} onChange={setDisplayType} />
			<Spacing h={20} />
			<Card variant="gradient-border" className="pt-20 pb-[13px]">
				<Table
					columns={columns}
					data={balanceData}
					loading={balanceData.length === 0}
				/>
			</Card>
		</>
	);
};
