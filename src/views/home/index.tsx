import React from "react";
import { TotalLiquidity } from "./components/TotalLiquidity";
import { GetStartedCards } from "./components/GetStartedCards";
import { PageIcons } from "./components/PageIcons";
import { EarnCards } from "./components/EarnCards";

const Home = () => {
  return (
    <div className="w-screen">
      <TotalLiquidity />
      <div className="container flex flex-col justify-center gap-y-48 my-48">
        <PageIcons />
        <EarnCards />
        <h2 className="font-bold font-montserrat text-494853 text-24 text-center">
          Get started with DeFi
        </h2>
        <GetStartedCards />
      </div>
    </div>
  );
};

export default Home;