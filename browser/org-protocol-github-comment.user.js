// ==UserScript==
// @name           org-protocol-github-comment
// @description    Insert emacs links to commented lines in gh pull requests.
// @author         Raimon Grau
// @include        https://github.com/*/pull/*
// @include        https://github.com/*/commit/*
// @version        0.2.0
// @grant          none
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==

function createLink(fileName, lineNumber) {
  var project = document.URL.match(/github.com\/([^/]+\/[^/]+)/)[1];
  return "org-protocol://github-lines://" + project + "/" + fileName + "/" + lineNumber;
}

(function() {
    'use strict';
    var forEach = Array.prototype.forEach;
    var comments=document.querySelectorAll(".js-inline-comments-container");


    comments.forEach(function(f) {
        var file=f.previousElementSibling.previousElementSibling.firstElementChild.title;
        var a = f.previousElementSibling.querySelectorAll("td.js-linkable-line-number");
        var line = a[a.length-1].getAttribute("data-line-number");


        var buttonera = f.querySelector("form.js-resolvable-timeline-thread-form");
        var bu=document.createElement("button");
        bu.setAttribute("class", "btn m-3");
        bu.textContent = "Open in editorrr";
        bu.setAttribute("href", createLink(file, line));
        buttonera.appendChild(bu);
        console.log(file , line);

    });


    // Your code here...
})();
