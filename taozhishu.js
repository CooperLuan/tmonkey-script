// ==UserScript==
// @name       ZhishuBot2
// @namespace  ZhishuBot2
// @version    0.1.1
// @description  help
// @include http://shu.taobao.com/*
// @copyright  2013 Cooper
// @run-at document-end
// ==/UserScript==

if ($('#q').val() === '') {
    fetch_keyword();
} else {
    if (window.location.pathname == "/trendindex") {
        // 市场趋势
        // get_data('query');
        // get_data('trade');
        // get_data('query,trade');
        var data = $('div#nav').next()[0].innerText;
        data = $.parseJSON(data.substring(data.indexOf('{'), data.indexOf(')')));
        console.log(data);
        console.log(JSON.stringify(data));
        post_data(data);
        var types = data.types.join(',');
        // types = 'holder';
        if (types == 'query') {
            $('div#trend .select_box a.tab')[1].click();
            setInterval(function() {
                location.reload();
            }, 3000);
        } else if (types == 'trade') {
            $('div#trend .select_box a.tab')[0].click();
            setInterval(function() {
                fetch_keyword();
            }, 2000);
        } else if (types == 'query,trade') {
            // 取消对第三个标签的处理
            $('div#trend .select_box a.tab')[0].click();
            setInterval(function() {
                fetch_keyword();
            }, 2000);
        }
    } else if (window.location.pathname == "/search") {
        // 市场细分
        var data = $('footer').prev()[0].innerText;
        console.log(data);
    }
}
/*
 * 将数据 POST 到 Py 服务端
 * {
 *   data: {} # 数据
 *   type: query/trade/query,trade # 三种，分别代表搜索指数/成交指数/搜索与成交指数
 * }
 */
function post_data(data) {
    $.ajax({
        type: 'POST',
        url: 'http://localhost:8866',
        crossDomain: true,
        data: {
            'data': JSON.stringify(data),
            'type': data.types.join(',')
        },
        dataType: 'json',
        success: function(result, textStatus, jqXHR) {
            console.log(result);
        }
    });
}

/*
 * 从服务器获取需要抓包的关键词并填充
 */
function fetch_keyword() {
    $.ajax({
        type: 'GET',
        url: 'http://localhost:8866',
        crossDomain: true,
        dataType: 'json',
        success: function(result, textStatus, jqXHR) {
            keyword = result.keyword;
            if ($('#q').val() !== '' && keyword === null) {
                return;
            }
            $('#q').val(keyword);
            $('#query-btn').click();
        }
    });
}