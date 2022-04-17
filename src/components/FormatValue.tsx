import React, { FC, memo } from 'react';

import { FormatNumber, FormatNumberProps } from './FormatNum';

const formatValueConfig: FormatNumberProps['formatNumberConfig'] = {
  decimalLength: 2,
  removeEmptyDecimalParts: true,
  removeTailZero: false,
};

export const FormatValue: FC<FormatNumberProps> = memo((props) => {
  return <FormatNumber formatNumberConfig={formatValueConfig} prefix={'$ '} {...props} />;
});
