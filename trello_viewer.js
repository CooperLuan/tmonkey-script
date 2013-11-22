// ==UserScript==
// @name       Better Viewer for Trello
// @namespace  http://weibo.com/gsavl
// @version    0.1.2
// @description  better trello userage
// @match      https://trello.com/*
// @noframes
// @require mixpanel-2.2.min.js
// @require quant.js
// @require all.js
// @run-at document-end
// @copyright  2013.11.21 Cooper
// ==/UserScript==
// 1. update width of card to 300px
// 2. update width of card popout window to 75%(default) of window width
// 3. update width of card popout left column
// 4. update height of active comment input control to 200px
// 5. update heidht of active editable input control to 200px

// percentage width of card popout
var pet = 0.75;
var tw = window.screen.width;
var w_width = tw * pet;
var w_left = tw * (1 - pet) / 2;
var w_main_width = tw * pet - 250;

setInterval(function() {
    /*jshint multistr: true */
    if ($('#css-tm').length === 0 && location.pathname !== '/') {
        var css_script = $('<style/>', {
            'type': 'text/css',
            'id': 'css-tm',
            'html': 'div.list{width: 300px !important;}\
            .list-area{width: 3500px !important;}\
            .window{width: ' + w_width + 'px!important;left: ' + w_left + 'px!important;}\
            .window-main-col{width: ' + w_main_width + 'px!important;}\
            .new-comment.focus .new-comment-input{    height: 200px !important;}\
            .phenom.editing textarea{height: 200px !important;}'
        });
        $('head').append(css_script);
    }
}, 1000);

/*
 * 2013-11-21 10:03:00  the updated css will not effect trello index page
 */