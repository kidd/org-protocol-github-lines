// Code to use in github-mode.js

interactive("github-clone-repo", null, function(I){
    var document = I.buffer.document;
    var url = document.URL;
    var project = document.URL.match(/github.com\/([^/]+\/[^/]+)/)[1];
var repoTitle = document.querySelectorAll(".js-current-repository");
cloneLink = "org-protocol://github-clone://" + project;
document.location = cloneLink;
});
set_protocol_handler("org-protocol", find_file_in_path("emacsclient"));
