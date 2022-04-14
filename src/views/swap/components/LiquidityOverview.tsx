import React from "react";
import { Button } from "../../../components/Button";

export const LiquidityOverview = () => {
	return (
		<div className="flex flex-between w-full h-full min-h-126">
			<div>
				<p className="text-16 leading-20 text-grey-3 mb-12">
					Trading Liquidity
				</p>
				<p className="text-28 leading-34 text-2e2d33 font-semibold">
					$1,344,222,335
				</p>
			</div>
			<div className='flex flex-col items-end'>
				<p className="text-20 leading-30 text-494853 font-medium mb-4">
					Trade Instantly & Pool Liquidity to Earn
				</p>
				<Button size='sm' variant='text' className='pr-0 pb-0'>Learn More</Button>
			</div>
		</div>
	);
};
