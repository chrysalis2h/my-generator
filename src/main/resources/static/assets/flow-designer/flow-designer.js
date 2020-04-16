/*jshint
 strict:true,
 noempty:true,
 noarg:true,
 eqeqeq:true,
 browser:true,
 bitwise:true,
 curly:true,
 undef:true,
 nonew:true,
 forin:true */

/*global $, App, moment, jQuery, bootbox, modelPackage */
var flowDesigner = function () {
    'use strict';
    // 全局属性参数
    var configMap = {
        path: '',
        dataUrl: '/modelPackageChart',
        classDataUrl: '/modelClass',
        editPageUrl: '/modelClass/model-class-edit.jsp',
        quotePageUrl: '/modelClass/model-class-quote.jsp',
        jointUml: null
    };

    // 全局Dom
    var jqueryMap = {
        $blockTarget: $('body'),
        $blockUmlData: null
    };

    var lineType = {
        "uml.Generalization": "extends",
        "uml.Association": "association",
        "uml.Composition": "composition",
        "uml.Implementation": "implementation"
    };

    var addClassChart = function (jointUml, clazz) {
        jointUml.addClass({
            id: clazz.id,
            position: {x: clazz.positionX, y: clazz.positionY},
            name: clazz.name,
            attributes: [clazz.name],
            methods: [clazz.cnName]
        }, clazz.type);
    };

    var addQuoteClassChart = function (jointUml, quoteClass) {
        jointUml.addClass({
            id: quoteClass.classId,
            qId: quoteClass.id,
            position: {x: quoteClass.positionX, y: quoteClass.positionY},
            name: quoteClass.modelClass.name,
            attributes: [quoteClass.modelClass.name],
            methods: [quoteClass.modelClass.cnName]
        }, "quote");
    };

    var addLineChart = function (jointUml, line) {
        jointUml.addLine({
            id: line.id,
            source: {id: line.source},
            target: {id: line.target}
        }, line.type);
    };

    // 初始化数据
    var initChart = function (packageId, domId) {
        var jointUml = $("#" + domId).data("jointUml");
        if (jointUml == undefined) {
            jointUml = $("#" + domId).jointUml();
            $("#" + domId).data("jointUml", jointUml);
        }
        configMap.jointUml = jointUml;
        return;
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在获取数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl + "/" + packageId,
            dataType: 'JSON',
            type: 'GET',
            success: function (data) {
                App.unblockUI(jqueryMap.$blockTarget);
                var modelClass = data.modelClass;
                var modelQuoteClass = data.modelQuoteClass;
                var modelClassRelation = data.modelClassRelation;
                // 添加类
                $.each(modelClass, function() {
                    addClassChart(jointUml, this);
                });
                // 添加类引用
                $.each(modelQuoteClass, function() {
                    addQuoteClassChart(jointUml, this);
                });
                // 添加连线
                $.each(modelClassRelation, function() {
                    addLineChart(jointUml, this);
                });
            },
            error: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                var errorData = jQuery.parseJSON(result.responseText);
                Messenger().post({
                    message: errorData.errMsg,
                    type: 'warning'
                });
            }
        });
    };

    var openEditPage = function (title, packageId, domId, id) {
        var url = configMap.path + configMap.editPageUrl + "?packageId=" + packageId;
        if(id) {
            url = url + "&id=" + id;
        }
        var dialog = null;
        var dialogButtons = {
            cancel: {
                label: '&nbsp;关闭&nbsp;',
                className: 'btn-default'
            }
        };
        dialogButtons.success = {
            label: "&nbsp;保存&nbsp;",
            className: "btn-info",
            callback: function () {
                var jointUml = $("#" + domId).data("jointUml");
                modelClassEdit.save(function (result) {
                    if (result) {
                        removeAllClassMagnet(domId);
                        addClassChart(jointUml, result);
                        dialog.modal('hide');
                    }
                }, jointUml.getPaperX(), jointUml.getPaperY());
                return false;
            }
        };
        $.get(url, function (html) {
            dialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    var openQuotePage = function (title, packageId, domId) {
        var url = configMap.path + configMap.quotePageUrl + "?packageId=" + packageId;
        var dialog = null;
        var dialogButtons = {
            cancel: {
                label: '&nbsp;关闭&nbsp;',
                className: 'btn-default'
            }
        };
        dialogButtons.success = {
            label: "&nbsp;保存&nbsp;",
            className: "btn-info",
            callback: function () {
                modelClassQuote.save(function (result) {
                    if (result) {
                        var jointUml = $("#" + domId).data("jointUml");
                        var quoteClass = {
                            classId: result.id,
                            positionX: result.positionX - jointUml.getPaperX(),
                            positionY: result.positionY - jointUml.getPaperY(),
                            modelClass: result
                        };
                        removeAllClassMagnet(domId);
                        addQuoteClassChart(jointUml, quoteClass);
                        dialog.modal('hide');
                    }
                });
                return false;
            }
        };
        $.get(url, function (html) {
            dialog = bootbox.dialog({
                title: title,
                message: html,
                buttons: dialogButtons
            });
        });
    };

    // 打开添加类页面
    var addModelClass = function (obj, domId) {
        var clazz = {
            id: '1',
            positionX: '100',
            positionY: '100',
            name: '100',
            cnName: '100',
            type: '100'
        };
        addClassChart(configMap.jointUml, clazz);
        var packageId = obj.data("packageId");
        openEditPage('添加模型类', packageId, domId);
    };

    // 打开添加引用页面
    var addQuote = function (obj, domId) {
        var packageId = obj.data("packageId");
        openQuotePage('添加引用', packageId, domId);
    };

    var removeAllClassMagnet = function (domId) {
        $("#" + domId).removeAttr("data-link");
        $("#" + domId + " .chart-tool").removeClass("btn-active");
    };

    var addRelation = function (obj, domId) {
        var relation = obj.attr("data-relation");
        $("#" + domId).attr("data-link", relation);
        $("#" + domId + " .chart-tool").removeClass("btn-active");
        obj.addClass("btn-active");
    };

    var removeAllBootstrapMenu = function () {
        $(".bootstrapMenu").remove();
    };

    var initContextMenu = function (packageId, domId) {
        var jointUml = $("#" + domId).data("jointUml");
        jointUml.getPaper().on('cell:contextmenu', function(cellView, evt, x, y) {
            removeAllClassMagnet(domId);
            removeAllBootstrapMenu();
            var modelId = cellView.$el.attr("model-id");
            var actions = [];
            if (cellView.model.attributes.type != "uml.Quote") {
                actions.push({
                    name: '编辑',
                    onClick: function() {
                        openEditPage('编辑模型类', packageId, domId, modelId);
                    }
                });
            }
            actions.push({
                name: '删除',
                onClick: function() {
                    jointUml.getGraph().removeCells(jointUml.getGraph().getCell(modelId));
                }
            });
            new BootstrapMenu('.joint-type-uml', {
                actions: actions
            });
        });
    };

    var getProperty = function (domId) {
        var jointUml = $("#" + domId).data("jointUml");
        jointUml.getPaper().on('cell:pointerdown', function(cellView, evt, x, y) {
            var $table = $("#" + domId + " .class-property .property-table");
            var modelId = cellView.$el.attr("model-id");
            var modelOldId = $table.attr("data-class-id");
            if (modelId != modelOldId) {
                $table.attr("data-class-id", modelId);
                modelClassProperty.initTableData(modelId, $table);
                $("#" + domId + " .class-property .add-property-btn").off('click').on('click', function () {
                    modelClassProperty.addModelClassProperty(modelId, $table);
                });
            }
        });
    };

    // 保存信息
    var saveChart = function (obj, domId) {
        var packageId = obj.data("packageId");
        removeAllClassMagnet(domId);
        var jointUml = $("#" + domId).data("jointUml");
        var classes = jointUml.getClasses();
        var lines = jointUml.getLines();
        var modelClasses = [];
        var modelQuoteClasses = [];
        var modelClassRelations = [];
        $.each(classes, function() {
            if (this.attributes.type == "uml.Quote") {
                var modelQuoteClass = {
                    id: this.attributes.qId,
                    positionX: this.position().x,
                    positionY: this.position().y,
                    packageId: packageId,
                    classId: this.id
                };
                modelQuoteClasses.push(modelQuoteClass);
            } else {
                var modelClass = {
                    id: this.id,
                    positionX: this.position().x,
                    positionY: this.position().y
                };
                modelClasses.push(modelClass);
            }
        });
        $.each(lines, function() {
            var type = lineType[this.attributes.type];
            if(type) {
                var modelClassRelation = {
                    id: this.id,
                    packageId: packageId,
                    type: type,
                    source: this.getSourceElement().id,
                    target: this.getTargetElement().id
                };
                modelClassRelations.push(modelClassRelation);
            }
        });
        var data = {
            packageId: packageId,
            modelClass: modelClasses,
            modelQuoteClass: modelQuoteClasses,
            modelClassRelation: modelClassRelations
        };
        App.blockUI({
            target: jqueryMap.$blockTarget,
            boxed: true,
            message: '正在保存数据，请稍候...'
        });
        $.ajax({
            url: configMap.path + configMap.dataUrl,
            type: "PUT",
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(data),
            success: function () {
                App.unblockUI(jqueryMap.$blockTarget);
                Messenger().post({
                    message: "保存成功"
                });
            },
            error: function (result) {
                App.unblockUI(jqueryMap.$blockTarget);
                var errorData = jQuery.parseJSON(result.responseText);
                Messenger().post({
                    message: errorData.errMsg,
                    type: 'warning'
                });
            }
        });
    };

    // 初始化table
    var initTable = function ($table) {
        var columns = [{
            field: 'cnName',
            align: 'center',
            valign: 'middle',
            width: '15%',
            title: '中文名称'
        }, {
            field: 'name',
            align: 'center',
            valign: 'middle',
            width: '15%',
            title: '属性名'
        }, {
            align: 'center',
            valign: 'middle',
            width: '15%',
            title: '操作',
            formatter: function (value, row, index) {
                var edit = '<a href="javascript:;" data-classId="' + row.classId + '" data-id="' + row.id +'" class="btn btn-xs default" data-type="model-class-property-edit" data-toggle="tooltip" title="编辑模型"><i class="glyphicon glyphicon-edit"></i></a>';
                var del = '';
                if (!row.extended) {
                    del = '<a href="javascript:;" data-classId="' + row.classId + '" data-id="' + row.id +'" class="btn btn-xs default" data-type="model-class-property-del" data-toggle="tooltip" title="删除模型"><i class="glyphicon glyphicon-trash"></i></a>';
                }
                return edit + del;
            }
        }];
        modelClassProperty.initTable($table, columns);
    };

    return {
        init: function (packageId, domId) {
            // $('#' + domId + ' [data-toggle="tooltip"]').tooltip();
            $("#" + domId + " .select-btn").off('click').on('click', function () {
                removeAllClassMagnet(domId);
            });
            $("#" + domId + " .add-btn").off('click').on('click', function () {
                $(this).data("packageId", packageId);
                addModelClass($(this), domId);
            });
            $("#" + domId + " .quote-btn").off('click').on('click', function () {
                $(this).data("packageId", packageId);
                addQuote($(this), domId);
            });
            $("#" + domId + " .relation-btn").off('click').on('click', function () {
                $(this).data("packageId", packageId);
                addRelation($(this), domId);
            });
            $("#" + domId + " .save-btn").off('click').on('click', function () {
                $(this).data("packageId", packageId);
                saveChart($(this), domId);
            });
            initChart(packageId, domId);
            initContextMenu(packageId, domId);
            // initTable($("#" + domId + " .class-property table"));
            // getProperty(domId);
            /*setTimeout(function () {
                var parentLayout = $("#" + domId + " .paper-parent").layout({
                    name: "parentLayout",
                    center__paneSelector: ".chart-paper",
                    east__paneSelector: ".class-property",
                    east__size: 360,
                    minSize: 50,
                    spacing_open: 5,
                    spacing_closed: 5,
                    east__spacing_closed: 5
                });
                var chartLayout = $("#" + domId + " .package-chart").layout({
                    name: "chartLayout",
                    center__paneSelector: ".joint-paper",
                    minSize: 50,
                    spacing_open: 0,
                    spacing_closed: 0
                });
            }, 10);*/
        }
    }
}();
//@ sourceURL=static/assets/flow-designer/flow-designer.js;