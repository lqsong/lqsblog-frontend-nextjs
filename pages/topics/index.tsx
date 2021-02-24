import { NextPage } from 'next';
import Head from 'next/head'
import Link from 'next/link';
import { globalEndSagaTaskToPromise, wrapper } from '../../store';
import globalNavActive from '../../store/global-navactive/slice';
import { getTopicsListApi } from '../../store/topics/server';
import { TopicsListResponse } from '../../store/topics/types';

import Pagination from "../../components/Pagination";

import { getTypeUrl, getThumbHref } from "../../utils/url";

const metaInfo = {
    title: '专题',
    keywords: '文章专题, 作品专题, 专题列表, 技术专题, 前端专题, 后端专题, 网站开发专题',
    description: '这是一个专题列表，包含个人作品专题、个人文章专题、网站开发专题、IT技术专题'
}

interface TopicsPageProps {
    page: number;
    pageUrl: string;
    listData: TopicsListResponse;
}

const TopicsPage: NextPage<TopicsPageProps> = ({ page, pageUrl, listData }) =>  {


  return (   
      <>
        <Head>
          <title>{metaInfo.title} - {process.env.APP_SITE_NAME}</title>
          <meta  name="keywords" content={metaInfo.keywords} />
          <meta  name="description" content={metaInfo.description} />
          <script defer src={process.env.APP_STATIC_LIBURL + "/js/topics.js?c18057ce"}></script>
        </Head>


        <div className="container pt-4 pt-lg-5">
          <div className="row justify-content-lg-center">
            <div className="col-12 col-lg-9 py-4 py-lg-5">
        
                    <h1 className="h3 mb-4">Topics</h1>
        
                    <div className="row my-n2 m-lg-n4">
        
        
                       {listData.list.map((item,index) => <div key={index} className="col-12 col-lg-6 py-2 p-lg-4">
                            <div className="card m-0 py-md-2">
                                <div className="card-header d-flex pt-4 pb-0">
                                    <div className="pr-2 text-lg text-primary">
                                        <svg className="icon" aria-hidden="true">
                                            <use xlinkHref="#lqsblog-eidt"></use>
                                        </svg>
                                    </div>
                                    <div>
                                        <div className="h5 h-1x"><Link href={`/topics/detail/${item.alias}`}><a>{ item.title }</a></Link></div>
                                        <div className="text-xs text-muted mt-2">
                                            <span className="d-inline-block">{ item.quantity } 篇文章</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="lqsblog-list-grid">
                                    {item.conlist.map((item2, index2) => <div key={index2} className="lqsblog-list-item">
                                        <div className="lqsblog-media w-48">
                                            <Link href={getTypeUrl(item2.type, item2.id)}>
                                            <a className="lqsblog-media-content rounded-circle" style={{backgroundImage: `url(${getThumbHref(item2.thumb)})`}}></a>
                                            </Link>
                                        </div>
                                        <div className="lqsblog-list-content ">
                                            <div className="lqsblog-list-body ">
                                                <Link href={getTypeUrl(item2.type, item2.id)}>
                                                <a className="text-sm text-secondary h-2x">
                                                { item2.title }
                                                </a>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>)}
                                    
                                   
        
                                </div>
                            </div>
                        </div>)}
                        
        
                    </div>
        
        
        
                    <Pagination total={listData.total} pageUrl={pageUrl} currentPage={page} />

        
                  
            </div>
          </div>
        </div>
        


      </>
  )
}





export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {

  const { page  = 1 } = query;
  const pageNum: number = parseInt(page as string);


  store.dispatch(globalNavActive.actions.success('topics'));
  await globalEndSagaTaskToPromise(store);
  

  let listData: TopicsListResponse = {
      list: [],
      total: 0,
      currentPage: 1
  }  
 
  try {
    listData = await getTopicsListApi(10, pageNum) as unknown as TopicsListResponse;
  } catch (e) {
    console.error('...error...', e);
  }

  return { 
    props: { 
      page: pageNum,
      pageUrl: `/topics?page={page}`,
      listData
    } 
  }


});




export default TopicsPage;
