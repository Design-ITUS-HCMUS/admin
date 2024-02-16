'use client';
import { Provider } from 'react-redux';

import store from '@/libs/redux';

/**
 * Store Provider
 *
 * This component will provide the global store
 * to any wrapped children
 */
export default function StoreProvider({ children }: { children: React.ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
