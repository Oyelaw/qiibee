import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { getAsset } from '../utils';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />

          <NextScript />

          <script src={getAsset('js/core.js')}></script>
          <script src={getAsset('js/template.js')}></script>
          <script src={getAsset('js/dashboard.js')}></script>
        </body>
      </Html>
    );
  }
}

export default MyDocument;
