// ==UserScript==
// @name       Code Highligher
// @namespace  http://weibo.com/gsavl
// @version    0.1
// @match      file:///*
// @noframes
// @run-at document-ready
// @copyright  2014.11.11 Cooper
// ==/UserScript==

src_jquery = 'http://cdn.staticfile.org/jquery/2.1.0/jquery.min.js';
src_hl_css = 'http://cdn.staticfile.org/highlight.js/8.0/styles/default.min.css';
src_hl_js = 'http://cdn.staticfile.org/highlight.js/8.0/highlight.min.js';

var script = document.createElement('link');
script.rel = "stylesheet";
script.href = src_hl_css;
document.head.appendChild(script);

var script = document.createElement("script");
script.type = "text/javascript";
script.src = src_jquery;
document.body.appendChild(script);

var script = document.createElement("script");
script.type = "text/javascript";
script.src = src_hl_js;
document.body.appendChild(script);

setTimeout(function() {
    $('pre').each(function(i, e) {
        hljs.highlightBlock(e);
    });
    $('pre').css('font-size', '14px');
}, 500);