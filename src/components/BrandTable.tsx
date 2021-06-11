import React from 'react';
import { useSelector } from 'react-redux';

import DataTable from '../components/DataTable';
import { selector } from '../redux/entities/brands';
import { windowExists } from '../redux/globals';

export default function brandPage() {
  const brandData = useSelector((state) => selector(state));
  const user = windowExists.localStorage.getItem('loggedInUser');

  const { following } = JSON.parse(user);

  const followedBrandsId = following?.map((item) => item.brandId);

  return (
    <DataTable
      records={brandData}
      columns={[
        {
          key: 'brandName',
          text: 'Brand Name',
          align: 'left',
          sortable: true,
        },
        {
          key: 'brandMaxLoyaltyPoint',
          text: 'Max Loyalty Point',
          align: 'left',
          sortable: true,
        },
        {
          key: 'action',
          text: 'Action',
          className: 'action',
          width: 100,
          align: 'left',
          sortable: false,
          cell: (record) => {
            const { id } = record;

            if (followedBrandsId && followedBrandsId.find((item) => item == id)) {
              return (
                <button className="btn btn-primary btn-sm" style={{ marginRight: '5px' }}>
                  <i className="fa fa-edit"></i>
                  Follow
                </button>
              );
            } else {
              return (
                <button className="btn btn-primary btn-sm" style={{ marginRight: '5px' }}>
                  <i className="fa fa-edit"></i>
                  UnFollow
                </button>
              );
            }
          },
        },
      ]}
    />
  );
}
