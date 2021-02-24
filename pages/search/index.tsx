import { NextPage } from 'next';
import Head from 'next/head'
import { globalEndSagaTaskToPromise, wrapper } from '../../store';
import globalNavActive from '../../store/global-navactive/slice';
import { getSearchListApi } from '../../store/search/server';
import { SearchListResponse } from '../../store/search/types';

import ListItem from "../../components/ListItem";
import Pagination from "../../components/Pagination";


interface SearchPageProps {
  page: number;
  pageUrl: string;
  listData: SearchListResponse;
  keywords: string;
}


const SearchPage: NextPage<SearchPageProps> = ({ page, pageUrl, listData, keywords }) =>  {

  


  return (   
      <>
        <Head>
          <title>{keywords} - 搜索 - {process.env.APP_SITE_NAME}</title>
          <script defer src={process.env.APP_STATIC_LIBURL + "/js/search.js?dfa22bea"}></script>
        </Head>


        <div className="lqsblog-list-header bg-light py-4 py-lg-5">
          <div className="container">
            <div className="row justify-content-lg-center">
                <div className="col-12 col-lg-9">
                    <h1 className="h3">
                        <span>搜索：</span><span className="lqsblog-list-h-title">{keywords}</span>
                    </h1>
                </div>
            </div>
          </div>
        </div>


        <div className="container pt-4 pt-lg-5">
          <div className="row justify-content-lg-center">
              <div className="col-12 col-lg-9">

                {listData.list.length > 0 ? <>
                  <ListItem list={listData.list} />
                  <Pagination total={listData.total} currentPage={page} pageUrl={pageUrl} />
                </> : <div className="pb-4 pb-md-5">
                    <div className="container">
                      <div className="row justify-content-lg-center py-5">
                          <div className="col-12 col-lg-9">
                            <div className="lqsblog-no-data">
                                    <p><img src={process.env.APP_STATIC_LIBURL + "/img/nodata.gif?c361fbc23bd8ab1f6e1abe0319b459e9"} alt="" /></p>
                                    <h2>Oh, what a shame!</h2>
                                    <p>抱歉，没有你要找的内容...</p>
                            </div>
                          </div>
                      </div>
                    </div>
                </div>}        
                  
              </div>
          </div>
        </div>
    

     
      </>
  )
}



export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query, res }) => {

  const { page  = 1, keywords = '' } = query;

  const pageNum: number = parseInt(page as string);
  const keywordsStr: string = keywords.toString();

  if(keywordsStr === ''){
    res.writeHead(301, {Location: `/404`});
    res.end();
  } 


  store.dispatch(globalNavActive.actions.success(''));
  await globalEndSagaTaskToPromise(store);
  
  
  let listData: SearchListResponse = {
    list: [],
    total: 0,
    currentPage: 1
  }
 
  try {
    listData = await getSearchListApi(10, pageNum, keywordsStr) as unknown as SearchListResponse;
  } catch (e) {
    console.error('...error...', e);
  }

  return { 
    props: { 
      page: pageNum,
      pageUrl: `/search?keywords=${keywordsStr}&page={page}`,
      keywords: keywordsStr,
      listData
    } 
  }


});




export default SearchPage;
