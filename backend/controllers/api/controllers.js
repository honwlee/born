'use strict';
module.exports = {
    users: {
        module: require("./UserController"),
        uploadPath: "users"
    },
    attachments: {
        module: require("./AttachmentController"),
        uploadPath: "attachments"
    },
    slides: {
        module: require("./SlideController"),
        uploadPath: "slides"
    },
    events: {
        module: require("./EventController")
    },
    keywords: {
        module: require("./KeywordController")
    },
    messages: {
        module: require("./MessageController")
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
        uploadPath: "posts"
    },
    products: {
        module: require("./ProductController")
    },
    contents: {
        module: require("./ContentController"),
        uploadPath: "contents"
    },
    grids: {
        module: require("./GridController"),
        uploadPath: "grids"
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