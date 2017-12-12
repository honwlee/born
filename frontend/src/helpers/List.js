define([
    "jquery",
    "skylarkjs",
    "lodash",
    "./Partial",
    "text!./_fueluxPartials.hbs",
    "server",
    "handlebars"
], function($, skylarkjs, _, partial, fueluxTpl, server, hbs) {
    var langx = skylarkjs.langx;
    var __selector = $(langx.trim(fueluxTpl));
    partial.get("repeater-tpl-partial", __selector);
    partial.get("datepicker-tpl-partial", __selector);
    partial.get("checkbox-tpl-partial", __selector);
    partial.get("wizard-tpl-partial", __selector);

    function customColumnRenderer(helpers, callback) {
        // Determine what column is being rendered and review 
        // http://getfuelux.com/extensions.html#bundled-extensions-list-options
        // for more information on the helpers object.
        var column = helpers.columnAttr;

        // get all the data for the entire row
        var rowData = helpers.rowData;
        var customMarkup = '';

        // Only override the output for specific columns.
        // This will default to output the text value of the row item
        // Determines markup for each column!
        switch (column) {
            case 'name':
                // let's combine name and description into a single column
                customMarkup = '<a href="#">' + rowData.name + '</a><div class="small text-muted">' + '</div>';
                break;

            case 'status':
                // let's change the text color based on status
                var color = '#000';
                switch (helpers.item.text()) {
                    case 'Yes':
                        color = '#000000';
                        break
                    case 'No':
                        color = '#FF0000';
                        break;
                }
                customMarkup = '<span style="color:' + color + '">' + helpers.item.text() + '</span>';
                break;

            default:
                // otherwise, just use the existing text value
                customMarkup = helpers.item.text();
                break;
        }

        helpers.item.html(customMarkup);

        callback();
    }
    var defaultActions = {
        "delete": function(modal, opts) {
            return {
                name: 'delete',
                html: '<span class="glyphicon glyphicon-trash"></span> 删除',
                clickAction: function(helpers, callback, e) {
                    modal.show("delete", "", opts.title, {
                        id: helpers.rowData.id,
                        key: opts.key,
                        callback: function() {
                            opts.container.repeater('render');
                            if (opts.callback) opts.callback();
                        }
                    });
                }
            };
        },
        "edit": function(modal, opts) {
            return {
                name: 'edit',
                html: '<span class="glyphicon glyphicon-edit"></span> 编辑',
                clickAction: function(helpers, callback, e) {
                    modal.show("form", $(opts.tpl(helpers.rowData)), opts.title, {
                        key: opts.key,
                        callback: function() {
                            opts.container.repeater('render');
                            if (opts.callback) opts.callback();
                        }
                    });
                }
            };
        },
        "show": function(modal, opts) {
            return {
                name: 'show',
                html: '<span class="glyphicon glyphicon-eye-open"></span> 查看',
                clickAction: function(helpers, callback, e) {
                    modal.show("content", $(opts.tpl(helpers.rowData)), opts.title, {
                        key: opts.key,
                        callback: function() {
                            opts.container.repeater('render');
                            if (opts.callback) opts.callback();
                        }
                    });
                }
            };
        }
    };
    var List = langx.Evented.inherit({
        klass: "List",
        init: function(opts) {

            var tpl = hbs.compile("{{> repeater-tpl-partial}}"),
                selector = this.selector = $(tpl({
                    itemsPerPage: [
                        { value: 5, text: 5 },
                        { value: 10, text: 10, selected: true },
                        { value: 20, text: 20 },
                        { value: 50, text: 50 },
                        { value: 100, text: 100 }
                    ],
                    listSelectable: opts.listSelectable === false ? false : true,
                    filters: [
                        { value: 'all', text: 'All', selected: true },
                        { value: 'some', text: 'Some' },
                        { value: 'others', text: 'Others' }
                    ],
                    filtersAlt: [
                        { value: 'bug', text: 'Bug' },
                        { value: 'dark', text: 'Dark' },
                        { value: 'dragon', text: 'Dragon' },
                        { value: 'electric', text: 'Electric' },
                        { value: 'fairy', text: 'Fairy' },
                        { value: 'fighting', text: 'Fighting' },
                        { value: 'fire', text: 'Fire' },
                        { value: 'flying', text: 'Flying' },
                        { value: 'ghost', text: 'Ghost' },
                        { value: 'grass', text: 'Grass' },
                        { value: 'ground', text: 'Ground' },
                        { value: 'ice', text: 'Ice' },
                        { value: 'normal', text: 'Normal' },
                        { value: 'poison', text: 'Poison' },
                        { value: 'psychic', text: 'Psychic' },
                        { value: 'rock', text: 'Rock' },
                        { value: 'steel', text: 'Steel' },
                        { value: 'water', text: 'Water' }
                    ],
                    addBtn: opts.addBtn === false ? false : true,
                    refreshBtn: opts.refreshBtn === false ? false : true,
                    title: opts.title,
                    needHeader: opts.needHeader == false ? false : true,
                    multiView: opts.multiView === true ? true : false,
                    listShow: opts.listShow === false ? false : true,
                    thumbShow: opts.thumbShow === false ? false : true,
                    id: opts.id
                }));
            this.buildList(selector, opts);
        },

        getDom: function() {
            return this.selector;
        },

        initDataSource: function(opts) {
            return function(options, callback) {
                var pageIndex = options.pageIndex;
                var pageSize = options.pageSize;
                var options = {
                    limit: pageSize,
                    direction: options.sortDirection,
                    sort: options.sortProperty,
                    filter: options.filter.value || '',
                    search: options.search || ''
                };
                var action = "index?page=" + pageIndex;
                for (var key in options) {
                    if (options.key) action = action + "&&" + key + "=" + options[key];
                }

                server().connect(opts.key, "get", action).then(function(data) {
                    var items = data.rows || [];
                    var totalItems = data.total;
                    var totalPosts = Math.ceil(totalItems / pageSize);
                    var startIndex = (pageIndex * pageSize) + 1;
                    var endIndex = (startIndex + pageSize) - 1;

                    if (endIndex > items.length) {
                        endIndex = items.length;
                    }

                    // configure datasource
                    var dataSource = {
                        page: pageIndex,
                        pages: totalPosts,
                        count: totalItems,
                        start: startIndex,
                        end: endIndex,
                        columns: opts.columns,
                        items: items
                    };

                    // invoke callback to render repeater
                    callback(dataSource);
                });
            };
        },

        buildList: function(container, opts) {
            var obj = {};
            if (opts.dataSource) {
                obj.dataSource = opts.dataSource;
            } else {
                obj.dataSource = this.initDataSource(opts);
            }
            obj.defaultView = opts.defaultView || "list";
            if (opts.views) obj.views = opts.views;
            if (opts.thumbnail_selectable) obj.thumbnail_selectable = opts.thumbnail_selectable;
            if (opts.thumbnail_template) obj.thumbnail_template = opts.thumbnail_template;
            if (opts.list_selectable) obj.list_selectable = opts.list_selectable;
            if (opts.actions) {
                require(["scripts/helpers/modal"], function(modal) {
                    var actions = [];
                    opts.actions.forEach(function(a) {
                        if (defaultActions[a.name]) {
                            actions.push(defaultActions[a.name](modal, {
                                container: container,
                                key: opts.key,
                                callback: a.callback,
                                tpl: a.tpl,
                                title: a.title
                            }));
                        } else {
                            actions.push(a);
                        }
                    });
                    obj.list_actions = {
                        width: 37,
                        items: actions
                    };
                    container.repeater(obj);
                });


            } else {
                container.repeater(obj);
            }
            // container.repeater('infinitescrolling', true, { hybrid: true });
        }
    });
    return List;
});