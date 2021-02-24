
import Link from "next/link";
import React from "react";
import { getTypeUrl, getTypeClassUrl, getThumbNoPic } from "../../utils/url";

import { SearchListItem } from "../../store/search/types";

interface ListItemProps {
    list: SearchListItem[]
}
  
const ListItem: React.FC<ListItemProps> = ({ list }) => {


    return <>{list.map((item,index)=> (
        <div key={index} className="lqsblog-list">
            {item.thumb.length === 4 ? <>
                <div className="lqsblog-list-content py-lg-1">
                    <div className="lqsblog-list-body">
                        <div className="text-lg h-2x">
                            <Link href={getTypeUrl(item.type, item.id)}>
                            <a className="lqsblog-list-title">
                                {item.title}
                            </a>
                            </Link>
                        </div>
                    </div>
                    <div className="lqsblog-list-footer d-flex">
                        <div className="text-xs text-muted">
                            {item.type === 1?<>
                                <span className="d-inline-block">
                                    <Link href={getTypeClassUrl(item.type, item.category.alias)}>
                                    <a className="text-muted">{item.category.name}</a>
                                    </Link>
                                </span>
                                <i className="text-primary px-2">•</i>
                            </>:<></>}                            
                            <span className="d-inline-block">{ item.addtime }</span>
                        </div>
                        <div className="ml-auto text-xs text-muted"></div>
                    </div>
                            
                    <div className="lqsblog-list-images row row-sm mt-3">
                        {item.thumb.map((itemThumb, indexThumb)=> <div key={indexThumb} className="col-3">
                            <div className="lqsblog-media">
                                <Link href={getTypeUrl(item.type, item.id)}>
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
                                <Link href={getTypeUrl(item.type, item.id)}>
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
                                {item.type === 1?<>
                                    <span className="d-inline-block">
                                        <Link href={getTypeClassUrl(item.type, item.category.alias)}>
                                        <a className="text-muted">{item.category.name}</a>
                                        </Link>
                                    </span>
                                    <i className="text-primary px-2">•</i>
                                </>:<></>}                            
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
                                <Link href={getTypeUrl(item.type, item.id)}>
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
                                {item.type === 1?<>
                                    <span className="d-inline-block">
                                        <Link href={getTypeClassUrl(item.type, item.category.alias)}>
                                        <a className="text-muted">{item.category.name}</a>
                                        </Link>
                                    </span>
                                    <i className="text-primary px-2">•</i>
                                </>:<></>}                            
                                <span className="d-inline-block">{ item.addtime }</span>
                            </div>
                            <div className="ml-auto text-xs text-muted "></div>
                        </div>


                    </div>
                    <div className="lqsblog-list-img col-3">
                        <div className="lqsblog-media shadow">
                            <Link href={getTypeUrl(item.type, item.id)}>
                            <a className="lqsblog-media-content" style={{backgroundImage: `url(${getThumbNoPic(item.thumb[0])})`}}></a>
                            </Link>
                        </div>
                    </div>
            </>}
        </div>
    ))}</>;
}

export default ListItem;