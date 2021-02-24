import { NextPage } from 'next';
import Head from 'next/head'
import { globalEndSagaTaskToPromise, wrapper } from '../../store';
import globalNavActive from '../../store/global-navactive/slice';
import { getTagContentListApi, getTagDetailApi } from '../../store/tag/server';
import { TagContentListResponse } from '../../store/tag/types';

import ListItem from "../../components/ListItem";
import Pagination from "../../components/Pagination";

interface TagPageProps {
  page: number;
  tagName: string;
  listData: TagContentListResponse;
  pageUrl: string;
}

const TagPage: NextPage<TagPageProps> = ({ page, tagName, listData, pageUrl }) => {




  return (   
      <>
        <Head>
          <title>{tagName} - 标签 - {process.env.APP_SITE_NAME}</title>
          <script defer src={process.env.APP_STATIC_LIBURL + "/js/tag.js?9e2038fe"}></script>
        </Head>


        <div className="lqsblog-list-header bg-light py-4 py-lg-5">
          <div className="container">
            <div className="row justify-content-lg-center">
                <div className="col-12 col-lg-9">
                    <h1 className="h3">
                        <span>标签：</span><span className="lqsblog-list-h-title">{tagName}</span>
                    </h1>
                </div>
            </div>
          </div>
        </div>


        <div className="container pt-4 pt-lg-5">
          <div className="row justify-content-lg-center">
              <div className="col-12 col-lg-9">


                 
                <ListItem list={listData.list} />
                  
                <Pagination total={listData.total} currentPage={page} pageUrl={pageUrl} />

                  
              </div>
          </div>
        </div>
    





      </>
  )
}



export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query, params, res }) => {

  const { page  = 1 } = query;
  const { name = '' } = params;
  const pageNum: number = parseInt(page as string);
  const nameStr: string = name.toString();

  store.dispatch(globalNavActive.actions.success(''));
  await globalEndSagaTaskToPromise(store);

  let listData: TagContentListResponse = {
    list: [],
    total: 0,
    currentPage: 1
  };

  try {  
    await getTagDetailApi(nameStr);// 获取标签验证是否存在

    listData = await getTagContentListApi(10, pageNum, nameStr) as unknown as TagContentListResponse;

  } catch (e) {
    res.writeHead(301, {Location: `/404`});
    res.end();
    console.error('...error...', e);
  }

  return { 
    props: { 
      page: pageNum,
      tagName: nameStr,
      pageUrl: `/tag/${nameStr}?page={page}`,
      listData,
    } 
  }


});




export default TagPage;
