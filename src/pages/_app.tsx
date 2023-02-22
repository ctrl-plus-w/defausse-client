import '@style/globals.css';

import type { AppProps } from 'next/app';

import Notifications from '@layout/Notifications';
import Layout from '@layout/Layout';

import { wrapper } from '@redux/index';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Notifications />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default wrapper.withRedux(App);
