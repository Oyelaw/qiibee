import React from "react";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import { useStore, epicMiddleware } from "../redux/store";
import rootEpic from "../redux/rootEpic";
import { MainLayout, AuthLayout } from "../layouts";
import { routes } from "../routes";
import { getAsset } from "../utils";

const authRoutes = [
  routes.login.path,
  routes.entry.path,
  routes.signup.path,
  routes.customerSignup.path,
  routes.brandSignup.path,
];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const store = useStore({});
  epicMiddleware.run(rootEpic);

  return (
    <Provider store={store}>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>QiBee - Dashboard</title>

        <link rel="stylesheet" href={getAsset("css/core.css")} />
        <link rel="stylesheet" href={getAsset("css/style.css")} />
        <link rel="stylesheet" href={getAsset("css/responsive.css")} />
        <link rel="stylesheet" href={getAsset("css/custom.css")} />

        <link rel="shortcut icon" href={getAsset("images/favicon.png")} />
      </Head>

      {authRoutes.includes(router.pathname) ? (
        <AuthLayout>
          <Component {...pageProps} />
        </AuthLayout>
      ) : (
        <MainLayout>
          <Component {...pageProps} />
        </MainLayout>
      )}
    </Provider>
  );
}
