import { AppProps } from 'next/app'
import { wrapper } from '../store';
import Layout from '../layouts/default';


import Router from 'next/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());


const MyApp = ({ Component, pageProps }: AppProps) => {
  return <Layout><Component {...pageProps} /></Layout>
};

/* 
MyApp.getInitialProps = async (appContext) => {

  const { Component, ctx } = appContext;

  const { store } = ctx;

  let pageProps = {};
  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx);
  }  
 
  return { pageProps }
}
*/

export default wrapper.withRedux(MyApp);