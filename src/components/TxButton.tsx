import { SubmittableExtrinsic } from "@polkadot/api/types";
import React, { FC, useCallback, useMemo, useState } from "react";
import { CONNECTED_NETWORK, PRIMARY_NETWORK } from "../config";
import { useExtension } from "../connector";
import { useSendTx } from "../connector/hooks/useSendTx";
import { useTxTracker } from "../connector/hooks/useTxTracker";
import { ConnectStatus, SendSatuts } from "../connector/types";
import { useOpenModal } from "../state";
import { ModalType } from "../state/application/types";
import { Button } from "./Button";

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
		network = PRIMARY_NETWORK,
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
				variant="filled"
				color="primary"
				className={`w-full mt-22 ${className}`}
				round="lg"
				onClick={handleClick}
				error={!!error}
				disabled={disabled}
			>
				{content}
			</Button>
		);
	}
);
