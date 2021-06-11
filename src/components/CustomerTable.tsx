import React from "react";
import { useSelector } from "react-redux";
import DataTable from "../components/DataTable";
import { selector as customersSelector } from "../redux/entities/customers";

export default function brandPage() {
  const customerData = useSelector((state) => customersSelector(state));

  const filterByBrand = (followingArray, name) => {
    return followingArray.filter(
      (followingObject) => followingObject.brandName === name
    );
  };

  const followers = customerData.filter((customer) =>
    filterByBrand(customer.following, "acme")
  );

  return (
    <DataTable
      records={customerData}
      columns={[
        {
          key: "firstName",
          text: "First Name",
          align: "left",
          sortable: true,
        },
        {
          key: "lastName",
          text: "Last Name",
          align: "left",
          sortable: true,
        },
        {
          key: "loyaltyPoint",
          text: "Loyalty Point",
          sortable: true,
        },
      ]}
    />
  );
}
