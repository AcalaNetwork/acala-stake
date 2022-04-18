export type CONNECTED_NETWORK = 'acala' | 'polkadot' | 'karura' | 'kusama';
export interface ApplicationConfig {
	appName: string;
	apis: Record<
		CONNECTED_NETWORK,
		{
			network: CONNECTED_NETWORK;
			endpoints: Record<string, string>;
			isPrimary: boolean;
		}
	>;
}

const isDevelopment = process.env.NODE_ENV === "development";

const acalaEndpoints = isDevelopment
  ? {
    "Mandala": "wss://acala-rpc-1.aca-api.network",
  }
  : {
    'Host By Onfinality': 'wss://acala-polkadot.api.onfinality.io/public-ws',
    'Host By Acala Foundation 0': 'wss://acala-rpc-0.aca-api.network',
    'Host By Acala Foundation 1': 'wss://acala-rpc-1.aca-api.network',
    'Host By Acala Foundation 2': 'wss://acala-rpc-2.aca-api.network/ws',
    'Host By Acala Foundation 3': 'wss://acala-rpc-3.aca-api.network/ws',
    'Host By Polkawallet': 'wss://acala.polkawallet.io'
  };

const karuraEndpoints = isDevelopment
  ? {
    "Host By Acala Foundation 0": "wss://karura-rpc-1.aca-api.network",
    "Host by Acala Foundation 1": "wss://karura-rpc-1.aca-api.network",
    "Host by Acala Foundation 2": "wss://karura-rpc-2.aca-api.network/ws",
    "Host by Acala Foundation 3": "wss://karura-rpc-3.aca-api.network/ws",
  }
  : {
    "Host By Onfinality": "wss://karura.api.onfinality.io/public-ws",
    "Host By Acala Foundation 0": "wss://karura-rpc-0.aca-api.network",
    "Host by Acala Foundation 1": "wss://karura-rpc-1.aca-api.network",
    "Host by Acala Foundation 2": "wss://karura-rpc-2.aca-api.network/ws",
    "Host by Acala Foundation 3": "wss://karura-rpc-3.aca-api.network/ws",
  };

const polkadotEndpoints = isDevelopment
  ? {
    "Host By Onfinality": "wss://polkadot.api.onfinality.io/public-ws",
  }
  : {
    "Host By Onfinality": "wss://polkadot.api.onfinality.io/public-ws",
  };

const kusamaEndpoints = isDevelopment
  ? {
    "Host By Onfinality": "wss://kusama.api.onfinality.io/public-ws",
  }
  : {
    "Host By Onfinality": "wss://kusama.api.onfinality.io/public-ws",
  };

const configs = {
  appName: "Acala DAPP",
  apis: {
    acala: {
      network: 'acala',
      endpoints: acalaEndpoints,
      isPrimary: true,
    },
    polkadot: {
      network: 'polkadot',
      endpoints: polkadotEndpoints,
      isPrimary: false,
    },
    karura: {
      network: 'karura',
      endpoints: karuraEndpoints,
      isPrimary: true,
    },
    kusama: {
      network: 'kusama',
      endpoints: kusamaEndpoints,
      isPrimary: false,
    },
  },
} as ApplicationConfig;

export const PRIMARY_NETWORK = Object.values(configs.apis).find(
  (item) => item.isPrimary
)?.network as CONNECTED_NETWORK;

export default configs;
