import { useContext } from "react";
import { SDKContext } from "../..";

export const useCrossChain = () => {
  const sdk = useContext(SDKContext);

  return sdk.crossChain;
};