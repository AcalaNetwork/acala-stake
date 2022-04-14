import { Button } from "../../../components/Button"
import { TopBoard } from "../../../components/TopBoard"

export const TopNav = () => {
  return (
    <TopBoard>
        <div className="flex flex-between w-full h-full min-h-126">
          <div>
            <div className="text-16 leading-20 text-grey-3 font-medium mb-8">Acala Dollar Issuance</div>
            <div className="text-24 leading-29 text-2e2d33 font-semibold">$1,344,222,335</div>
          </div>
          <div className="flex flex-col items-end">
            <div className="text-20 leading-[24px] text-494853 font-medium">Mint aUSD to Multiply Earnings</div>
            <div><Button className="px-0 mt-10" size="sm" variant='text'>Learn More</Button></div>
          </div>
        </div>
      </TopBoard>
  )
}