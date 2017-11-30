'use strict';
module.exports = {
    users: {
        module: require("./UserController")
    },
    attachments: {
        module: require("./AttachmentController"),
        uploadPath: "attachments"
    },
    banners: {
        module: require("./BannerController"),
        uploadPath: "banners"
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
        module: require("./PageController")
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
    }
}
