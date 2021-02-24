import { NextPage } from 'next';
import Head from 'next/head'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';
import { wrapper, globalEndSagaTaskToPromise } from '../store';
import globalNavActive from '../store/global-navactive/slice';

import { State } from '../store/types';
import { AboutState } from "../store/about/types";
import about from "../store/about/slice";



interface AboutProps {
}

const AboutPage: NextPage<AboutProps> = () => {

  const { about } =  useSelector<State, AboutState>(state => {
    return state.about;
  });

  const viewerDiv = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    if(viewerDiv.current.children.length < 1 && window.$ && window.$('#viewer').toastuiEditor && about.content !== '') {
      window.$('#viewer').toastuiEditor({initialValue: about.content});
    }
  },[about.content])


  return (
      <>
        <Head>
          <title>{about.title} - {process.env.APP_SITE_NAME}</title>
          <meta  name="keywords" content={about.keywords} />
          <meta  name="description" content={about.description} />
          <script defer src={process.env.APP_STATIC_LIBURL + "/js/about.js?ac04b5db"}></script>
        </Head>



        <div className="container pt-4 pt-lg-5">
          <div className="row justify-content-lg-center">
              <div className="col-12 col-lg-9 py-4 py-lg-5">
        
                <h1 className="h3 mb-4">About Me</h1>
                
                <div id="viewer" ref={viewerDiv}></div>
                <div id="viewerText" style={{display: 'none'}}>{about.content}</div>
              </div>
          </div>
        </div>

      </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  store.dispatch(globalNavActive.actions.success('about'));
  store.dispatch(about.actions.load());
  
  await globalEndSagaTaskToPromise(store);

});


export default AboutPage;
