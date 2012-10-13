// ==UserScript==
// @name           org-protocol-github-lines
// @description    Insert emacs links to commented lines in gh pull requests.
// @author         Raimon Grau Cuscó <raimonster@gmail.com>
// @include        https://github.com/*/pull/*
// @include        https://github.com/*/commit/*
// @version        0.1.2
// @license        LGPL http://www.gnu.org/licenses/lgpl.html
// ==/UserScript==

console.log("Userscript started");

function main() {

    console.log("Running");
    if ($("tr.inline-comments").length > 0) {
        console.log("org-protocol: Ajax loaded, adding Emacs links");
        var build_link = function (fname, lnumber) {
            // create the org-protocol url
            console.log("org-protocol: Generating link for " + fname + "#" + lnumber);
            return "org-protocol://github-comment://" + document.URL.match(/github.com\/([^/]+\/[^/]+)/)[1] + "/" + fname + "/" + lnumber;
        }

        var strip = function (s) {
            // remove white space from s
            return s.replace(/^\s+|\s+$|\n/g, '').replace(/\s.*$/,'');
        }

        var comments = $("tr.inline-comments");

        $.each(comments,
            function(i, e) {
                // add a link for emacs to each diff comment
                console.log("Adding button");
                var fnameNode = $(this).closest(".data").prev();
		// $(".inline-comments").first().prev().find("td.line_numbers").each
                var filename = fnameNode.data("path");
                var lnumber = strip($(this).prev().text());
		// lnumber = $(this).find("td.gi:first").prev();
		console.log($(this), e, i);
                $(this).find("div.show-inline-comment-form").append("<a class='minibutton' href='"
                + build_link(filename, lnumber) + "'>Open with Emacs</a>");
            }
        );
    }
    else {
        console.log("org-protocol: Waiting for ajax load");
        window.setTimeout(main, 1000);
    }
};

// function whenAvailable(name, callback) {
//     var interval = 1000; // ms
//     window.setTimeout(function() {
//         if (typeof unsafeWindow.jQuery != 'undefined') {
// 	   console.log("load!");
//             callback(window[name]);
//         } else {
// 	    console.log("waiting a bit more");
//             window.setTimeout(arguments.callee, interval);
//         }
//     }, interval);
// }
//whenAvailable("jQuery", main);

//addJQuery(main);

// Inject our main script
var script = document.createElement('script');
script.type = "text/javascript";
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script);

console.log("Userscript finished");