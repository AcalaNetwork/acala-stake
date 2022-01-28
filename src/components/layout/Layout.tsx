import React, { FC } from "react";
import { Footer } from "../footer";
import { Header } from "../header";

export const Layout: FC = ({ children }) => {
	return (
		<div className="h-screen bg-body overflow-x-hidden overscroll-x-auto">
			<div className='flex flex-col items-center justify-start min-w-full min-h-full'>
				<Header />
				<main className="flex flex-col flex-1 pb-60">
					{children}
				</main>
				<Footer />
			</div>
		</div>
	);
};
