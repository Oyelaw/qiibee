import { combineReducers } from 'redux';

import { reducer as auth } from './entities/auth';
import { reducer as brands } from './entities/brands';
import { reducer as customers } from './entities/customers';

export default combineReducers({
  auth,
  brands,
  customers,
});
