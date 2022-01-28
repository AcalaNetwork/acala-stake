import { useContext, useCallback } from "react";
import { ConnectorContext } from "..";
import { SubmitData } from "../types";

export const useSendTx = () => {
	const { sendTx } = useContext(ConnectorContext);

	return useCallback(
		(data?: Omit<SubmitData, 'trackId'>) => {
			if (!sendTx || !data) return;

			return sendTx(data);
		},
		[sendTx]
	);
};
