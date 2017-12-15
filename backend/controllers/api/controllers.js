'use strict';
module.exports = {
    users: {
        module: require("./UserController"),
        uploadPath: "users"
    },
    categories: {
        module: require("./CategoryController")
    },
    slides: {
        module: require("./SlideController"),
        uploadPath: "slides"
    },
    links: {
        module: require("./LinkController")
    },
    news: {
        module: require("./NewsController"),
        uploadPath: "news"
    },
    pages: {
        module: require("./PageController"),
        uploadPath: "pages"
    },
    photos: {
        module: require("./PhotoController"),
        uploadPath: "photos"
    },
    posts: {
        module: require("./PostController"),
        uploadPath: "posts",
        extralNames: ["meet", "activity", "process", "service", "about", "env"],
        extraPrefix: [{
            name: "post_",
            method: "post"
        }, {
            name: "public_",
            method: "get"
        }]
    },
    contents: {
        module: require("./ContentController"),
        uploadPath: "contents"
    },
    qas: {
        module: require("./QaController"),
        uploadPath: "qas"
    },
    sites: {
        module: require("./SiteController"),
        uploadPath: "sites"
    },
    snippets: {
        module: require("./SnippetController"),
        uploadPath: "snippets"
    }
}