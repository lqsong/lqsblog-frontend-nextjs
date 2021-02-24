# lqsblog-frontend-nextjs


 它（[Github](https://github.com/lqsong/lqsblog-frontend-nextjs) 、 [Gitee](https://gitee.com/lqsong/lqsblog-frontend-nextjs)）是一个PC端、WAP端自适应展示的一个前端网站前台，它基于  [nextjs](https://github.com/vercel/next.js)实现。

## 开发文档

- [DEMO](http://liqingsong.cc/)

- [lqsBlog官方文档](http://docs.liqingsong.cc/)。


## 功能

```
- 首页
  -- 最新推荐
  -- 随笔作品列表
  -- 友情链接
- 关于
- 随笔
- 作品
- 专题
- 邻居

```


## 界面展示

![index](https://gitee.com/lqsong/lqsblog/raw/master/images/lqsblog-frontend-nuxt/index.png) 


## 目录结构

本项目基于nextjs生成，下面是整个项目的目录结构。大部分主体目录结构说明请参照[nextjs文档](https://www.nextjs.cn/docs/getting-started)

```bash
├── @types                     # ts类型定义目录
├── components                 # 组件目录
├── layouts                    # 布局目录
├── pages                      # 页面目录
│   ├── article                # 随笔目录
│   │   ├── detail             # 随笔详情
│   │   └── [cname].tsx        # 随笔（分类）列表
│   ├── search                 # 搜索列表目录
│   ├── tag                    # 标签下内容列表目录
│   ├── topics                 # 专题目录
│   │   ├── detail             # 专题详情
│   │   └── index.tsx          # 专题列表
│   ├── works                  # 作品目录
│   │   ├── detail             # 作品详情
│   │   └── index.tsx          # 作品列表
│   ├── about.tsx              # 关于我
│   ├── index.tsx              # 首页
│   └── links.tsx              # 邻居
├── public                     # 静态文件目录
├── server                     # 服务器配置目录
├── store                      # Store 目录
├── utils                      # 工具包
├── .env.xxx                   # 环境变量配置
├── next.config.js             # nuxt.config.js 文件
└── package.json               # package.json
```


## Build Setup

```bash
# install dependencies
$ yarn # or npm install

# serve with hot reload at 127.0.0.1:3000
$ yarn dev # or npm run dev

# build for production and launch server
$ yarn build # or npm run build
$ yarn start # ro npm run start
```

## 配置 nginx 反向代理

```bash
http {
    # 内部添加以下内容
    server {
        # 监听 80 端口 ，你也可以设置其他端口但是访问域名时需要加上端口访问
        listen       80;
        # 你的网址，如果是本地测试，也可以设置你本地的ip
        server_name  liqingsong.cc;
        location / {
            # 代理地址，你本地 nuxt 的访问地址
		    proxy_pass  http://127.0.0.1:3000;
            index  index.html index.htm;
            
        }  
    }
}
```

## 捐赠

如果你觉得这个项目帮助到了你，你可以请作者喝咖啡表示鼓励.

**ALIPAY**             |  **WECHAT**
:-------------------------:|:-------------------------:
![Alipay](https://gitee.com/lqsong/public/raw/master/common/Alipay.png)  |  ![Wechat](https://gitee.com/lqsong/public/raw/master/common/Wechat.png)
