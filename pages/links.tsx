import { NextPage } from 'next';
import Head from 'next/head';
import { useSelector } from 'react-redux';
import { globalEndSagaTaskToPromise, wrapper } from '../store';
import globalNavActive from '../store/global-navactive/slice';

import { State } from '../store/types';
import { LinksState } from '../store/links/types';
import links from '../store/links/slice';

import { getThumbNoPic } from "../utils/url";




const metaInfo = {
  title: '左邻右舍',
  keywords: '左邻右舍, 友情链接, 超链接, 好友链接, 链接交换, links',
  description: '这里是我的左邻右舍；我的个人链接收藏夹，常用的、实用的、有趣的、有参考性的技术网站。'
}

interface LinksProps {
}

const LinksPage: NextPage<LinksProps> =  () =>  {

  const { listData } =  useSelector<State, LinksState>(state => {
    return state.links;
  });


  return (   
      <>
        <Head>
          <title>{metaInfo.title} - {process.env.APP_SITE_NAME}</title>
          <meta  name="keywords" content={metaInfo.keywords} />
          <meta  name="description" content={metaInfo.description} />
          <script defer src={process.env.APP_STATIC_LIBURL + "/js/links.js?9026a635"}></script>
        </Head>


        <div className="container pt-4 pt-lg-5">
            <div className="row justify-content-lg-center">
                <div className="col-12 col-lg-9 py-4 py-lg-5">
          
                  <h1 className="h3 mb-4">左邻右舍</h1>
                  {listData.map((item, index) => {
                      return (
                        <div className="m-0 py-md-2" key={index}>
                            <div className="d-flex pt-4 pb-0">
                              <div className="pr-2 text-lg text-primary">
                                <svg className="icon" aria-hidden="true">
                                    <use xlinkHref="#lqsblog-links-fill"></use>
                                </svg>
                              </div>
                              <div>
                                <div className="h5 h-1x"><a>{item.name}</a></div>
                                <div className="text-xs text-muted mt-2">
                                  <span className="d-inline-block"></span>
                                </div>
                              </div>
                            </div>
                            
                            <div className="row lqsblog-list-grid">
                              {item.children.map((item2, index2) => {
                                return (
                                  <div className="col-md-6" key={index2}>
                                    <div className="lqsblog-list-item">
                                      <div className="lqsblog-media w-48">
                                        <a className="lqsblog-media-content rounded-circle" href={item2.href} target="_blank" style={{backgroundImage: `url(${getThumbNoPic(item2.logo)})`}}></a>
                                      </div>
                                      <div className="lqsblog-list-content">
                                        <div className="lqsblog-list-body">
                                          <a href={item2.href} target="_blank" className="text-sm text-secondary h-2x">{item2.title}</a>
                                          <div className="d-none d-md-block text-xs text-muted mt-1"><div className="h-1x">{item2.description}</div></div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                        </div>
                      )
                  })}
          
          
                </div>
            </div>
        </div>
      

      </>
  )
}


export const getServerSideProps = wrapper.getServerSideProps(async ({ store }) => {
  store.dispatch(globalNavActive.actions.success('links'));
  store.dispatch(links.actions.loadList())
  await globalEndSagaTaskToPromise(store);
});

export default LinksPage;
