
/**
 * 创建script加载
 * scriptUrls string[] ['xxxx.js', 'xxxx.js']
 * remove boolean 存在是否先删除加载 defalut: false *
 */
export default function createScriptUrlElements(scriptUrls: string[], remove: boolean= false, index= 0) {

    const currentScriptUrl = scriptUrls[index];

    if(remove === true) {
        const element = document.getElementById(currentScriptUrl);
        element?.parentNode?.removeChild(element);
    }

    if(typeof currentScriptUrl === 'string' && currentScriptUrl.length  && !document.getElementById(currentScriptUrl)) {
        const script = document.createElement('script');
        script.setAttribute('id', currentScriptUrl);
        script.setAttribute('src', currentScriptUrl);
        script.setAttribute('data-namespace', currentScriptUrl);

        if (scriptUrls.length > index + 1) {
            script.onload = function () {
                createScriptUrlElements(scriptUrls, remove, index + 1);
            };

            script.onerror = function () {
                createScriptUrlElements(scriptUrls, remove,  index + 1);
            };
        }        
        document.body.appendChild(script);
    } else {
        if (scriptUrls.length > index + 1) {
            createScriptUrlElements(scriptUrls, remove, index + 1);
        }
    }
}