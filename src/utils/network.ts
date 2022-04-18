import { lowerCase, upperFirst } from 'lodash';

export function getNetworkName(network: string) {
  return upperFirst(network);
}

export function getNetworkImage (network: string) {
  return `https://resources.acala.network/networks/${lowerCase(network)}.png`;
}