import { useContext } from "react";
import { SDKContext } from "../..";
import { SDKNetwork } from "../../types";

export const useHoma = (type?: SDKNetwork) => {
  const sdk = useContext(SDKContext);

  if (type === 'karura') {
    return sdk.karura.homa;
  }

  return sdk.acala.homa;
};