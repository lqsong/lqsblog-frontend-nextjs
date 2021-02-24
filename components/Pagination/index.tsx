
import Link from "next/link";
import React, { useMemo } from "react";
import pagination from "../../utils/pagination";

interface PaginationModuleProps {
    total: Number; // 总数
    currentPage: Number; // 当前页码
    pageUrl: string; // url
    pageSize?: Number; // 每页多少条数据
    rollPage?: Number; // 分页栏显示几个页码 - 请填写大于2的奇数
}
  
const PaginationModule: React.FC<PaginationModuleProps> = props => {

    const { total, currentPage, pageUrl, pageSize = 10, rollPage = 5 } = props;

    const getPageUrl = (pageVal: Number | string): string => {
        return pageUrl.replace('{page}', pageVal as string);
    }


    const { pages, prePage, nextPage, isPrePage, isNextPage } = useMemo(() => {
        const page =  new pagination(total, currentPage, pageSize, rollPage);
        return {
            pages: page.getPages(),
            prePage: page.prePage,
            nextPage: page.nextPage,
            isPrePage: page.isPrePage,
            isNextPage: page.isNextPage
        }
    }, [currentPage, total, pageSize, rollPage]);

   


    return isPrePage|| isNextPage ? (
        <div className="row">
            <div className="col-8">
                <ul className="pagination lqsblog-pagination">
                    {pages.map((item,index) => (<li key={index} className={`page-item ${currentPage === item ? 'active': ''}`}>
                        {currentPage !== item ? <Link href={getPageUrl(item)}><a className="page-link">{item}</a></Link>:<span className="page-link">{item}</span>}
                    </li>))}                                     
                </ul>
            </div>
            <div className="col-4">
                <ul className="pagination lqsblog-pagination justify-content-end">
                    {isPrePage?<li className="page-item">
                        <Link href={getPageUrl(prePage)}><a className="page-link page-pre-next" tabIndex={-1}>&lt;</a></Link>
                    </li>:<></>}
                    {isNextPage?<li className="page-item">
                        <Link href={getPageUrl(nextPage)}><a className="page-link page-pre-next">&gt;</a></Link>
                    </li>:<></>}                    
                </ul>
            </div>
        </div>
    ) : <></>;
}

export default PaginationModule;