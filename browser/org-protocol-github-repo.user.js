// ==UserScript==
// @name           org-protocol-github-repo
// @description    Insert Emacs links for files on github
// @author         Raimon Grau Cusco <raimonster@gmail.com>
// @include        https://github.com/*
// @version        0.1.0
// @grant          none
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==


var insertAfter = function(e,i){
     if(e.nextSibling){
         e.parentNode.insertBefore(i,e.nextSibling);
     } else {
         e.parentNode.appendChild(i);
     }
};

var url = document.URL;
var project = document.URL.match(/github.com\/([^/]+\/[^/]+)/)[1];
var repoTitle = document.querySelectorAll(".js-current-repository");

var mydiv = document.createElement("strong");
mydiv.style.cssText = "float: right;";
var cloneLink = document.createElement("a");

cloneLink.appendChild(document.createTextNode("Clone"));

cloneLink.href = "org-protocol://github-clone://" + project;
mydiv.appendChild(cloneLink);
var title = repoTitle[0].parentNode;
insertAfter(title, mydiv);
