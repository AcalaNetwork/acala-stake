import React, { FC, ReactNode } from "react";
import Link from "next/link";

export interface SubPageTabsProps {
	configs: {
		content: ReactNode;
		href: string;
	}[];
	active: number;
  className?: string;
}

export const SubPageTabs: FC<SubPageTabsProps> = ({ className, configs, active = 0 }) => {
	return (
		<div className={`w-screen ${className}`}>
			<ul className="container flex items-center border-b border-d6d3de">
				{configs.map((item, i) => {
					const itemClassName = `text-15 leading-18 font-medium mr-64 pb-8 ${
						active === i ? "transfrom translate-y-px text-primary border-b-2 border-primary" : "text-7b7986"
					}`;

					return (
						<li className={itemClassName} key={item.href}>
							<Link href={item.href}>
								<a>{item.content}</a>
							</Link>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
