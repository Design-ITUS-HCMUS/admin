import { combineReducers } from '@reduxjs/toolkit';

import toast from './toast.reducer';

const rootReducer = combineReducers({ toast });
type RootState = ReturnType<typeof rootReducer>;

export type { RootState };
export default rootReducer;
