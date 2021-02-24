
import Link from "next/link";
import React from "react";
import { getThumbNoPic } from "../../utils/url";

import { WorksListItem } from "../../store/works/types";

interface ListItemWorksProps {
    list: WorksListItem[]
}
  
const ListItemWorks: React.FC<ListItemWorksProps> = ({ list }) => {


    return <>{list.map((item,index)=> (
        <div key={index} className="lqsblog-list">
            {item.thumb.length === 4 ? <>
                <div className="lqsblog-list-content py-lg-1">
                    <div className="lqsblog-list-body">
                        <div className="text-lg h-2x">
                            <Link href={`/works/detail/${item.id}`}>
                            <a className="lqsblog-list-title">
                                {item.title}
                            </a>
                            </Link>
                        </div>
                    </div>
                    <div className="lqsblog-list-footer d-flex">
                        <div className="text-xs text-muted">                            
                            <span className="d-inline-block">{ item.addtime }</span>
                        </div>
                        <div className="ml-auto text-xs text-muted"></div>
                    </div>
                            
                    <div className="lqsblog-list-images row row-sm mt-3">
                        {item.thumb.map((itemThumb, indexThumb)=> <div key={indexThumb} className="col-3">
                            <div className="lqsblog-media">
                                <Link href={`/works/detail/${item.id}`}>
                                <a className="lqsblog-media-content" style={{backgroundImage: `url(${getThumbNoPic(itemThumb)})`}}></a>
                                </Link>
                            </div>
                        </div>)}                        
                    </div>
                </div>
            </> 
            : item.thumb.length < 1 ? <>
                    <div className="lqsblog-list-content py-lg-2">
                        <div className="lqsblog-list-body">
                            <div className="text-lg h-2x">
                                <Link href={`/works/detail/${item.id}`}>
                                <a className="lqsblog-list-title">
                                {item.title}
                                </a>
                                </Link>
                            </div>
                            <div className="d-none d-md-block text-sm text-muted mt-3">
                            <div className="h-3x">{item.description}</div>
                            </div>
                        </div>
                        <div className="lqsblog-list-footer d-flex">
                            <div className="text-xs text-muted">                                
                                <span className="d-inline-block">{ item.addtime }</span>
                            </div>
                            <div className="ml-auto text-xs text-muted "></div>
                        </div>
                    </div>
            </> 
            : <>
                    <div className="lqsblog-list-content py-lg-2">

                        <div className="lqsblog-list-body">
                            <div className="text-lg h-2x">
                                <Link href={`/works/detail/${item.id}`}>
                                <a className="lqsblog-list-title">
                                {item.title}
                                </a>
                                </Link>
                            </div>
                            <div className="d-none d-md-block text-sm text-muted mt-3">
                            <div className="h-3x">{item.description}</div>
                            </div>
                        </div>

                        <div className="lqsblog-list-footer d-flex">
                            <div className="text-xs text-muted">                                
                                <span className="d-inline-block">{ item.addtime }</span>
                            </div>
                            <div className="ml-auto text-xs text-muted "></div>
                        </div>


                    </div>
                    <div className="lqsblog-list-img col-3">
                        <div className="lqsblog-media shadow">
                            <Link href={`/works/detail/${item.id}`}>
                            <a className="lqsblog-media-content" style={{backgroundImage: `url(${getThumbNoPic(item.thumb[0])})`}}></a>
                            </Link>
                        </div>
                    </div>
            </>}
        </div>
    ))}</>;
}

export default ListItemWorks;