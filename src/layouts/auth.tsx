import React, { Fragment } from "react";

export default function AuthLayout({ children }) {
  return (
    <Fragment>
      <div className="main-wrapper">
        <div className="page-wrapper full-page">{children}</div>
      </div>
    </Fragment>
  );
}
