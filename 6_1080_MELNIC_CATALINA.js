var svgns = "http://www.w3.org/2000/svg";

var svg;
var coord_initiale;
var rect;
var btnRect;
var btnMove;
var btnLine;
var btnCircle;
var btnText;
var btnClear;
var btnSelect;
var selectedElement = false;
var btnEdit;

function screenToSVGCoords(svg, e) {
    // Read the SVG's bounding rectangle...
    var svgRect = document.getElementById("svg").getBoundingClientRect();
    // ...and transform clientX / clientY to be relative to that rectangle
    return {
        x: e.clientX - svgRect.x,
        y: e.clientY - svgRect.y
    }
}

function init() {
    svg = $("#svg");
    btnRect = $(".btn-rect");
    btnMove = $(".btn-move")
    btnLine = $(".btn-line");
    btnCircle = $(".btn-circle");
    btnText = $(".btn-text");
    btnClear = $(".btn-clear");
    btnSelect = $(".btn-select");
    btnEdit = $(".btn-edit");
}
function drawSelectRect(el) {
    var rectBBox = el.getBBox()
    var rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute('x', rectBBox.x - 2);
    rect.setAttribute('y', rectBBox.y - 2);
    rect.setAttribute('height', rectBBox.height + 4);
    rect.setAttribute('width', rectBBox.width + 4);
    rect.setAttribute('class', 'stroke-blue');

    rect.setAttribute('fill', '#044B94');
    rect.setAttribute('fill-opacity', '0.0');
    document.getElementById('svg').appendChild(rect);

}

function removeSVgElement(el) {
    document.getElementById('svg').removeChild(el);
}

function removeSelectRect() {
    var oldRect = document.getElementsByClassName('stroke-blue');
    if (oldRect.length > 0)
        removeSVgElement(oldRect[0]);
}

$(document).ready(function () {
    init();

    btnRect.on("click", function (ev) {
        ev.preventDefault();
        $(".div-svg").attr("contenteditable", "false");
        svg.off();

        svg.on("mousedown", function (e) {
            coord_initiale = screenToSVGCoords(svg, e);
            rect = document.createElementNS(svgns, 'rect');

            svg.on("mousemove", function (e) {
                var coord_curente = screenToSVGCoords(svg, e);

                var x = Math.min(coord_initiale.x, coord_curente.x);
                var y = Math.min(coord_initiale.y, coord_curente.y);

                var width = Math.abs(coord_curente.x - coord_initiale.x);
                var height = Math.abs(coord_curente.y - coord_initiale.y);

                rect.setAttribute('x', x);
                rect.setAttribute('y', y);
                rect.setAttribute('width', width);
                rect.setAttribute('height', height);
                rect.setAttribute('fill', '#fff');
                rect.setAttribute('stroke-width', '3');
                rect.setAttribute('stroke', '#000');
                rect.setAttribute('class', 'movable');

                document.getElementById('svg').appendChild(rect);
            });

            svg.on("mouseup", function (e) {
                // document.getElementById('svg').appendChild(rect);
                svg.off("mousemove")
                // $("#" + (id--)).on("click", function (ev) {

                // })
            });
        });
    });

    btnLine.on("click", function (ev) {
        ev.preventDefault();
        $(".div-svg").attr("contenteditable", "false");
        svg.off();

        svg.on("mousedown", function (e) {
            coord_initiale = screenToSVGCoords(svg, e);
            line = document.createElementNS(svgns, 'line');

            svg.on("mousemove", function (e) {
                var coord_curente = screenToSVGCoords(svg, e);

                var x1 = coord_initiale.x;
                var y1 = coord_initiale.y;

                var x2 = coord_curente.x;
                var y2 = coord_curente.y;

                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
                line.setAttribute("stroke", "black")
                line.setAttribute("stroke-width", "3")
                line.setAttribute('class', 'movable');

                document.getElementById('svg').appendChild(line);
            });

            svg.on("mouseup", function (e) {
                // document.getElementById('svg').appendChild(rect);
                svg.off("mousemove")
                // $("#" + (id--)).on("click", function (ev) {

                // })
            });
        });
    });

    btnCircle.on("click", function (ev) {
        ev.preventDefault();
        svg.off();

        $(".div-svg").attr("contenteditable", "false");

        svg.on("mousedown", function (e) {
            coord_initiale = screenToSVGCoords(svg, e);
            circle = document.createElementNS(svgns, 'ellipse');

            svg.on("mousemove", function (e) {
                var coord_curente = screenToSVGCoords(svg, e);

                var x1 = coord_initiale.x;
                var y1 = coord_initiale.y;

                var x2 = coord_curente.x;
                var y2 = coord_curente.y;

                var centerx = (x2 + x1) / 2;
                var centery = (y2 + y1) / 2;

                var rx = Math.abs((x2 - x1) / 2);
                var ry = Math.abs((y2 - y1) / 2);

                circle.setAttribute('cx', centerx);
                circle.setAttribute('cy', centery);
                circle.setAttribute('rx', rx);
                circle.setAttribute('ry', ry);
                circle.setAttribute('fill', '#fff');
                circle.setAttribute('stroke', 'black');
                circle.setAttribute('stroke-width', '3');
                circle.setAttribute('class', 'movable');

                document.getElementById('svg').appendChild(circle);
            });

            svg.on("mouseup", function (e) {
                // document.getElementById('svg').appendChild(rect);
                svg.off("mousemove")
                // $("#" + (id--)).on("click", function (ev) {

                // })
            });
        });
    });

    btnText.on("click", function (ev) {
        ev.preventDefault();
        svg.off();

        $(".div-svg").attr("contenteditable", "false");

        svg.on("mousedown", function (e) {
            var txtElem = document.createElementNS(svgns, "text");
            coord_initiale = screenToSVGCoords(svg, e);
            var x = coord_initiale.x;
            var y = coord_initiale.y;

            txtElem.setAttributeNS(null, "x", x);
            txtElem.setAttributeNS(null, "y", y);
            txtElem.setAttributeNS(null, "font-size", 20);
            txtElem.setAttribute('class', 'movable');

            var helloTxt = document.createTextNode("Text");
            txtElem.appendChild(helloTxt)

            document.getElementById("svg").appendChild(txtElem);
        });
    })

    btnMove.on("click", function (ev) {
        ev.preventDefault();
        svg.off();

        var transform;

        svg.on('mousedown', startDrag);
        svg.on('mousemove', drag);
        svg.on('mouseup', endDrag);
        svg.on('mouseleave', endDrag);

        function startDrag(ev) {
            if (ev.target.classList.contains('movable')) {
                selectedElement = ev.target;
                drawSelectRect(ev.target);

                coord_initiale = screenToSVGCoords(svg, ev);

                // Get all the transforms currently on this element
                var transforms = selectedElement.transform.baseVal;
                // Ensure the first transform is a translate transform
                if (transforms.length === 0 ||
                    transforms.getItem(0).type !== SVGTransform.SVG_TRANSFORM_TRANSLATE) {
                    // Create an transform that translates by (0, 0)
                    var translate = document.getElementById("svg").createSVGTransform();
                    translate.setTranslate(0, 0);
                    // Add the translation to the front of the transforms list
                    selectedElement.transform.baseVal.insertItemBefore(translate, 0);
                }
                // Get initial translation amount
                transform = transforms.getItem(0);
                coord_initiale.x -= transform.matrix.e;
                coord_initiale.y -= transform.matrix.f;
            }
        }

        function drag(ev) {
            if (selectedElement) {
                ev.preventDefault();
                var coord = screenToSVGCoords(svg, ev);
                transform.setTranslate(coord.x - coord_initiale.x, coord.y - coord_initiale.y);
            }
        }

        function endDrag(ev) {
            selectedElement = null;
        }
    })

    btnSelect.on("click", function (ev) {
        ev.preventDefault();
        svg.off();

        svg.on("mousedown", function (ev) {
            if (ev.target.classList.contains('movable')) {
                selectedElement = ev.target;
            }

            removeSelectRect();
            drawSelectRect(ev.target);
        })
    })

    btnEdit.on("click", function (ev) {
        ev.preventDefault();
        svg.off();

        $(".div-svg").attr("contenteditable", "true");
    })

    btnClear.on("click", function (ev) {
        svg.empty();
    })
    $(document).on('keydown', function (e) {
        if (e.code === "Delete") {
            if (selectedElement) {
                removeSVgElement(selectedElement);
                removeSelectRect();
                selectedElement = null;
            }
        }
    })

    $(".btn").on("click", function (ev) {
        ev.preventDefault();
        removeSelectRect();

    })
});