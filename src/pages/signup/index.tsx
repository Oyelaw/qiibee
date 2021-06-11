import React from "react";
import Link from "next/link";

// TODO: Remove inline styles
export default function signupLandingPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h3>Sign up</h3>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: "2em",
            width: "100%",
          }}
        >
          <div
            style={{
              backgroundColor: "pink",
              padding: "1em",
              borderRadius: ".5em",
              width: "30%",
              textAlign: "center",
            }}
          >
            <Link href="/signup/customer">
              <h4 style={{ color: "white", fontWeight: "bold" }}>Customer</h4>
            </Link>
          </div>
          <div
            style={{
              backgroundColor: "pink",
              padding: "1em",
              borderRadius: ".5em",
              width: "30%",
              textAlign: "center",
            }}
          >
            <Link href="/signup/brand">
              <h4 style={{ color: "white", fontWeight: "bold" }}>Brand</h4>
            </Link>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-between">
          <a href="/" rel="noreferrer" className="d-block mt-3 text-muted">
            Already a user? Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
