import { NextPage } from "next";
import Head from "next/head";
import React, { useEffect } from "react";
import { useStore } from "react-redux";
import { globalEndSagaTaskToPromise } from "../store";

interface ErrorProps {
    statusCode: Number;
}

const Error : NextPage<ErrorProps> = ({ statusCode }) => {

    const store = useStore();

    useEffect(()=> {
        globalEndSagaTaskToPromise(store);  
    },[])


    return (
        <>
            <Head>
                <title>
                {statusCode === 404 ? `404 - Not Found` : statusCode ? `An error ${statusCode} occurred on server`: 'An error occurred on client'}
                </title>
                <script defer src={process.env.APP_STATIC_LIBURL + "/js/index.js?8d45177c"}></script>
            </Head>
            <div className="container pt-4 pt-lg-5">
                <div className="row justify-content-lg-center">
                    <div className="col-12 col-lg-9">
                        <div className="pb-4 pb-md-5">
                            <div className="container">
                                <div className="row justify-content-lg-center py-5">
                                    <div className="col-12 col-lg-9">
                                        <div className="lqsblog-no-data">
                                            <p><img src={process.env.APP_STATIC_LIBURL + "/img/nodata.gif?c361fbc23bd8ab1f6e1abe0319b459e9"} alt="" /></p>
                                            {statusCode === 404
                                            ? <>
                                                <h1>404</h1>
                                                <p>抱歉，没有你要找的内容...</p>
                                            </>
                                            : <>
                                                <h1>{ statusCode || 500 }</h1>
                                                <p>应用发生错误异常...</p>
                                            </>}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
    
}
  
Error.getInitialProps = async ({ res, err }) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode }
}


  
export default Error