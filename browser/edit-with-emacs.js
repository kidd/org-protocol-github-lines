// ==UserScript==
// @name         New Userscript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://github.com/*/*/pull/*
// @grant        none
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
        var a = f.previousElementSibling.querySelectorAll("td.blob-num");
        var line = a[a.length-1].getAttribute("data-line-number");


        //var buttonera = f.querySelector("form.js-resolvable-timeline-thread-form");
        // var buttonera = f.querySelector("div.js-line-comments");
        var buttonera = f;

        var bu=document.createElement("a");
        bu.setAttribute("class", "btn m-3");
//        bu.setAttribute("style", "float: left;");
        bu.textContent = "Open in Emacs";
        bu.setAttribute("href", createLink(file, line));
        buttonera.appendChild(bu);


        var form= f.querySelector("form.js-resolvable-timeline-thread-form")
        form.setAttribute("style", "float: left;");
        console.log(file , line);

    });


    // Your code here...
})();
