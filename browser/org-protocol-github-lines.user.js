// ==UserScript==
// @name           org-protocol-github-lines
// @description    Insert emacs links to commented lines in gh pull requests.
// @author         Raimon Grau Cuscó <raimonster@gmail.com>
// @include        https://github.com/*/pull/*
// @version        0.1
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==


$(window).load( function() {
var a = $(".inline-comments").prev().find("td.line_numbers");
$.each(a, function(i, e) {
 $(this).append("<a href='org-protocol:\/\/github-comment:/" +
 $(this).closest('.data').prev().data('path') + '/' + e.innerText +
 "'>emacs!</a>"   )  });
});


// //$(function(){
// $(document).ready(function() {
// var a = $(".inline-comments").prev().find("td.line_numbers");
// $.each(a, function(i, e) {
//  $(this).append("<a href='org-protocol:\/\/github-comment:/" +
//  $(this).closest('.data').prev().data('path') + '/' + e.innerText +
//  "'>emacs!</a>"   )  });
// });