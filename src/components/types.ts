import { ReactNode } from 'react';

export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

export interface BaseComponentProps {
  className?: string;
  children?: ReactNode;
}
