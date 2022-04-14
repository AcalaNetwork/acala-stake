import { Button } from "../../../components/Button";
import { Card } from "../../../components/Card";
import { formatNumber } from "../../../utils/formatNumber";
import { useShareForm } from "../hooks/useShareForm";

export const ShareOverview = () => {
  const [total] = useShareForm();
  return (
    <div className="flex items-center justify-start">
      <Card
        className="w-[380px] h-120 flex justify-start items-center pl-32"
        style={{ backgroundImage: `url("/images/top-board-bg.svg")` }}
      >
        <div className="w-48 h-48 bg-gray-300 rounded-circle"></div>
        <div className="ml-24">
          <div className="text-16 leading-20 text-grey-3 font-medium">
            Total Liquidity Share
          </div>
          <div className="text-28 leading-34 text-494853 font-semibold mt-14">
            {formatNumber(total)}
          </div>
        </div>
      </Card>

      <Card
        className="w-[590px] h-120 ml-32 flex flex-between pl-32"
        style={{ backgroundImage: `url("/images/top-board-bg.svg")` }}
      >
        <div className="flex flex-center">
          <div className="w-48 h-48 bg-gray-300 rounded-circle"></div>
          <div className="ml-24">
            <div className="text-16 leading-20 text-grey-3 font-medium">
              Total Unclaimed Rewards
            </div>
            <div className="text-28 leading-34 text-494853 font-semibold mt-14">
              $5,323.55
            </div>
          </div>
        </div>
        <div className="mr-38">
          <Button size="sm">Claim All</Button>
        </div>
      </Card>
    </div>
  );
};
