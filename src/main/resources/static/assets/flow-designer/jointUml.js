(function ($) {
    var jointUml = {};
    jointUml.prototype = {};
    jointUml.prototype = {};
    var bgImageDataURL = 'data:image/png;base64,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';
    jointUml.prototype.class = {
        attrs: {
            '.uml-class-name-rect, .uml-class-methods-rect': {
                fill: '#ffb752',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-rect': {
                fill: '#fdc577',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-text': {
                ref: '.uml-class-attrs-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            },
            '.uml-class-methods-text': {
                ref: '.uml-class-methods-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            }
        }
    };
    jointUml.prototype.abstract = {
        attrs: {
            '.uml-class-name-rect, .uml-class-methods-rect': {
                fill: '#ffb752',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-rect': {
                fill: '#fdc577',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-text': {
                ref: '.uml-class-attrs-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            },
            '.uml-class-methods-text': {
                ref: '.uml-class-methods-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            }
        }
    };
    jointUml.prototype.interface = {
        attrs: {
            '.uml-class-name-rect, .uml-class-methods-rect': {
                fill: '#feb662',
                stroke: '#ffffff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-rect': {
                fill: '#fdc886',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-text': {
                ref: '.uml-class-attrs-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            },
            '.uml-class-methods-text': {
                ref: '.uml-class-methods-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            }
        }
    };
    // jointUml.prototype.abstract = {
    //     attrs: {
    //         '.uml-class-name-rect, .uml-class-methods-rect': {
    //             fill: '#36c6d3',
    //             stroke: '#ffffff',
    //             'stroke-width': 0.5
    //         },
    //         '.uml-class-attrs-rect': {
    //             fill: '#52d7e3',
    //             stroke: '#fff',
    //             'stroke-width': 0.5
    //         },
    //         '.uml-class-methods-text, .uml-class-attrs-text': {
    //             fill: '#fff'
    //         }
    //     }
    // };
    jointUml.prototype.quote = {
        attrs: {
            '.uml-class-name-rect, .uml-class-methods-rect': {
                fill: '#36c6d3',
                stroke: '#ffffff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-rect': {
                fill: '#52d7e3',
                stroke: '#fff',
                'stroke-width': 0.5
            },
            '.uml-class-attrs-text': {
                ref: '.uml-class-attrs-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            },
            '.uml-class-methods-text': {
                ref: '.uml-class-methods-rect',
                'ref-y': 0.5,
                'y-alignment': 'middle'
            }
        }
    };

    jointUml.prototype.generalization = {
        attrs: {
            '.marker-target': {
                d: 'M 10 5 L 0 10 L 10 15 z', fill: 'white'
            }
        },
        arrowheadMarkup: [
            '<g>',
            '<path class="marker-arrowhead" end="<%= end %>" d="M 14 6 L 0 13 L 14 20 z" />',
            '</g>'
        ].join('')
    };

    jointUml.prototype.implements = {
        attrs: {
            '.marker-target': {
                d: 'M 10 5 L 0 10 L 10 15 z', fill: 'white'
            },
            '.connection': {
                'stroke-dasharray': '3,3'
            }
        },
        arrowheadMarkup: [
            '<g>',
            '<path class="marker-arrowhead" end="<%= end %>" d="M 14 6 L 0 13 L 14 20 z" />',
            '</g>'
        ].join('')
    };

    jointUml.prototype.aggregation = {
        attrs: {
            '.marker-target': {
                d: 'M 20 10 L 10 15 L 0 10 L 10 5 z', fill: 'white'
            }
        },
        arrowheadMarkup: [
            '<g>',
            '<path class="marker-arrowhead" end="<%= end %>" d="M 14 6 L 0 13 L 14 20 z" />',
            '</g>'
        ].join('')
    };
    jointUml.prototype.composition = {
        attrs: {
            '.marker-target': {
                d: 'M 20 10 L 10 15 L 0 10 L 10 5 z', fill: 'black'
            }
        },
        arrowheadMarkup: [
            '<g>',
            '<path class="marker-arrowhead" end="<%= end %>" d="M 14 6 L 0 13 L 14 20 z" />',
            '</g>'
        ].join('')
    };
    jointUml.prototype.association = {
        arrowheadMarkup: [
            '<g>',
            '<path class="marker-arrowhead" end="<%= end %>" d="M 14 6 L 0 13 L 14 20 z" />',
            '</g>'
        ].join('')
    };

    $.fn.jointUml = function (o) {
        var thiz = $(this);
        var umlDom = $(thiz.find(".paper"));
        var graph = new joint.dia.Graph();
        var opt = {
            el: umlDom,
            width: 'auto',
            height: 600,
            gridSize: 10,
            drawGrid: true,
            linkPinning: false,
            drawBackground: {
                image: bgImageDataURL
            },
            model: graph,
            validateConnection: function(cellViewS, magnetS, cellViewT, magnetT, end, linkView) {
                cellViewT.$el.removeAttr("class-magnet").removeAttr("style");
                if (cellViewS == cellViewT) {
                    return false;
                }
                var currentType = linkView.model.attributes.type;
                var currentSource = cellViewS.model.id;
                var currentTarget = cellViewT.model.id;
                var portUsed = _.find(this.model.getLinks(), function(link) {
                    var type = link.attributes.type;
                    var source = link.attributes.source.id;
                    var target = link.attributes.target.id;
                    return (currentType == type && ((currentSource == source && currentTarget == target)
                        || (currentSource == target && currentTarget == source)));
                });
                if (portUsed) {
                    cellViewT.$el.css("cursor", "not-allowed");
                }
                return !portUsed;
            }
        };
        $.extend(opt, o);
        var paper = new joint.dia.Paper(opt);
        // 拖动空白画布
        paper.on('blank:pointerdown', function(event, x, y) {
            if (event.button == 0) {//判断是否点击鼠标左键
                var gapX = event.clientX;
                var gapY = event.clientY;
                var oldX = paper.options.origin.x;
                var oldY = paper.options.origin.y;
                umlDom.mousemove(movePaper);
                umlDom.mouseup(upPaper);
                umlDom.mouseleave(function () {
                    $("html").mouseup(upPaper);
                });
                function movePaper(event) {
                    paper.setOrigin((event.clientX - gapX) + oldX, oldY + (event.clientY - gapY));
                }
                function upPaper(event) {
                    umlDom.unbind("mousemove", movePaper);
                    umlDom.unbind("mouseup", upPaper);
                }
            }
        });
        paper.on('cell:mouseenter', function(cellView, evt) {
            if (!cellView.model.isLink() && thiz.attr("data-link") != undefined) {
                if (cellView.model.attributes.type == "uml.Quote") {
                    cellView.$el.removeAttr("class-magnet").css("cursor", "not-allowed");
                } else if (thiz.attr("data-link") == "generalization") {
                    var links = paper.model.getLinks();
                    var portUsed = _.find(links, function(link) {
                        var type = link.attributes.type;
                        var source = link.attributes.source.id;
                        return type == "uml.Generalization" && source == cellView.model.id
                    });
                    if (portUsed) {
                        cellView.$el.removeAttr("class-magnet").css("cursor", "not-allowed");
                    } else {
                        cellView.$el.attr("class-magnet",thiz.attr("data-link")).css("cursor", "crosshair");
                    }
                } else {
                    cellView.$el.attr("class-magnet",thiz.attr("data-link")).css("cursor", "crosshair");
                }
            }
        });
        paper.on('cell:mouseleave', function(cellView, evt) {
            if(!cellView.model.isLink()) {
                cellView.$el.removeAttr("class-magnet").removeAttr("style");
            }
        });
        paper.on('blank:pointerclick', function(event, x, y) {
            thiz.find(".relation-btn").removeClass("btn-active");
            thiz.removeAttr("data-link");
        });
        paper.on('blank:contextmenu', function(event, x, y) {
            thiz.find(".relation-btn").removeClass("btn-active");
            thiz.removeAttr("data-link");
        });
        var uml = {
            addClass: function (c, type) {
                var attributeSize = c.attributes == undefined ? 1 : c.attributes.length;
                var methodSize = c.methods == undefined ? 1 : c.methods.length;
                var cell;
                if (type == "class") {
                    jointUml.prototype.class.size = {
                        width: 150,
                        height: (attributeSize + methodSize) * 15 + 36
                    };
                    $.extend(c, jointUml.prototype.class);
                    cell = new joint.shapes.uml.Class(c);
                } else if (type == "interface") {
                    jointUml.prototype.interface.size = {
                        width: 150,
                        height: (attributeSize + methodSize) * 15 + 36
                    };
                    $.extend(c, jointUml.prototype.interface);
                    cell = new joint.shapes.uml.Interface(c);
                } else if (type == "abstract") {
                    jointUml.prototype.abstract.size = {
                        width: 150,
                        height: (attributeSize + methodSize) * 13 + 38
                    };
                    $.extend(c, jointUml.prototype.abstract);
                    cell = new joint.shapes.uml.Abstract(c);
                } else if (type == "quote") {
                    jointUml.prototype.quote.size = {
                        width: 150,
                        height: (attributeSize + methodSize) * 13 + 38
                    };
                    $.extend(c, jointUml.prototype.quote);
                    cell = new joint.shapes.uml.Quote(c);
                }
                if (c.id) {
                    var celOld = paper.model.getCell(c.id);
                    if (celOld) {
                        cell.attributes.position = celOld.attributes.position;
                        var cellOlds = paper.model.getCells();
                        var cells = [];
                        cells.push(cell);
                        $.each(cellOlds,function (index, cellTem){
                            if (cellTem.id != cell.id) {
                                cells.push(cellTem);
                            }
                        });
                        paper.model.resetCells(cells);
                        return cell;
                    }
                }
                paper.model.addCell(cell, c);
                return cell;
            },
            addLine: function (l, type) {
                var line;
                if (type == "extends") {
                    $.extend(l, jointUml.prototype.generalization);
                    line = new joint.shapes.uml.Generalization(l);
                } else if (type == "association") {
                    $.extend(l, jointUml.prototype.association);
                    line = new joint.shapes.uml.Association(l);
                } else if (type == "composition") {
                    $.extend(l, jointUml.prototype.composition);
                    line = new joint.shapes.uml.Composition(l);
                } else if (type == "implements") {
                    $.extend(l, jointUml.prototype.implements);
                    line = new joint.shapes.uml.Implementation(l);
                }
                graph.addCell(line);
                return line;
            },
            getGraph: function () {
                return paper.model;
            },
            getPaper: function () {
                return paper;
            },
            getCells: function () {
                return paper.model.getCells();
            },
            getClasses: function () {
                var cells = paper.model.getCells();
                var classes = [];
                $.each(cells,function (index, cell){
                    if (!cell.isLink()) {
                        classes.push(cell);
                    }
                });
                return classes;
            },
            getPaperX: function () {
              return paper.options.origin.x;
            },
            getPaperY: function () {
              return paper.options.origin.y;
            },
            getLines: function () {
                var cells = paper.model.getCells();
                var lines = [];
                $.each(cells,function (index, cell){
                    if (cell.isLink()) {
                        lines.push(cell);
                    }
                });
                return lines;
            }
        };
        return uml;
    }
})(jQuery);
//@ sourceURL=assets/jointjs/jointUml.js;