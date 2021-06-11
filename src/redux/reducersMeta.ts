import { combineReducers } from 'redux';

import { metaReducer as auth } from './entities/auth';
import { metaReducer as brands } from './entities/brands';
import { metaReducer as customers } from './entities/customers';

export default combineReducers({
  auth,
  brands,
  customers,
});
