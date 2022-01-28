import { PresetTokens } from "@acala-network/sdk/wallet/type";
import { useMemo } from "react";
import { useWallet } from ".";

export function usePresetCurrencies(): PresetTokens | undefined {
	const wallet = useWallet();

	return useMemo(() => wallet?.getPresetTokens(), [wallet]);
}
