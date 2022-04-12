import { FixedPointNumber } from "@acala-network/sdk-core";
import { AccountId } from "@acala-network/types/interfaces";
import { useEffect, useMemo, useState } from "react";

import { SubmittableExtrinsic } from "@polkadot/api/types";
import { assert } from "@polkadot/util";
import { CONNECTED_NETWORK } from "../../config";
import { useApi } from ".";
import { useSubscription } from "../../hooks/useSubscription";
import { useMemoized } from "../../hooks";


interface ExtrinsicData {
	account?: string | AccountId;
	section: string;
	method: string;
	params: any[] | null | undefined;
	network?: CONNECTED_NETWORK;
}

interface CallInfo {
	isLoadingFee: boolean;
	fee: FixedPointNumber;
	call: SubmittableExtrinsic<"rxjs"> | undefined;
}

export const useExtrinsic = (_data?: ExtrinsicData) => {
  const data = useMemoized(_data);
  const api = useApi(data?.network);
  const [isLoadingFee, setIsLoadingFee] = useState<boolean>(false);
  const [fee, setFee] = useState<FixedPointNumber>(FixedPointNumber.ZERO);
  const [call, setCall] = useState<CallInfo["call"]>();

  const feeDecimal = Number(api?.api?.registry?.chainDecimals?.[0].toString() || "12");

  const buildCall = useMemo(() => {
    return (
      section: string,
      method: string,
      params: ExtrinsicData["params"]
    ): CallInfo["call"] => {
      if (!api.api) return;

      const fn = api.api.tx[section][method];

      assert(fn, `api.tx.${section}.${method} doesn't exists`);

      const call = fn.apply(api, params);

      return call;
    };
  }, [api]);

  const getFee = useMemo(() => {
    return (call: CallInfo["call"], data: ExtrinsicData) => {
      if (!call || !call.paymentInfo || !data.account) {
        setIsLoadingFee(false);

        return;
      }

      setIsLoadingFee(true);

      const account = data.account.toString();

      return call.paymentInfo(account as any).subscribe({
        error: () => {
          setIsLoadingFee(false);
        },
        next: (data) => {
          setIsLoadingFee(false);
          setFee(
            FixedPointNumber.fromInner(data.partialFee.toString(), feeDecimal)
          );
        },
      });
    };
  }, [setIsLoadingFee, setFee]);

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

  return useMemo(() => [call, fee, isLoadingFee] as const, [call, fee, isLoadingFee]);
};
