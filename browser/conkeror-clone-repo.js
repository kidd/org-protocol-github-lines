function clone_repo(I){
    var document = I.buffer.document;
    var url = document.URL;
    var project = document.URL.match(/(bitbucket|github)\....\/([^/]+\/[^/]+)/);
    cloneLink = "org-protocol://"+ project[1] +"-clone://" + project[2];
    document.location = cloneLink;
}

interactive("github-clone-repo", null, clone_repo );
interactive("clone-repo", null, clone_repo );

set_protocol_handler("org-protocol", find_file_in_path("emacsclient"));
