import React from 'react';

import Svg, { Path } from 'react-native-svg';

import { IconBase } from '@components';

export function SearchIcon({ color = 'black', size = 28 }: IconBase) {
  return (
    <Svg width={size} height={size} fill="none"><Path fill={color} d="M12.532 19.033a6.87 6.87 0 0 0 3.797-1.142l3.85 3.858c.255.246.58.37.931.37.73 0 1.266-.572 1.266-1.293 0-.334-.114-.659-.36-.905l-3.824-3.84a6.86 6.86 0 0 0 1.257-3.965c0-3.805-3.111-6.917-6.917-6.917-3.797 0-6.917 3.112-6.917 6.917 0 3.806 3.112 6.917 6.917 6.917m0-1.846c-2.786 0-5.071-2.285-5.071-5.07 0-2.787 2.285-5.072 5.071-5.072s5.072 2.285 5.072 5.071-2.286 5.072-5.072 5.072"/></Svg>
  );
}
