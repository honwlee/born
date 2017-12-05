define([
    "jquery",
    "skylarkjs",
    "lodash",
    "./Partial",
    "./modal",
    "server",
    "handlebars"
], function($, skylarkjs, _, partial, modal, server, hbs) {
    var langx = skylarkjs.langx;
    return langx.Evented.inherit({
        klass: "List",
        init: function(opts) {
            partial.get("list-template-partial");
            var tpl = hbs.compile("{{> list-template-partial}}"),
                selector = this.selector = $(tpl({
                    title: opts.title,
                    id: opts.id
                }));
            this.buildList(selector, opts);
        },

        getDom: function() {
            return this.selector;
        },

        buildList: function(container, opts) {
            // var delays = ['300', '600', '900', '1200'];

            // var dataFilter = function dataFilter(options) {
            //     var items = opts.data;

            //     var filterValue = new RegExp(options.filter, 'i'); //Explicitly make a regex object instead of just using String.search() to avoid confusion with FuelUX search() and options.search
            //     if (!filterValue.test('all')) {
            //         items = _.filter(items, function(item) {
            //             var isFilterMatch = filterValue.test(item.type);
            //             return isFilterMatch;
            //         });
            //     }

            //     var searchTerm;
            //     if (options.search) {
            //         searchTerm = new RegExp(options.search, 'i'); //Explicitly make a regex object instead of just using String.search() to avoid confusion with FuelUX search() and options.search
            //         items = _.filter(items, function(item) {
            //             //collapse all item property values down to a single string to make matching on it easier to manage
            //             var itemText = _.reduce(_.values(_.omit(item, 'ThumbnailAltText', 'ThumbnailImage')), function(finalText, currentText) {
            //                 return finalText + " " + currentText;
            //             });

            //             var isSearchMatch = searchTerm.test(itemText);
            //             return isSearchMatch;
            //         });
            //     }

            //     if (options.sortProperty) {
            //         items = _.sortBy(items, function(item) {
            //             if (options.sortProperty === 'id' || options.sortProperty === 'height' || options.sortProperty === 'weight') {
            //                 return parseFloat(item[options.sortProperty]);
            //             } else {
            //                 return item[options.sortProperty];
            //             }
            //         });
            //         if (options.sortDirection === 'desc') {
            //             items.reverse();
            //         }
            //     }
            //     return items;
            // };

            // var dataSource = function dataSource(options, callback) {
            //     var items = dataFilter(options);
            //     var responseData = {
            //         count: items.length,
            //         items: [],
            //         page: options.pageIndex,
            //         pages: Math.ceil(items.length / (options.pageSize || 50))
            //     };
            //     var firstItem, lastItem;

            //     firstItem = options.pageIndex * (options.pageSize || 50);
            //     lastItem = firstItem + (options.pageSize || 50);
            //     lastItem = (lastItem <= responseData.count) ? lastItem : responseData.count;
            //     responseData.start = firstItem + 1;
            //     responseData.end = lastItem;

            //     responseData.columns = opts.columns;
            //     for (var i = firstItem; i < lastItem; i++) {
            //         responseData.items.push(items[i]);
            //     }

            //     //use setTimeout to simulate server response delay. In production, you would not want to do this
            //     setTimeout(function() {
            //         callback(responseData);
            //     }, delays[Math.floor(Math.random() * 4)]);
            // };

            container.repeater({
                dataSource: opts.dataSource,
                list_actions: {
                    width: 37,
                    items: [{
                        name: 'delete',
                        html: '<span class="glyphicon glyphicon-trash"></span> 删除',
                        clickAction: function(helpers, callback, e) {
                            modal.show("delete", "", opts.deleteTitle, {
                                id: helpers.rowData.id,
                                key: opts.key,
                                callback: function() {
                                    container.repeater('render');
                                    if (opts.callback) opts.callback();
                                }
                            });
                        }
                    }, {
                        name: 'edit',
                        html: '<span class="glyphicon glyphicon-edit"></span> 编辑',
                        clickAction: function(helpers, callback, e) {
                            modal.show("form", $(opts.hbsFormTpl(helpers.rowData)), opts.editTitle, {
                                key: opts.key,
                                callback: function() {
                                    container.repeater('render');
                                    if (opts.callback) opts.callback();
                                }
                            });
                        }
                    }, {
                        name: 'show',
                        html: '<span class="glyphicon glyphicon-eye-open"></span> 查看',
                        clickAction: function(helpers, callback, e) {
                            modal.show("content", $(opts.hbsItemTpl(helpers.rowData)), opts.editTitle, {
                                key: opts.key,
                                callback: function() {
                                    container.repeater('render');
                                    if (opts.callback) opts.callback();
                                }
                            });
                        }
                    }]
                }
            });

            //container.repeater('infinitescrolling', true, { hybrid: true, percentage: 60 });
        }
    });
});