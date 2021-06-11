import React from "react";

import { Navbar, Footer, Sidebar } from "../partials";

export default function MainLayout({ children }) {
  return (
    <div className="main-wrapper">
      <Sidebar />

      <div className="page-wrapper">
        <Navbar />
        {children}
        <Footer />
      </div>
    </div>
  );
}
