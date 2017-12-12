const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');
const appPath = path.join(__dirname, "../../frontend/src/apps/home");
const configPath = path.join(appPath, "src/slax-config.json");

function parse() {
    return JSON.parse(fs.readFileSync(configPath, 'utf8'));
};

function writeConfig(page, name) {
    let configData = parse();
    let route = configData.routes[page.name];
    if (route) {
        route.data = {
            name: name,
            navName: page.title
        };
        if (page.hide) route.hide = true;
        if (page.type === "sub") {
            route.sub = true;
        }
    }
    fs.writeFileSync(configPath, JSON.stringify(configData));
};

module.exports = {
    add: function(page) {
        let route, name = page.name,
            pathto = page.pathto,
            addRoute = function(_page, _name, _pathto) {
                exec('sjs routes add ' + appPath + ' ' + _name + ":" + _pathto, (err, stdout, stderr) => {
                    if (stdout) {
                        console.log(`stdout: ${stdout}`);
                        writeConfig(_page, name);
                    } else {
                        console.log(`stderr: ${stderr}`);
                    }
                });
            };
        if (page.parentName) {
            name = page.parentName + "-" + name;
        }
        addRoute(page, name, pathto);
    },
    update: function(page) {
        let name = page.name;
        if (page.parentName) {
            name = page.parentName + "-" + name;
        }
        writeConfig(page, name);
    },
    remove: function(page) {
        let name = page.name;
        if (page.type === "sub") {
            name = page.parentName + "-" + name;
        }
        exec('sjs routes remove ' + appPath + ' ' + name, (err, stdout, stderr) => {
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    },
    parse: parse
}