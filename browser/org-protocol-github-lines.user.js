// ==UserScript==
// @name           org-protocol-github-lines
// @description    Insert emacs links to commented lines in gh pull requests.
// @author         Raimon Grau Cuscó <raimonster@gmail.com>
// @include        https://github.com/*/pull/*
// @include        https://github.com/*/commit/*
// @version        0.1.1
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==

console.log("Userscript started");


function addJQuery(callback) {
    // http://erikvold.com/blog/index.cfm/2010/6/14/using-jquery-with-a-user-script
    var script = document.createElement("script");
    script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1.8.0/jquery.min.js");
    script.addEventListener('load', function() {
        var script = document.createElement("script");
        script.textContent = "(" + callback.toString() + ")();";
        document.body.appendChild(script);
    }, false);
    document.body.appendChild(script);
    console.log("JQuery loaded");
}


function main() {

    console.log("Running");
    if ($("tr.inline-comments").length > 0) {
        console.log("org-protocol: Ajax loaded, adding Emacs links");
        var build_link = function (fname, lnumber) {
            // create the org-protocol url
            console.log("org-protocol: Generating link for " + fname + "#" + lnumber);
            return "org-protocol://github-comment://" + fname + "/" + lnumber;
        }

        var strip = function (s) {
            // remove white space from s
            return s.replace(/^\s+|\s+$/g, '');
        }

        var comments = $("div.inline-review-comment");

        $.each(comments,
            function(i, e) {
                // add a link for emacs to each diff comment
                console.log("Adding button");
                var fnameNode = $(this).find(".data").prev();
		// $(".inline-comments").first().prev().find("td.line_numbers").each
                var filename = fnameNode.data("path");
                var lnumber = strip($(this).find("td.gi:first").prev().text());
		// lnumber = $(this).find("td.gi:first").prev();

                $(this).find("div.show-inline-comment-form").append("<a class='minibutton' href='"
                + build_link(filename, lnumber) + "'>Open with Emacs</a>");
            }
        );
    }
    else {
        console.log("org-protocol: Waiting for ajax load");
        window.setTimeout(main, 1000);
    }
}


addJQuery(main);
console.log("Userscript finished");