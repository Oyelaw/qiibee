import React from 'react';

import { BrandTable, CustomerTable } from '../components';
import { windowExists } from '../redux/globals';

export default function homePage() {
  const loggedInUserType = windowExists.localStorage.getItem('loggedInUserType');

  return loggedInUserType == 'brand' ? <CustomerTable /> : <BrandTable />;
}
