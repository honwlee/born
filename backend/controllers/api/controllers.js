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
        uploadPath: "photos",
        extralNames: ["slide", "page", "content"],
        extraPrefix: [{
            name: "post_",
            method: "post"
        }, {
            name: "public_",
            method: "get"
        }]
    },
    posts: {
        module: require("./PostController"),
        uploadPath: "posts",
        extralNames: ["meet", "activity", "process", "env", "service"],
        extraPrefix: [{
            name: "post_",
            method: "post"
        }, {
            name: "public_",
            method: "get"
        }, {
            name: "recommmended_",
            method: "get"
        }, {
            name: "show_",
            method: "get"
        }]
    },
    contents: {
        module: require("./ContentController"),
        uploadPath: "contents",
        extralNames: ["home", "service", "process", "about"],
        extraPrefix: [{
            name: "post_",
            method: "post"
        }, {
            name: "public_",
            method: "get"
        }]
    },
    qas: {
        module: require("./QaController"),
        uploadPath: "qas"
    },
    courses: {
        module: require("./CourseController"),
        uploadPath: "course"
    },
    sites: {
        module: require("./SiteController"),
        uploadPath: "sites"
    },
    snippets: {
        module: require("./SnippetController"),
        uploadPath: "snippets",
        extralNames: ["vantage", "provide", "visa", "hospital", "flow", "certificate", "about", "contact", "job", "service", "link"],
        extraPrefix: [{
            name: "post_",
            method: "post"
        }, {
            name: "public_",
            method: "get"
        }]
    }
}