import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { wrapper, globalEndSagaTaskToPromise } from '../store';
import globalNavActive from '../store/global-navactive/slice';
import links from "../store/links/slice";
import { State } from '../store/types';
import { GlobalConfigState } from '../store/global-config/types';

import ListItem from "../components/ListItem";
import Pagination from "../components/Pagination";
import { getIndexRecommendApi, getIndexListApi } from "../store/home/server";
import { IndexListResponse, IndexRecommendResponse } from '../store/home/types';
import { getTypeUrl, getThumbHref } from "../utils/url";


/* 
import { END } from 'redux-saga';
import { SagaStore } from '../store/types';
import globalConfigSlice from '../store/global-config/slice'; 
*/


interface HomeProps {
  page: number;
  recommendList: IndexRecommendResponse;
  listData: IndexListResponse;
}

const HomePage: NextPage<HomeProps> = ({ page, recommendList, listData }) => {

  const { config } =  useSelector<State, GlobalConfigState>(state => state.globalConfig);


  return (   
      <>
        <Head>
          <title>首页 - {process.env.APP_SITE_NAME}</title>
          <meta  name="keywords" content={config.keywords} />
          <meta  name="description" content={config.description} />
          <script defer src={process.env.APP_STATIC_LIBURL + "/js/index.js?8d45177c"}></script>
        </Head>

        <div className="container pt-4 pt-lg-5">
          <div className="row justify-content-lg-center">
              <div className="col-12 col-lg-9">
                  <div className="row row-sm">
                      <div className="col-12 col-sm-6 mb-2 mb-sm-0">
                        <div className="lqsblog-media shadow-2x">
                            <Link href={getTypeUrl(recommendList[0]['type'], recommendList[0]['id'])}>
                              <a className="lqsblog-media-content" title={recommendList[0]['title']} style={{backgroundImage: `url(${getThumbHref(recommendList[0]['thumb'])})`}} >
                                  <div className="lqsblog-media-hover"></div>
                                  <div className="title h5 text-center px-3"><span className=" h-2x">{recommendList[0]['title']}</span></div>
                              </a>
                            </Link>
                        </div>
                      </div>
                      <div className="col-12 col-sm-6">
                        <div className="row row-sm mb-2 mb-md-3">
                            <div className="col-6">
                                <div className="lqsblog-media shadow-2x">
                                  <Link href={getTypeUrl(recommendList[1]['type'], recommendList[1]['id'])}>
                                    <a className="lqsblog-media-content" title={recommendList[1]['title']} style={{backgroundImage: `url(${getThumbHref(recommendList[1]['thumb'])})`}} >
                                        <div className="lqsblog-media-hover"></div>
                                        <div className="title h6 text-center px-3"><span className=" h-2x">{recommendList[1]['title']}</span></div>
                                    </a>
                                  </Link>                                   
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="lqsblog-media shadow-2x">
                                    <Link href={getTypeUrl(recommendList[2]['type'], recommendList[2]['id'])}>
                                      <a className="lqsblog-media-content" title={recommendList[2]['title']} style={{backgroundImage: `url(${getThumbHref(recommendList[2]['thumb'])})`}} >
                                          <div className="lqsblog-media-hover"></div>
                                          <div className="title h6 text-center px-3"><span className=" h-2x">{recommendList[2]['title']}</span></div>
                                      </a>
                                    </Link>                                     
                                </div>
                            </div>
                        </div>
                        <div className="row row-sm">
                            <div className="col-6">
                                <div className="lqsblog-media shadow-2x">
                                    <Link href={getTypeUrl(recommendList[3]['type'], recommendList[3]['id'])}>
                                      <a className="lqsblog-media-content" title={recommendList[3]['title']} style={{backgroundImage: `url(${getThumbHref(recommendList[3]['thumb'])})`}} >
                                          <div className="lqsblog-media-hover"></div>
                                          <div className="title h6 text-center px-3"><span className=" h-2x">{recommendList[3]['title']}</span></div>
                                      </a>
                                    </Link>
                                </div>
                            </div>
                            <div className="col-6">
                                <div className="lqsblog-media shadow-2x">
                                    <Link href={getTypeUrl(recommendList[4]['type'], recommendList[4]['id'])}>
                                      <a className="lqsblog-media-content" title={recommendList[4]['title']} style={{backgroundImage: `url(${getThumbHref(recommendList[4]['thumb'])})`}} >
                                          <div className="lqsblog-media-hover"></div>
                                          <div className="title h6 text-center px-3"><span className=" h-2x">{recommendList[4]['title']}</span></div>
                                      </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                      </div>

                  </div>
              </div>
          </div>
        </div>

        <div className="container pt-4 pt-lg-5">
          <div className="row justify-content-lg-center">
              <div className="col-12 col-lg-9">

                  <ListItem list={listData.list} />
                
                  <Pagination total={listData.total} currentPage={page} pageUrl="/?page={page}" />

                  
              </div>
          </div>
        </div>

        
      </>
  )
}

export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {

  const { page  = 1 } = query;
  const pageNum: number = parseInt(page as string);

  store.dispatch(globalNavActive.actions.success('home'));
  store.dispatch(links.actions.loadRecommend());
  await globalEndSagaTaskToPromise(store);

  let indexRecommend: IndexRecommendResponse = [
    {id: 0,type: 0,title: '', thumb: '',sid: 0},
    {id: 0,type: 0,title: '', thumb: '',sid: 0},
    {id: 0,type: 0,title: '', thumb: '',sid: 0},
    {id: 0,type: 0,title: '', thumb: '',sid: 0},
    {id: 0,type: 0,title: '', thumb: '',sid: 0},
  ];
  let indexListData: IndexListResponse = {
    list: [],
    total: 0,
    currentPage: 1
  };
  try {
    const recommendResponse = await getIndexRecommendApi() as unknown as IndexRecommendResponse; 
    let ids: number[] = [];
    indexRecommend = [];
    for (let index = 0; index < 5; index++) {
      const element = recommendResponse[index];
      if (element) {
        indexRecommend.push(element);
        ids.push(element.sid);
      } else {
        indexRecommend.push({
          id: 0,
          type: 0,
          title: '',
          thumb: '',
          sid: 0
        })
      }
    }  
    indexListData = await getIndexListApi(10, pageNum, ids.join(',')) as unknown as IndexListResponse;    
  } catch (e) {
    console.error('...error...', e);
  }

  return { 
    props: { 
      page: pageNum,
      recommendList: indexRecommend,
      listData: indexListData
    } 
  }

  /* 
  store.dispatch(globalConfigSlice.actions.load());
  store.dispatch(END);
  await (store as SagaStore).sagaTask.toPromise(); 
  */

});

export default HomePage;