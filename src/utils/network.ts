import { upperFirst } from "lodash";

export function getNetworkName (network: string) {
  return upperFirst(network);
}