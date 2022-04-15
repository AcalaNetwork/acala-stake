import { FixedPointNumber } from "@acala-network/sdk-core";
import { AccountId } from "@acala-network/types/interfaces";
import { useEffect, useMemo, useState } from "react";

import { SubmittableExtrinsic } from "@polkadot/api/types";
import { assert } from "@polkadot/util";
import { useApi } from ".";
import { useSubscription } from "../../hooks/useSubscription";
import { usePresetTokens } from "./usePresetTokens";
import { SDKNetwork } from "@sdk/types";
import { TokenAmount } from "@connector/types";
import { useMemoized } from "@hooks";


export interface ExtrinsicConfigs {
	account?: string | AccountId;
	section: string;
	method: string;
	params: any[] | null | undefined;
	network: SDKNetwork;
}

export interface CallInfo {
	isLoadingFee: boolean;
	fee: TokenAmount;
	call: SubmittableExtrinsic<"rxjs"> | undefined;
}

export const useExtrinsic = (_data: ExtrinsicConfigs): CallInfo => {
  const data = useMemoized(_data);
  const api = useApi(data.network);
  const [isLoadingFee, setIsLoadingFee] = useState<boolean>(false);
  const [fee, setFee] = useState<FixedPointNumber>(FixedPointNumber.ZERO);
  const [call, setCall] = useState<CallInfo["call"]>();
  const nativeToken = usePresetTokens(data.network)?.nativeToken;
  const feeDecimal = nativeToken?.decimals;

  const buildCall = useMemo(() => {
    return (
      section: string,
      method: string,
      params: ExtrinsicConfigs["params"]
    ): CallInfo["call"] => {
      if (!api.api) return;

      const fn = api.api.tx[section][method];

      assert(fn, `api.tx.${section}.${method} doesn't exists`);

      const call = fn.apply(api, params);

      return call;
    };
  }, [api]);

  const getFee = useMemo(() => {
    return (call: CallInfo["call"], data: ExtrinsicConfigs) => {
      if (!call || !call.paymentInfo || !data.account) {
        setIsLoadingFee(false);

        return;
      }

      setIsLoadingFee(true);

      const account = data.account.toString();

      return call.paymentInfo(account).subscribe({
        error: () => setIsLoadingFee(false),
        next: (data) => {
          setIsLoadingFee(false);
          setFee(FixedPointNumber.fromInner(data.partialFee.toString(), feeDecimal));
        },
      });
    };
  }, [feeDecimal]);

  // try to build call, set call to null if build failed
  useEffect(() => {
    if (!data) return;

    try {
      const call = buildCall(data.section, data.method, data.params);

      setCall(call);
    } catch (e) {
      setCall(undefined);
    }
  }, [data, setCall, buildCall]);

  // try to get fee data
  useSubscription(() => {
    if (!data || !call) return;

    return getFee(call, data);
  }, [call, data]);

  return useMemo(() => ({
    call,
    fee: {
      amount: fee,
      token: nativeToken
    },
    isLoadingFee
  }), [call, fee, isLoadingFee, nativeToken]);
};
