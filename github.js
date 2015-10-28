// ==UserScript==
// @name       Github Wiki Width Adjust
// @version    0.1
// @match      https://github.com/*
// @copyright  2014 CooperLuan
// @run-at document-end
// ==/UserScript==

$('.header .container').css('width', '90%');
$('.pagehead .container').css('width', '90%');
$($('.main-content .container')[1]).css('width', '90%');
$("#js-pjax-container .container").css('width', '90%');

function adjust_main() {
    if ($('.repository-with-sidebar').hasClass('with-full-navigation') === true) {
        $('#js-repo-pjax-container').css('width', '89%');
    } else {
        $('#js-repo-pjax-container').css('width', '97%');
    }
    $('.discussion-timeline').css('width', '89%');
    $('.timeline-new-comment').css('max-width', '100%');
};
adjust_main();

$( document ).ajaxComplete(function() {
    adjust_main();
});
