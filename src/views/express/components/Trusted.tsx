import Altonomy from "/public/trusted/altonomy.svg";
import Bentons from "/public/trusted/bentons.svg";
import CoinFund from "/public/trusted/CoinFund.svg";
import Hashkey from "/public/trusted/hashkey.svg";
import P2pcapital from "/public/trusted/p2pcapital.svg";
import Snz from "/public/trusted/snz.svg";
import Ventures from "/public/trusted/ventures.svg";
import Web3capital from "/public/trusted/web3capital.svg";

export const Trusted = () => {
  const trusts = [
    <Altonomy />,
    <Bentons />,
    <CoinFund />,
    <Hashkey />,
    <P2pcapital />,
    <Snz />,
    <Ventures />,
    <Web3capital />,
  ];
  return (
    <div className="bg-fff">
      <div className="container pt-56">
        <div className="text-[36px] leading-[44px] tracking-[0.04em] text-2e2d33 font-bold text-center">
          Trusted By
        </div>
        <div className="grid grid-cols-4">
          {trusts.map((item) => (
            <div className="flex flex-center h-[160px]">{item}</div>
          ))}
        </div>
      </div>
    </div>
  );
};
