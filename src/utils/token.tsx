import {
	forceToCurrencyName,
	unzipDexShareName,
	isDexShareName,
	MaybeCurrency,
	Token,
} from "@acala-network/sdk-core";
import React, { Suspense } from "react";

import AcaIcon from "/public/asset-icons/ACA.svg";
import aUSDIcon from "/public/asset-icons/AUSD.svg";
import BncIcon from "/public/asset-icons/BNC.svg";
import BtcIcon from "/public/asset-icons/BTC.svg";
import DotIcon from "/public/asset-icons/DOT.svg";
import KarIcon from "/public/asset-icons/KAR.svg";
import ksmIcon from "/public/asset-icons/KSM.png";
import KUSDIcon from "/public/asset-icons/KUSD.svg";
import LDotIcon from "/public/asset-icons/LDOT.svg";
import LKsmIcon from "/public/asset-icons/LKSM.svg";
import ParaChainIcon from "/public/asset-icons/parachain.svg";
import PhaIcon from "/public/asset-icons/phala.svg";
import plasmIcon from "/public/asset-icons/plasm.png";
import PolkaBTCIcon from "/public/asset-icons/polkaBTC.svg";
import RenIcon from "/public/asset-icons/REN.svg";
import VSKSMIcon from "/public/asset-icons/vsKSM.svg";
import usdtIcon from "/public/asset-icons/USDT.png";
import { ACALA_TOKEN_LISTS, KARURA_TOKEN_LISTS } from "../sdk";

type SVGComponent = React.FunctionComponent<
	React.SVGProps<SVGSVGElement> & { title?: string | undefined }
>;

export const TOKEN_IMAGES: Map<string, Object | SVGComponent> = new Map([
	["ACA", AcaIcon],
	["AUSD", aUSDIcon],
	["BTC", BtcIcon],
	["DOT", DotIcon],
	["LDOT", LDotIcon],
	["RENBTC", RenIcon],
	["XBTC", BtcIcon],
	["POLKABTC", PolkaBTCIcon],
	["PARACHAIN", ParaChainIcon],
	["PHA", PhaIcon],
	["PLM", plasmIcon],
	["KSM", ksmIcon],
	["KAR", KarIcon],
	["KUSD", KUSDIcon],
	["LKSM", LKsmIcon],
	["BNC", BncIcon],
	["VSKSM", VSKSMIcon],
	["USDT", usdtIcon],
]);

export const TOKEN_FULLNAMES: Map<string, string> = new Map([
	["ACA", "Acala"],
	["AUSD", "Acala Dollar"],
	["BTC", "Bitcoin"],
	["DOT", "Polkadot"],
	["LDOT", "Liquid DOT"],
	["LKSM", "LKSM"],
	["RENBTC", "Ren Bitcoin"],
	["XBTC", "Interchain Bitcoin"],
	["POLKABTC", "Polkadot Bitcoin"],
	["PARACHAIN", "__not_token"],
	["KAR", "Karura"],
	["KUSD", "Karura Dollar"],
	["KSM", "Kusama"],
	["BNC", "BNC"],
	["VSKSM", "vsKSM"],
]);

export const TOKEN_COLOR: Map<string, string> = new Map([
	["SYSTEM", "#173DC9"],
	["ACA", "#173dc9"],
	["BTC", "#F7931A"],
	["XBTC", "#F7931A"],
	["renBTC", "#87888C"],
	["LDOT", "#00F893"],
	["DOT", "#e6007a"],
	["ACA-aUSD", "#173dc9"],
	["aUSD-DOT", "#e6007a"],
	["aUSD-BTC", "#F7931A"],
	["aUSD-XBTC", "#F7931A"],
	["aUSD-renBTC", "#87888C"],
	["aUSD-LDOT", "#00F893"],
	["aUSD-DOT", "#e6007a"],
]);

export const TOKEN_NAME: Map<string, string> = new Map([
	["AUSD", "aUSD"],
	["ACA", "ACA"],
	["BTC", "BTC"],
	["XBTC", "XBTC"],
	["RENBTC", "renBTC"],
	["LDOT", "Liquid DOT"],
	["LKSM", "LKSM"],
	["DOT", "DOT"],
	["POLKABTC", "polkaBTC"],
	["KAR", "KAR"],
	["KUSD", "kUSD"],
	["KSM", "KSM"],
	["BNC", "BNC"],
	["VSKSM", "vsKSM"],
]);

export const TOKEN_WEIGHT: Map<string, number> = new Map([
	["AUSD", 0],
	["ACA", 1],
	["BTC", 2],
	["XBTC", 2],
	["RENBTC", 2],
	["DOT", 2],
	["LDOT", 2],
]);

/**
 * @name getSavedToken
 * @description get token information from saved token list
 * @param token
 * @returns
 */
export function getSavedToken(token: MaybeCurrency): Token {
	const name = forceToCurrencyName(token);

	return ACALA_TOKEN_LISTS[name] || KARURA_TOKEN_LISTS[name];
}

export function getTokenName(token?: string[] | MaybeCurrency): string {
	if (!token) return "";

	// handle array
	if (Array.isArray(token)) {
		return `LP ${getTokenName(token[0])}-${getTokenName(token[1])}`;
	}

	// handle single token
	let name = forceToCurrencyName(token);

	const savedTokenInfo = getSavedToken(token);

	// handle foreign asset
	if (savedTokenInfo?.isForeignAsset) {
		name = savedTokenInfo.symbol;
	}

	// handle dex share token
	if (isDexShareName(name)) {
		const _token = unzipDexShareName(name);

		return `LP ${getTokenName(_token[0])}-${getTokenName(_token[1])}`;
	}

	if (typeof name === "string") {
		return TOKEN_NAME.get(name.toUpperCase()) || name;
	}

	return "";
}

export function getTokenImage(
  token: MaybeCurrency,
  props?: React.PropsWithChildren<any>
): JSX.Element {
	let _token = token;
	if(token == 'lc://13') {
		_token = 'LCDOT'
	}
	if(token == 'CASH') {
		return <img src='https://cdn.subdao.com/tokens/default_128_128.png' {...props} />
	}
  const resource = `https://cdn.subdao.com/tokens/${forceToCurrencyName(_token).toUpperCase()}_128_128.png`;

  return (
		<img src={resource} {...props} />
  );
}

export function getTokenFullName(token: MaybeCurrency): string {
	let name = forceToCurrencyName(token);

	const savedToken = getSavedToken(name);

	if (savedToken?.isForeignAsset) {
		return savedToken.display;
	}

	return TOKEN_FULLNAMES.get(name.toUpperCase());
}

export function getTokenColor(token: MaybeCurrency): string {
  const name = getTokenName(token);

	return TOKEN_COLOR.get(name.toUpperCase()) || "#000000";
}
