import { useContext, useMemo } from "react";
import { ConnectorContext } from "..";
import { PRIMARY_NETWORK } from "../../config";
import { SubstrateConnectorData } from "../types";

// we ensure that the connector data is always exists.
export const useApi = (network = PRIMARY_NETWORK): SubstrateConnectorData => {
	const data = useContext(ConnectorContext);

	return useMemo(() => data.apis?.[network], [network, data]);
};
