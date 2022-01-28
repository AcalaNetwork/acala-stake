import React from "react";
import Logo from "./Logo";
import { Menu, StakeMenu } from "./Menu";
import { Setting } from "./Setting";
import { StakeWallet, Wallet } from "./Wallet";

export const Header = () => {
	return (
		<header className="relative h-64 w-full bg-opacity-70">
			<div className="container flex flex-row items-center h-full relative z-10">
				<Logo />
				<div className="flex-1 ml-52">
					<Menu />
				</div>
				<div className="flex items-center">
					<Wallet className='mr-32'/>
					<Setting />
				</div>
			</div>
			<div className='header-bg' />
		</header>
	);
};

export const StakeHeader = () => {
	return (
		<header className="relative h-64 w-full bg-opacity-70">
			<div className="container flex flex-row items-center h-full relative z-10">
				<Logo />
				<div className="flex-1 ml-52">
					<StakeMenu />
				</div>
				<div className="flex items-center">
					<StakeWallet className='mr-32'/>
					<Setting />
				</div>
			</div>
			<div className='header-bg' />
		</header>
	);
};
