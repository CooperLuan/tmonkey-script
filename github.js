// ==UserScript==
// @name       Github Wiki Width Adjust
// @version    0.1
// @match      https://github.com/*
// @copyright  2014 CooperLuan
// @run-at document-end
// ==/UserScript==

$('.header .container').css('width', '90%');
$('.pagehead .container').css('width', '90%');
$($('.site .container')[1]).css('width', '90%');

function adjust_main() {
    if ($('.repository-with-sidebar').hasClass('with-full-navigation') === true) {
        $('#js-repo-pjax-container').css('width', '89%');
    } else {
        $('#js-repo-pjax-container').css('width', '97%');
    }
};
adjust_main();

$( document ).ajaxComplete(function() {
    adjust_main();
});