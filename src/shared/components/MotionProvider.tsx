'use client';

import { LazyMotion, domAnimation } from 'framer-motion';
import { ReactNode } from 'react';

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * Wraps children with framer-motion's LazyMotion provider using domAnimation features.
 * This ensures consistent rendering between server and client, preventing hydration errors.
 *
 * @param props - Component props with children
 * @returns LazyMotion-wrapped children
 */
export const MotionProvider = ({ children }: MotionProviderProps): ReactNode => (
  <LazyMotion features={domAnimation}>
    {children}
  </LazyMotion>
);
