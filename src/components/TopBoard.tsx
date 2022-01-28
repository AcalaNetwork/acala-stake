import React from "react";

export const TopBoard = ({ children }) => {
	return (
		<div
			className="bg-top-board w-screen min-h-126 bg-no-repeat bg-cover"
			style={{ backgroundImage: `url("/images/top-board-bg.svg")` }}
		>
			<div className="container">{children}</div>
		</div>
	);
};
