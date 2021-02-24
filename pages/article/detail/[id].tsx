import React, { useEffect, useRef } from 'react';
import { NextPage } from 'next';
import Head from 'next/head'
import Link from 'next/link';
import globalNavActive from '../../../store/global-navactive/slice';
import { globalEndSagaTaskToPromise, wrapper } from '../../../store';
import { getArticleDetailApi, getArticleInterestApi } from '../../../store/article/server';

import { isPageId } from "../../../utils/validate";
import { ArticleDetailResponse, ArticleInterestResponse } from '../../../store/article/types';


import ListItemArticle from '../../../components/ListItem/article';


interface ArticleDetailProps {
  detailData: ArticleDetailResponse;
  interestData: ArticleInterestResponse;
}

const ArticleDetail: NextPage<ArticleDetailProps> =  ({ detailData, interestData }) =>  {


  const viewerDiv = useRef<HTMLDivElement>(null);

  useEffect(()=> {
    if(viewerDiv.current.children.length < 1 && window.$ && window.$('#viewer').toastuiEditor && detailData.content !== '') {
      window.$('#viewer').toastuiEditor({initialValue: detailData.content});
    }
  },[detailData.content])


  return (   
      <>
        <Head>
          <title>{detailData.title} - 文章详情 - {process.env.APP_SITE_NAME}</title>
          <meta  name="keywords" content={detailData.keywords} />
          <meta  name="description" content={detailData.description} />
          <script defer src={process.env.APP_STATIC_LIBURL + "/js/article_detail.js?020cf886"}></script>
        </Head>

        <header className="header">
          <div className="container">
            <div className="row justify-content-lg-center">
                <div className="col-12 col-lg-9">

                  <ol className="breadcrumb lqsblog-breadcrumb">
                    <li className="breadcrumb-item">
                      <Link href="/"><a className="text-muted">首页</a></Link>
                    </li>
                    <li className="breadcrumb-item">
                      <Link href="/article"><a className="text-muted">随笔</a></Link>
                    </li>
                    <li className="breadcrumb-item">{detailData.title}</li>
                  </ol>

                </div>
            </div>
          </div>
        </header>


        <div className="container pt-4 pt-lg-5">
        <div className="row justify-content-lg-center">
            <div className="col-12 col-lg-9 py-4 py-lg-5">
      
                <section className="py-4 ">
                    <h1 className="h3 font-weight-bold">{detailData.title}</h1>
                    <div className="text-sm text-muted mt-4">
                        <span className="d-inline-block">
                        <Link href={`/article/${detailData.category.alias}`}><a className=" text-muted">{detailData.category.name}</a></Link>
                        </span>
                        <i className="text-primary px-2">•</i>
                        <span className="d-inline-block pr-3">{ detailData.addtime }</span>
                        <i className="text-primary px-2">•</i>
                        <span className="d-inline-block pr-3">阅读 {detailData.hit} 次</span>
                    </div>
                </section>
                    
              <div id="viewer" ref={viewerDiv}></div>
              <div id="viewerText" style={{display: 'none'}}>{detailData.content}</div>




                <div className="lqsblog-detail-body">
                    <div className="lqsblog-tag mt-4">
                      {detailData.tag.map((item,index)=> <Link key={index} href={`/tag/${item}`}><a rel="tag">{item}</a></Link>)}
                    </div>    
                </div>





              
                
            </div>
        </div>
      </div>


    {interestData.length > 0 ? <div className="container pt-4 pt-lg-5">
      <div className="row justify-content-lg-center">
          <div className="col-12 col-lg-9">



              <div className="h5 mb-4">
                  <span className="text-xl text-primary iconfont icon-pricetags-outline pr-2">
                  <svg className="icon" aria-hidden="true">
                      <use xlinkHref="#lqsblog-tag"></use>
                  </svg>
                  </span>您可能感兴趣的
              </div>

              <ListItemArticle list={interestData} />             

              
          </div>
      </div>
    </div> : <></>}
    





      </>
  )
}



export const getServerSideProps = wrapper.getServerSideProps(async ({ res, store, params }) => {

  const { id = 0 } = params;
  const idNum: number = parseInt(id as string);

  if(!isPageId(idNum)){
    res.writeHead(301, {Location: `/404`});
    res.end();
  }  

  store.dispatch(globalNavActive.actions.success('article'));
  await globalEndSagaTaskToPromise(store);


  let detailData:ArticleDetailResponse = {
    title: '',
    keywords:'',
    description:'',
    addtime:'',
    hit:'',
    category: {
      id: 0,
      name: '',
      alias: ''
    },
    tag: [],
    content:'',
    interestIds:''
  };  
  let interestData: ArticleInterestResponse = [];

  try {
    detailData = await getArticleDetailApi(idNum) as unknown as ArticleDetailResponse;
    interestData = await getArticleInterestApi(detailData.interestIds) as unknown as ArticleInterestResponse;
  } catch (e) {
    console.error('...error...', e);
  }

  return { 
    props: {
      detailData,
      interestData
    } 
  }


});



export default ArticleDetail;
