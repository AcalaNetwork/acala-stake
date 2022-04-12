import { BaseSDK } from "@acala-network/sdk/types";
import React, { FC, ReactElement, useMemo } from "react";
import { combineLatest, of } from "rxjs";
import { map, switchMap, filter } from "rxjs/operators";
import { useWallet } from "..";
import { PageLoading } from "../../components/PageLoading";
import { useBoolean, useMemoized } from "../../hooks";
import { useSubscription } from "../../hooks/useSubscription";
import { useLiquidity } from "../hooks/liquidity";
import { useHoma } from "../hooks/homa/useHoma";

type SDKType =
	| "acala-wallet"
	| "acala-swap"
	| "acala-liquidity"
	| "acala-homa"
	| "karura-wallet"
	| "karura-swap"
	| "karura-liquidity"
	| "karura-homa";
interface EnsureSDKProps {
	requires: SDKType[];
	loading?: ReactElement;
}

const subscribeRequiredSDKReadyStatus = (
	sdks: Partial<Record<SDKType, BaseSDK>>
) => {
	if (
		Object.values(sdks).filter((i) => !!i).length !== Object.values(sdks).length
	)
		return false;
	return (requires: SDKType[]) => {
		return combineLatest(
			Object.fromEntries(
				requires.map((name) => {
					return [name as string, sdks[name]?.isReady$];
				})
			)
		).pipe(
			map(
				(result) => Object.values(result).filter((item) => !item).length === 0
			)
		);
	};
};

export const EnsureSDKReady: FC<EnsureSDKProps> = React.memo(
	({ requires, children, loading }) => {
		const memoRequireds = useMemoized(requires);
		const { value: isReady, update: updateIsReady } = useBoolean();
		// acala sdk
		const acalaWallet = useWallet("acala");
		const acalaLiquidity = useLiquidity("acala");
		const acalaHoma = useHoma("acala");
		// karura sdk
		const karuraWallet = useWallet("karura");
		const karuraLiquidity = useLiquidity("karura");
		const karuraHoma = useHoma("karura");

		const subscribeReadyStatus = useMemo(() => {
			return subscribeRequiredSDKReadyStatus({
				"acala-wallet": acalaWallet,
				"acala-homa": acalaHoma,
				"acala-liquidity": acalaLiquidity,
				"karura-wallet": karuraWallet,
				"karura-homa": karuraHoma,
				"karura-liquidity": karuraLiquidity,
			});
		}, [
			acalaWallet,
			acalaLiquidity,
			acalaHoma,
			karuraWallet,
			karuraLiquidity,
			karuraHoma,
		]);

		useSubscription(() => {
			if (!subscribeReadyStatus) return;

			return subscribeReadyStatus(memoRequireds).subscribe({ next: updateIsReady });
		}, [subscribeReadyStatus, memoRequireds]);

		if (!isReady) return loading || <PageLoading />;

		return <>{children}</>;
	}
);
