import { combineReducers } from 'redux';

import bundleReducer from './bundlesReducer';
import cellsReducer from './cellReducer';

const reducers = combineReducers({
  cells: cellsReducer,
  bundles: bundleReducer,
});

export default reducers;

export type RootState = ReturnType<typeof reducers>;
