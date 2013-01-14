// ==UserScript==
// @name           org-protocol-github-lines
// @description    Insert emacs links to commented lines in gh pull requests.
// @author         Rüdiger Sonderfeld <ruediger@c-plusplus.de>
// @include        https://github.com/*/pull/*
// @include        https://github.com/*/commit/*
// @version        0.2.0
// @grant          none
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==

var forEach = Array.prototype.forEach;

function createLink(fileName, lineNumber) {
  var project = document.URL.match(/github.com\/([^/]+\/[^/]+)/)[1];
  return "org-protocol://github-comment://" + project + "/" + fileName + "/" + lineNumber;
}

var timeout = 1000 /* ms */,
    maxCallCounter = 5;

var callCounter = 0;

function main() {
  ++callCounter;

  var x = document.querySelector(".file tr.inline-comments");
  if(x) {
    var files = document.querySelectorAll(".file");

    forEach.call(files, function(file) {
      var meta = file.querySelector(".meta");
      var fileName = meta.dataset.path;
      var inline_comments = file.querySelectorAll("tr.inline-comments");
      forEach.call(inline_comments, function(comment) {
        var line = comment.previousElementSibling;
        var line_numbers = line.querySelectorAll("td.line_numbers");
        var lineNumber;
        forEach.call(line_numbers, function(ln) {
          var txt = ln.textContent.trim();
          if(txt.length > 0) {
            lineNumber = txt;
          }
        });
        if (lineNumber) {
          var form = comment.querySelector("div.show-inline-comment-form");
          var button = document.createElement("a");
          button.setAttribute("class", "minibutton");
          button.setAttribute("href", createLink(fileName, lineNumber));
          button.textContent = "Open with Emacs";
          form.appendChild(button);
        }
      });
    });

  }
  else if(callCounter < maxCallCounter) {
    console.log("#" + callCounter + " No comment found.  Waiting for AJAX to finish.");
    window.setTimeout(main, timeout);
  }
  else {
    console.log("Giving up waiting for comments to load.  Probably no inline comments.");
  }
}

main();
