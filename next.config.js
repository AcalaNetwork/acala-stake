module.exports = {
  images: {
    domains: [
      'resources.acala.network'
    ]
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: "javascript/auto",
    });
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            prettier: false,
            svgo: true,
            svgoConfig: {
              plugins: [
                {
                  name: "preset-default",
                  params: {
                    overrides: {
                      // don't delete the viewbox of svg
                      removeViewBox: false,
                      // fix conflict of same ids
                      cleanupIDs: {
                        prefix: {
                          toString() {
                            return `${Math.random().toString(36).substr(2, 9)}`;
                          },
                        },
                      },
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};
