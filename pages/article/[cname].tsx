import { NextPage } from 'next';
import Head from 'next/head';
import { globalEndSagaTaskToPromise, wrapper } from '../../store';
import globalNavActive from '../../store/global-navactive/slice';
import { ArticleCategoryResponse, ArticleListResponse } from '../../store/article/types';
import { getArticleListApi, getArticleCategoryApi } from '../../store/article/server';

import ListItemArticle from '../../components/ListItem/article';
import Pagination from "../../components/Pagination";

interface ArticlePageProps {
  page: number;
  pageUrl: string;
  categoryData: ArticleCategoryResponse;
  listData: ArticleListResponse;
}

const ArticlePage: NextPage<ArticlePageProps> = ({ page, pageUrl, categoryData, listData }) => {





  return (   
      <>
        <Head>
          <title>{categoryData.title} - {process.env.APP_SITE_NAME}</title>
          <meta  name="keywords" content={categoryData.keywords} />
          <meta  name="description" content={categoryData.description} />
          <script defer src={process.env.APP_STATIC_LIBURL + "/js/article.js?3b8d0c99"}></script>
        </Head>



        <div className="lqsblog-list-header bg-light py-4 py-lg-5">
          <div className="container">
            <div className="row justify-content-lg-center">
                <div className="col-12 col-lg-9">
                    <h1 className="h3">
                      <span className="lqsblog-list-h-title">{categoryData.name}</span>
                    </h1>
                    <div className="mt-2 mt-md-3">
                      <p>{categoryData.description}</p>
                    </div>			
                </div>
            </div>
          </div>
        </div>


        <div className="container pt-4 pt-lg-5">
          <div className="row justify-content-lg-center">
              <div className="col-12 col-lg-9">
        

                  <ListItemArticle list={listData.list} />


                  <Pagination total={listData.total} currentPage={page} pageUrl={pageUrl}/>

                  

        
                  
              </div>
          </div>
        </div>
        




      </>
  )
}



export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query, params }) => {

  const { page  = 1 } = query;
  const { cname = '' } = params;
  const pageNum: number = parseInt(page as string);
  const cnameStr: string = cname === 'detail' ? '' : cname as string;

  store.dispatch(globalNavActive.actions.success('article'));
  await globalEndSagaTaskToPromise(store);
  
  let categoryData: ArticleCategoryResponse = {
    id: 0,
    name: '',
    alias: '',
    title: '',
    keywords: '',
    description: ''
  }
  
  let listData: ArticleListResponse = {
    list: [],
    total: 0,
    currentPage: 1
  };
  try {
    categoryData = await getArticleCategoryApi(cnameStr) as unknown as ArticleCategoryResponse;
    listData = await getArticleListApi(10, pageNum, categoryData.id || '') as unknown as ArticleListResponse;    
  } catch (e) {
    console.error('...error...', e);
  }

  return { 
    props: { 
      page: pageNum,
      pageUrl: cnameStr !== '' ? `/article/${cnameStr}?page={page}` : '/article?page={page}',
      categoryData,
      listData,
    } 
  }


});





export default ArticlePage;
