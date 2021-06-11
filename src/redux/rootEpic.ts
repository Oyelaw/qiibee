import { combineEpics } from 'redux-observable';

import { epic as auth } from './entities/auth';
import { epic as brands } from './entities/brands';
import { epic as customers } from './entities/customers';

export default combineEpics(auth, brands, customers);
