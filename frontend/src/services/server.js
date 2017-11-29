define([
    "jquery",
    "skylarkjs",
], function($, skylarkjs) {
    var spa = skylarkjs.spa,
        langx = skylarkjs.langx,
        Service = langx.klass({
            klassName: "SpaService",
            memory: {},
            init: function(config) {
                this.memory = {
                    data: {},
                    users: {},
                    contacts: {},
                    events: {},
                    groups: {},
                    posts: {},
                    financings: {}
                };
            },

            start: function(callback) {
                if (this.memory.data) {
                    return langx.Deferred.when(this.memory.data);
                } else {
                    var deferred = new langx.Deferred(),
                        self = this,
                        backendApi = spa().getConfig("backendApi"),
                        tokenApi = spa().getConfig("tokenApi");
                    // $.get(tokenApi, function(token) {
                    // $.get(backendApi + "?private_token=" + token.token, function(data) {
                    $.get(backendApi, function(data) {
                        self.memory.data = data;
                        deferred.resolve(data);
                        // });
                    });
                    return deferred.promise;
                }
            },

            startServer: function() {
                var deferred = new langx.Deferred();
                $.get("/api/start", function(data) {
                    deferred.resolve(data);
                });
                return deferred.promise;
            },

            connect: function(name, method, action, args) {
                var main = $(".page-container")[0],
                    self = this,
                    deferred = new langx.Deferred(),
                    throb = window.addThrob(main, function() {
                        if (args) {
                            $[method]("/api/" + name + "/" + action, args, function(data) {
                                self.memory[name][action] = data;
                                throb.remove();
                                main.style.opacity = 1;
                                deferred.resolve(data);
                            });
                        } else {
                            $[method]("/api/" + name + "/" + action, function(data) {
                                self.memory[name][action] = data;
                                throb.remove();
                                main.style.opacity = 1;
                                deferred.resolve(data);

                            });
                        }
                    });
                return deferred.promise;
            }
        });

    var server;
    var serverFunc = function(config) {
        if (!server) {
            window.spaServer = server = new Service(config);
        }
        return server;
    }
    return serverFunc;
});
