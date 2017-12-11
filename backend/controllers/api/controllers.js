'use strict';
module.exports = {
    users: {
        module: require("./UserController")
    },
    attachments: {
        module: require("./AttachmentController"),
        uploadPath: "attachments"
    },
    slides: {
        module: require("./SlideController")
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
        module: require("./NewsController")
    },
    pages: {
        module: require("./PageController"),
        uploadPath: "attachments"
    },
    photos: {
        module: require("./PhotoController"),
        uploadPath: "photos"
    },
    posts: {
        module: require("./PostController")
    },
    products: {
        module: require("./ProductController")
    },
    contents: {
        module: require("./ContentController")
    },
    grids: {
        module: require("./GridController")
    },
    qas: {
        module: require("./QaController")
    }
}