import { NextPage } from 'next';
import Head from 'next/head'
import { globalEndSagaTaskToPromise, wrapper } from '../../store';
import globalNavActive from '../../store/global-navactive/slice';
import { getWorksListApi } from '../../store/works/server';
import { WorksListResponse } from '../../store/works/types';

import ListItemWorks from "../../components/ListItem/works";
import Pagination from "../../components/Pagination";

const metaInfo = {
  name: '作品',
  title: '作品',
  keywords: '个人作品, 作品展示, 作品欣赏, 作品列表, 李庆松的作品集',
  description: '这里是我的个人作品展示，基本上是《网站开发》作品，包含：html、css、javascript、nodejs、vue、react、php、java、小程序。'
}


interface WorksPageProps {
  page: number;
  pageUrl: string;
  listData: WorksListResponse;
}

const WorksPage: NextPage<WorksPageProps> = ({ page, pageUrl, listData }) => {


  return (   
      <>
        <Head>
          <title>{metaInfo.title} - {process.env.APP_SITE_NAME}</title>
          <meta  name="keywords" content={metaInfo.keywords} />
          <meta  name="description" content={metaInfo.description} />
          <script defer src={process.env.APP_STATIC_LIBURL + "/js/works.js?77c5d533"}></script>
        </Head>





        <div className="lqsblog-list-header bg-light py-4 py-lg-5">
          <div className="container">
            <div className="row justify-content-lg-center">
                <div className="col-12 col-lg-9">
                    <h1 className="h3">
                      <span className="lqsblog-list-h-title">{ metaInfo.name }</span>
                    </h1>
                    <div className="mt-2 mt-md-3">
                      <p>{ metaInfo.description }</p>
                    </div>			
                </div>
            </div>
          </div>
        </div>


        <div className="container pt-4 pt-lg-5">
          <div className="row justify-content-lg-center">
              <div className="col-12 col-lg-9">

                  <ListItemWorks list={listData.list} />

                  <Pagination total={listData.total} currentPage={page} pageUrl={pageUrl} />
                    
                   
                  
              </div>
          </div>
        </div>
        





     
      </>
  )
}




export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {

  const { page  = 1 } = query;
  const pageNum: number = parseInt(page as string);

  store.dispatch(globalNavActive.actions.success('works'));
  await globalEndSagaTaskToPromise(store);
  
  
  let listData: WorksListResponse = {
    list: [],
    total: 0,
    currentPage: 1
  };
  try {
    listData = await getWorksListApi(10, pageNum) as unknown as WorksListResponse;    
  } catch (e) {
    console.error('...error...', e);
  }

  return { 
    props: { 
      page: pageNum,
      pageUrl: '/works?page={page}',
      listData,
    } 
  }


});



export default WorksPage;
