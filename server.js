'use strict';
const SlaxServer = require('skylark-slax-nodeserver'),
    path = require('path'),
    express = require('express'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    methodOverride = require('method-override'),
    fs = require('fs'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    exphbs = require('express-handlebars'),
    backupDb = require('./backend/exts/schedule.js').backupDb,
    funcs = require('./backend/auth/functions.js'),
    chalk = require('chalk'),
    routes = require('./backend/routes/routes'),
    publicPath = path.join(__dirname, "public"),
    replacestream = require('replacestream');

require('./backend/auth/passport.js');

function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { return next(); }
    if (req.method == "POST") {
        res.json({ status: false, auth: true, msg: "please login!" });
    } else {
        res.redirect('/signin');
    }
}

function errorHandler(err, req, res, next) {
    return res.json({ status: false, system: true, msg: err });
}

function _startBackend(app) {
    var hbs = exphbs.create({
        defaultLayout: 'main'
    });
    app.set('views', path.join(__dirname, 'backend/views'));
    app.engine('handlebars', hbs.engine);
    app.set('view engine', 'handlebars');
    app.use(logger('dev'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(methodOverride('X-HTTP-Method-Override'));
    app.use(session({
        secret: 'bornsupernova',
        saveUninitialized: true,
        resave: false,
        cookie: {
            httpOnly: true,
            maxAge: 3600000 // see below
        }
    }));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(express.static(publicPath));
    // Session-persisted message middleware
    app.use(function(req, res, next) {
        let err = req.session.error,
            msg = req.session.notice,
            success = req.session.success;

        delete req.session.error;
        delete req.session.success;
        delete req.session.notice;

        if (err) res.locals.error = err;
        if (msg) res.locals.notice = msg;
        if (success) res.locals.success = success;

        next();
    });
    routes(app, null, ensureAuthenticated, publicPath);

    app.use(errorHandler);
    backupDb();
};

function _prependSlaxApps() {
    let slaxs = [],
        appPath = path.join(__dirname, "frontend/deploy");

    fs.readdirSync(appPath).forEach(name => {
        let reg = new RegExp("(.*)\.slax$");
        let matcher = name.match(reg);
        if (matcher) {
            let contextPath = "/" + matcher[1],
                middleware = ensureAuthenticated;
            if (matcher[1] === "home") {
                contextPath = "";
                middleware = null;
            }
            slaxs.push({
                name: matcher[1],
                slaxPath: path.join(appPath, name),
                contextPath: contextPath,
                middleware: middleware
            });
        }
    });
    return slaxs;
};

function serve(options) {
    let _express = options.express = express();
    _startBackend(_express);
    options.slaxs = _prependSlaxApps();
    let slaxServer = new SlaxServer(options);
    slaxServer.start(function() {
        console.log(chalk.blue('*'), 'slax server successfully started.');
        console.log(chalk.blue('*'), 'Serving files at:', chalk.cyan('http://localhost:' + options.port));
        console.log(chalk.blue('*'), 'Press', chalk.yellow.bold('Ctrl+C'), 'to shutdown.');
        return slaxServer;
    });
};

const npm_argv = JSON.parse(process.env.npm_config_argv || "{}");
if (!(npm_argv && npm_argv.cooked instanceof Array)) {
    throw TypeError("npm argv Error"); // 异常的抛出会终止npm install命令
}

serve({
    port: npm_argv.cooked[3] || 8087,
    // root: path.join(__dirname, "frontend/src/apps/home")
});