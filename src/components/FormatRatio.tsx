import { FixedPointNumber } from '@acala-network/sdk-core';
import React, { FC, useMemo } from 'react';

import { FormatNumber, FormatNumberProps } from './FormatNum';

const DefaultFormatRatioConfig: FormatNumberProps['formatNumberConfig'] = {
  decimalLength: 2,
  removeEmptyDecimalParts: true,
  removeTailZero: true,
};

type FormatRatioProps = Omit<FormatNumberProps, 'formatNumberConfig'> & {
  formatNumberConfig?: Partial<FormatNumberProps['formatNumberConfig']>;
};

export const FormatRatio: FC<FormatRatioProps> = ({ data, formatNumberConfig, ...props }) => {
  const _data = useMemo(() => {
    try {
      if (data instanceof FixedPointNumber) {
        return data.times(new FixedPointNumber(100));
      }

      if (typeof data === 'string' || typeof data === 'number') {
        return new FixedPointNumber(data).times(new FixedPointNumber(100));
      }
    } catch (e) {
      return 0;
    }
  }, [data]);

  const _formatRatioConfig = useMemo(() => {
    return {
      ...DefaultFormatRatioConfig,
      ...formatNumberConfig,
    };
  }, [formatNumberConfig]);

  return <FormatNumber data={_data} formatNumberConfig={_formatRatioConfig}
    suffix='%' {...props} />;
};
