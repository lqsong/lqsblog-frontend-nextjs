import Head from 'next/head';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { State } from '../store/types';
import { GlobalConfigState } from '../store/global-config/types';
import { LinksRecommendResponse } from "../store/links/types";

interface Props {
    children: React.ReactNode;
}

const Layout: React.FC<Props> = ({ children }) => {   

    const { config } =  useSelector<State, GlobalConfigState>(state => state.globalConfig);

    const activeNav = useSelector<State, String>(state=> state.globalNavActive.value);

    const linksRecommend = useSelector<State, LinksRecommendResponse>(state=> state.links.recommendData);

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script defer src="http://at.alicdn.com/t/font_1713545_ma6b7rl92c.js"></script>
                <script defer src={process.env.APP_STATIC_LIBURL + "/js/runtime.js?68141f9d"}></script>
                <script defer src={process.env.APP_STATIC_LIBURL + "/js/vendors.js?442222ef"}></script>
                <script defer src={process.env.APP_STATIC_LIBURL + "/js/common.js?7c5189c7"}></script>
                <link href={process.env.APP_STATIC_LIBURL + "/css/vendors.css?4f11438695d558f9c3de"} rel="stylesheet" />
                <link href={process.env.APP_STATIC_LIBURL + "/css/common.css?c3375d06df5ed8736eb3"} rel="stylesheet" />
            </Head>
            <header className="header">
                <div className="container">
                    <div className="row justify-content-lg-center">
                        <div className="col-12 col-lg-9">
                            <nav className="navbar navbar-expand-lg navbar-light">
                                <Link href="/">
                                <a className="navbar-brand">
                                    <img className="lqsblog-logo" src={process.env.APP_STATIC_LIBURL + "/img/logo.png?f4da0fbaa731dd013a1ebeff01d9d490"} alt="" />
                                </a>
                                </Link>
                        
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon"></span>
                                </button>
                            
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav mx-auto ">
                                        <li className={`nav-item ${activeNav === 'home' ? 'active': ''}`}>
                                        <Link href="/">
                                            <a className="nav-link">首页</a>
                                        </Link>
                                        </li>
                                        <li className={`nav-item ${activeNav === 'about' ? 'active': ''}`}>
                                        <Link href="/about">
                                            <a className="nav-link">关于</a>
                                        </Link>
                                        </li>
                                        <li className={`nav-item ${activeNav === 'article' ? 'active': ''}`}>
                                        <Link href="/article">
                                            <a className="nav-link ">随笔</a>
                                        </Link>
                                        </li>
                                        <li className={`nav-item ${activeNav === 'works' ? 'active': ''}`}>
                                        <Link href="/works">
                                            <a className="nav-link ">作品</a>
                                        </Link>
                                        </li>
                                        <li className={`nav-item ${activeNav === 'topics' ? 'active': ''}`}>
                                        <Link href="/topics">
                                            <a className="nav-link">专题</a>
                                        </Link>
                                        </li>
                                        <li className={`nav-item ${activeNav === 'links' ? 'active': ''}`}>
                                        <Link href="/links">
                                            <a className="nav-link">邻居</a>
                                        </Link>
                                        </li>
                                        <li className="nav-item">
                                            <a className="nav-link" href="http://docs.liqingsong.cc"  target="_blank">开源</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="lqsblog-search" data-toggle="modal" data-target="#searchModal">
                                    <svg className="icon" aria-hidden="true">
                                        <use xlinkHref="#lqsblog-search"></use>
                                    </svg>
                                </div>


                            </nav>
                        </div>
                    </div>
                </div>
            </header>

            <div className="modal fade" id="searchModal" tabIndex={-1} role="dialog" aria-labelledby="searchModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-body">
                        <form action="/search">
                            <div className="input-group">
                                <input id="jq-search-input" type="text" className="form-control" placeholder="请输入搜索内容" name="keywords" />
                                <div className="input-group-append">
                                <button id="jq-search-btn" className="btn btn-outline-secondary" type="submit">搜索</button>
                                <button className="btn btn-outline-secondary" type="button" data-dismiss="modal">取消</button>
                                </div>
                            </div>
                            <div id="jq-search-tips" className="text-danger text-center small"></div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
            
            {children}

            <footer className="footer pt-4 pt-lg-5">
                <div className="bg-white">
                    <div className="container">
                    <div className="row justify-content-lg-center">
                        <div className="col-12 col-lg-9">
                            {activeNav === 'home' ? 
                                <div className="lqsblog-friendlink text-xs bg-light rounded p-4 mt-4">
                                    <div className="text-md mb-2">
                                        
                                        <svg className="icon text-primary" aria-hidden="true">
                                            <use xlinkHref="#lqsblog-links"></use>
                                        </svg>
                                        友情链接
                                    </div>
                                    <div>
                                        {linksRecommend.map((item,index) => (<a key={index} className="text-muted" target="_blank" href={item.href}>{item.title}</a>))}
                                    </div>
                                </div> 
                            : <></>}
                            
                            <div className="text-xs text-muted  border-top border-light py-4 mt-4">
                                © {config.siteCreationTime} All Rights Reserved<span className="px-2">⋅</span>Developed by 
                                <a href={ config.copyrightUrl }> { config.copyrightPerson}</a><span className="px-2">⋅</span>
                                <a href="https://beian.miit.gov.cn/" rel="external nofollow" target="_blank">{ config.icp }</a>
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
            </footer>

            <div id="lqsblog-top">
                <span className="icon-stack">
                    <span className="iconfont">
                    <svg className="icon" aria-hidden="true">
                        <use xlinkHref="#lqsblog-up"></use>
                    </svg>
                    </span>
                    <span className="top-text">Top</span>
                </span>
            </div>
        </>
    )
}

export default Layout;