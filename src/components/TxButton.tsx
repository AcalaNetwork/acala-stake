import { SubmittableExtrinsic } from "@polkadot/api/types";
import React, { FC, useCallback, useMemo, useState } from "react";
import { useExtension } from "@connector";
import { useSendTx } from "@connector/hooks/useSendTx";
import { useTxTracker } from "@connector/hooks/useTxTracker";
import { ConnectStatus, SendSatuts } from "@connector/types";
import { useOpenModal } from "@state";
import { ModalType } from "@state/application/types";
import { Button } from "./Button";
import { CONNECTED_NETWORK } from "../config";

interface TxButtonProps {
	className?: string;
	error?: string;
	call?: SubmittableExtrinsic<"rxjs">;
	message?: string;
	network?: CONNECTED_NETWORK;
	onSuccess?: () => void;
	onError?: () => void;
}

export const TxButton: FC<TxButtonProps> = React.memo(
  ({
    className,
    children,
    error,
    call,
    message,
    network,
    onError: onCustomErrorHandler,
    onSuccess: onCustomSuccessHandler,
  }) => {
    const sendTx = useSendTx();
    const extension = useExtension();
    const openConnectExtension = useOpenModal(ModalType.ConnectExtension);
    const [trackId, setTrackId] = useState<string>("-1");
    const txData = useTxTracker(trackId);

    const needConnect = extension.status !== ConnectStatus.ready;

    const handleClick = useCallback(
      () => {
        if (needConnect) {
          openConnectExtension();

          return;
        }

        if (call && !error) {
          const id = sendTx({
            call,
            message,
            status: SendSatuts.pending,
            network,
            onFailed: () => {
              setTrackId("-1");
              onCustomErrorHandler && onCustomErrorHandler();
            },
            onSuccess: () => {
              setTrackId("-1");
              onCustomSuccessHandler && onCustomSuccessHandler();
            }
          });
          setTrackId(id);
        }
      },
      [setTrackId, openConnectExtension, needConnect, call, error, network]
    );

    const disabled = useMemo(() => {
      if (!txData) return false;

      return (
        txData.status === SendSatuts.pending ||
				txData.status === SendSatuts.sending
      );
    }, [txData]);

    const content = error ? error : needConnect ? "Connect Wallet" : children;

    return (
      <Button
        className={`w-full ${className}`}
        color="primary"
        disabled={disabled}
        error={!!error}
        onClick={handleClick}
        round="lg"
        variant="filled"
      >
        {content}
      </Button>
    );
  }
);
