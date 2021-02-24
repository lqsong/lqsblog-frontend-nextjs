import { NextPage } from 'next';
import Head from 'next/head'
import { globalEndSagaTaskToPromise, wrapper } from '../../../store';
import globalNavActive from '../../../store/global-navactive/slice';
import { getTopicsDetailApi } from '../../../store/topics/server';
import { TopicsDetailResponse, TopicsDetailThumbStr } from '../../../store/topics/types';

import ListItem from "../../../components/ListItem";

interface TopicsDetailProps {
  detailData: TopicsDetailResponse
}

const TopicsDetail: NextPage<TopicsDetailProps> = ({ detailData }) =>  {


  return (   
      <>
        <Head>
          <title>{detailData.title} - 专题 - {process.env.APP_SITE_NAME}</title>
          <meta  name="keywords" content={detailData.keywords} />
          <meta  name="description" content={detailData.description} />
          <script defer src={process.env.APP_STATIC_LIBURL + "/js/topics_detail.js?30268173"}></script>
        </Head>



        <div className="lqsblog-list-header bg-light py-4 py-lg-5">
          <div className="container">
            <div className="row justify-content-lg-center">
                <div className="col-12 col-lg-9">
                    <h1 className="h3">
                        <span className="lqsblog-list-h-title">{detailData.title}</span>
                    </h1>
                </div>
            </div>
          </div>
        </div>


        <div className="container pt-4 pt-lg-5">
          <div className="row justify-content-lg-center">
              <div className="col-12 col-lg-9">


                <ListItem list={detailData.list} />

                  
              </div>
          </div>
        </div>
    




   
      </>
  )
}



export const getServerSideProps = wrapper.getServerSideProps(async ({ store, query }) => {

  const { cname  = '' } = query;
  const cnameStr: string =  cname.toString();

  store.dispatch(globalNavActive.actions.success('topics'));
  await globalEndSagaTaskToPromise(store);
  
  let detailData: TopicsDetailResponse = {
    id: 0,
    title: '',
    keywords: '',
    description: '',
    addtime: '',
    hit: 0,
    list: []
  }

 
  try {

    const {list , ...other} = await getTopicsDetailApi(cnameStr) as unknown as TopicsDetailThumbStr;
    const iList = [];
    for(let i = 0,len= list.length; i < len; i++) {
      const { thumb, ...listOther} = list[i];
      iList.push({
        ...listOther,
        thumb: thumb.split('|')
      })
    }    
    detailData = {
      ...other,
      list: iList
    }
  } catch (e) {
    console.error('...error...', e);
  }

  return { 
    props: { 
      detailData
    } 
  }


});



export default TopicsDetail;
