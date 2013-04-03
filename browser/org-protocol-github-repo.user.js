// ==UserScript==
// @name           org-protocol-github-files
// @description    Insert Emacs links for files on github
// @author         Raimon Grau Cusco <raimonster@gmail.com>
// @include        https://github.com/*
// @version        0.1.0
// @grant          none
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==

var forEach = Array.prototype.forEach;

/*
 * Structure is
 * <tr><td><span class="mini-icon-text-file" /></td><td class="content"><a href="..."></a></td></tr>
 */


var url = document.URL;
var repo = url.replace(/https?:\/\/github\.com\//, "");
var repo = url.replace(/[^/]*\/[^/]*/, "");
var textFiles = document.querySelectorAll(".js-current-repository");
$(textFiles[0].parentNode).after('<strong style="float: right;"> <a href="org-protocol://github-clone/' + repo +'">clone!</a></strong>');

});
