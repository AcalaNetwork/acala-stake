import React, { FC } from "react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { useRouter } from "next/router";

type MenuItem = PropsWithChildren<{
	link: string;
	activeParams?: string[];
}>;

const MenuItem: FC<MenuItem> = ({ children, link, activeParams }) => {
  const { asPath } = useRouter();
  const baseClassName = 'pt-8 pb-8 pl-36 pr-36 rounded-12 text-base font-medium';
  const activeClassName = 'bg-eae9f0 text-494853';
	const isActive = activeParams.includes(asPath);
  const className = `${baseClassName} ${isActive ? activeClassName : 'text-7b7986'}`;

	return (
		<li className={className}>
			<Link href={link}>
				<a>
					{children}
				</a>
			</Link>
		</li>
	);
};

export const Menu = () => {
	return (
		<ul className="flex flex-row">
			<MenuItem activeParams={['/bridge']} link="/">Home</MenuItem>
			<MenuItem activeParams={['/bridge']} link="/bridge">Bridge</MenuItem>
			<MenuItem activeParams={['/borrow']} link="/borrow">Borrow</MenuItem>
			<MenuItem activeParams={['/swap']} link="/swap">Swap</MenuItem>
			<MenuItem activeParams={['/earn']} link="/earn">Earn</MenuItem>
		</ul>
	);
};

export const StakeMenu = () => {
	return (
		<ul className="flex flex-row">
			<MenuItem activeParams={['/stake']} link="/stake">Home</MenuItem>
			<MenuItem activeParams={['/stake/what-is-staking']} link="/stake/what-is-staking">What is Staking</MenuItem>
			<MenuItem activeParams={['/stake/dot', '/stake/ksm']} link="/stake/dot">Stake</MenuItem>
			<MenuItem activeParams={['/stake/bridge']} link="/stake/bridge">Bridge</MenuItem>
			<MenuItem activeParams={['/stake/community']} link="/stake/community">Community</MenuItem>
		</ul>
	);
};