import { useContext } from "react";
import { SDKContext } from "../..";
import { SDKNetwork } from "../../types";

export const useWallet = (type?: SDKNetwork) => {
  const sdk = useContext(SDKContext);

  if (type == 'karura') {
    return sdk.karura.wallet;
  }

  return sdk.acala.wallet;
};