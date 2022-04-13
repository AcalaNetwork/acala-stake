import { FC } from "react";
import { SetTokenCom } from ".";
import { MyStake } from "../../../views/stake/MyStake";

export const MyStakePage: FC = () => {
  return <SetTokenCom><MyStake /></SetTokenCom>;
};

export default MyStakePage;