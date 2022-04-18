const isDevelopment = process.env.NODE_ENV === 'development';

const acalaEndpoints = isDevelopment
  ? {
    Mandala: 'wss://acala-rpc-1.aca-api.network',
  }
  : {
    'Host By Onfinality': 'wss://karura.api.onfinality.io/public-ws',
    'Host By Acala Foundation 0': 'wss://karura-rpc-0.aca-api.network',
    'Host by Acala Foundation 1': 'wss://karura-rpc-1.aca-api.network',
    'Host by Acala Foundation 2': 'wss://karura-rpc-2.aca-api.network/ws',
    'Host by Acala Foundation 3': 'wss://karura-rpc-3.aca-api.network/ws',
  };

const karuraEndpoints = isDevelopment
  ? {
    'Host By Acala Foundation 0': 'wss://karura-rpc-1.aca-api.network',
    'Host by Acala Foundation 1': 'wss://karura-rpc-1.aca-api.network',
    'Host by Acala Foundation 2': 'wss://karura-rpc-2.aca-api.network/ws',
    'Host by Acala Foundation 3': 'wss://karura-rpc-3.aca-api.network/ws',
  }
  : {
    'Host By Onfinality': 'wss://karura.api.onfinality.io/public-ws',
    'Host By Acala Foundation 0': 'wss://karura-rpc-0.aca-api.network',
    'Host by Acala Foundation 1': 'wss://karura-rpc-1.aca-api.network',
    'Host by Acala Foundation 2': 'wss://karura-rpc-2.aca-api.network/ws',
    'Host by Acala Foundation 3': 'wss://karura-rpc-3.aca-api.network/ws',
  };

const polkadotEndpoints = isDevelopment
  ? {
    'Host By Onfinality': 'wss://polkadot.api.onfinality.io/public-ws',
  }
  : {
    'Host By Onfinality': 'wss://polkadot.api.onfinality.io/public-ws',
  };

const kusamaEndpoints = isDevelopment
  ? {
    'Host By Onfinality': 'wss://kusama.api.onfinality.io/public-ws',
  }
  : {
    'Host By Onfinality': 'wss://kusama.api.onfinality.io/public-ws',
  };

const configs = {
  appName: 'Acala DAPP',
  apis: {
    acala: {
      network: 'acala',
      endpoints: acalaEndpoints,
      isParachain: false,
      parachian: 'polkadot',
    },
    polkadot: {
      network: 'polkadot',
      endpoints: polkadotEndpoints,
      isParachain: true,
      parachian: 'null',
    },
    karura: {
      network: 'karura',
      endpoints: karuraEndpoints,
      isParachain: false,
      parachian: 'kusama',
    },
    kusama: {
      network: 'kusama',
      endpoints: kusamaEndpoints,
      isParachain: true,
      parachian: 'null',
    },
  },
};

export default configs as ApplicationConfig;

export type ConnectedNetworks = keyof typeof configs.apis;

export interface ApplicationConfig {
  appName: string;
  apis: {
    [k in ConnectedNetworks]: {
      network: ConnectedNetworks;
      endpoints: Record<string, string>;
      isParachain: boolean;
      parachian: string;
    };
  };
}
