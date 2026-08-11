{
    function buildUI(thisObj) {
        var win = (thisObj instanceof Panel)
            ? thisObj
            : new Window("palette", "CzAEasy", undefined, {resizeable:true});

        win.orientation = "column";
        win.alignChildren = ["fill", "top"];
        win.spacing = 5;
        win.margins = 10;

        var mainContent = win.add("group");
        mainContent.orientation = "column";
        mainContent.alignChildren = ["fill", "top"];
        mainContent.alignment = ["fill", "fill"];
        mainContent.spacing = 5;
        mainContent.minimumSize = [0, 0];

        var inputGroup = mainContent.add("group");
        inputGroup.orientation = "row";
        inputGroup.alignment = ["fill", "top"];
        inputGroup.add("statictext", undefined, "Distance:");
        var distanceInput = inputGroup.add("edittext", undefined, "20");
        distanceInput.characters = 4;
        inputGroup.add("statictext", undefined, "Border:");
        var borderInput = inputGroup.add("edittext", undefined, "0");
        borderInput.characters = 4;

        var moveToBorderCheckbox = mainContent.add("checkbox", undefined, "Move to border");
        moveToBorderCheckbox.value = true;
        moveToBorderCheckbox.alignment = ["left", "top"];

        var tabbedPanel = mainContent.add("tabbedpanel");
        tabbedPanel.alignChildren = ["fill", "top"];
        tabbedPanel.alignment = ["fill", "fill"];
        tabbedPanel.minimumSize = [0, 0];

        var positionTab = tabbedPanel.add("tab", undefined, "Position");
        positionTab.orientation = "row";
        positionTab.alignChildren = ["left", "top"];
        positionTab.spacing = 10;
        positionTab.margins = 5;

        var btnSize = [45, 45];

        var squareGroup = positionTab.add("group");
        squareGroup.orientation = "column";
        squareGroup.alignChildren = ["center", "top"];
        squareGroup.alignment = ["left", "top"];
        squareGroup.spacing = 5;

        var rowTop = squareGroup.add("group");
        rowTop.orientation = "row";
        rowTop.spacing = 5;

        var rowMiddle = squareGroup.add("group");
        rowMiddle.orientation = "row";
        rowMiddle.spacing = 5;

        var rowBottom = squareGroup.add("group");
        rowBottom.orientation = "row";
        rowBottom.spacing = 5;

        var btnTopLeft = rowTop.add("button", undefined, "↖");
        btnTopLeft.preferredSize = btnSize;
        btnTopLeft.onClick = function() {
            var spacing = parseInt(distanceInput.text) || 20;
            var border = parseInt(borderInput.text) || 0;
            var moveToBorder = moveToBorderCheckbox.value;
            app.beginUndoGroup("Stack Top-Left");
            stackLayersCorner("topLeft", spacing, border, moveToBorder);
            app.endUndoGroup();
        }

        var btnTop = rowTop.add("button", undefined, "↑");
        btnTop.preferredSize = btnSize;
        btnTop.onClick = function() {
            var spacing = parseInt(distanceInput.text) || 20;
            var border = parseInt(borderInput.text) || 0;
            var moveToBorder = moveToBorderCheckbox.value;
            app.beginUndoGroup("Stack Top");
            stackLayersDirection("top", spacing, border, moveToBorder);
            app.endUndoGroup();
        }

        var btnTopRight = rowTop.add("button", undefined, "↗");
        btnTopRight.preferredSize = btnSize;
        btnTopRight.onClick = function() {
            var spacing = parseInt(distanceInput.text) || 20;
            var border = parseInt(borderInput.text) || 0;
            var moveToBorder = moveToBorderCheckbox.value;
            app.beginUndoGroup("Stack Top-Right");
            stackLayersCorner("topRight", spacing, border, moveToBorder);
            app.endUndoGroup();
        }

        var btnLeft = rowMiddle.add("button", undefined, "←");
        btnLeft.preferredSize = btnSize;
        btnLeft.onClick = function() {
            var spacing = parseInt(distanceInput.text) || 20;
            var border = parseInt(borderInput.text) || 0;
            var moveToBorder = moveToBorderCheckbox.value;
            app.beginUndoGroup("Stack Left");
            stackLayersDirection("left", spacing, border, moveToBorder);
            app.endUndoGroup();
        }

        var centerSpacer = rowMiddle.add("group");
        centerSpacer.preferredSize = btnSize;
        centerSpacer.minimumSize = btnSize;

        var btnRight = rowMiddle.add("button", undefined, "→");
        btnRight.preferredSize = btnSize;
        btnRight.onClick = function() {
            var spacing = parseInt(distanceInput.text) || 20;
            var border = parseInt(borderInput.text) || 0;
            var moveToBorder = moveToBorderCheckbox.value;
            app.beginUndoGroup("Stack Right");
            stackLayersDirection("right", spacing, border, moveToBorder);
            app.endUndoGroup();
        }

        var btnBottomLeft = rowBottom.add("button", undefined, "↙");
        btnBottomLeft.preferredSize = btnSize;
        btnBottomLeft.onClick = function() {
            var spacing = parseInt(distanceInput.text) || 20;
            var border = parseInt(borderInput.text) || 0;
            var moveToBorder = moveToBorderCheckbox.value;
            app.beginUndoGroup("Stack Bottom-Left");
            stackLayersCorner("bottomLeft", spacing, border, moveToBorder);
            app.endUndoGroup();
        }

        var btnBottom = rowBottom.add("button", undefined, "↓");
        btnBottom.preferredSize = btnSize;
        btnBottom.onClick = function() {
            var spacing = parseInt(distanceInput.text) || 20;
            var border = parseInt(borderInput.text) || 0;
            var moveToBorder = moveToBorderCheckbox.value;
            app.beginUndoGroup("Stack Bottom");
            stackLayersDirection("bottom", spacing, border, moveToBorder);
            app.endUndoGroup();
        }

        var btnBottomRight = rowBottom.add("button", undefined, "↘");
        btnBottomRight.preferredSize = btnSize;
        btnBottomRight.onClick = function() {
            var spacing = parseInt(distanceInput.text) || 20;
            var border = parseInt(borderInput.text) || 0;
            var moveToBorder = moveToBorderCheckbox.value;
            app.beginUndoGroup("Stack Bottom-Right");
            stackLayersCorner("bottomRight", spacing, border, moveToBorder);
            app.endUndoGroup();
        }

        var actionsGroup = positionTab.add("group");
        actionsGroup.orientation = "column";
        actionsGroup.alignChildren = ["fill", "top"];
        actionsGroup.alignment = ["fill", "top"];
        actionsGroup.spacing = 5;

        var btnAddPreset = actionsGroup.add("button", undefined, "Add preset at start");
        btnAddPreset.onClick = function() {
            var presetFile = File.openDialog("Select a .ffx preset file", "*.ffx");
            if (presetFile) {
                app.beginUndoGroup("Add preset at start");
                applyPresetAtStart(presetFile);
                app.endUndoGroup();
            }
        }

        var btnAddPresetAtCursor = actionsGroup.add("button", undefined, "Add preset at cursor");
        btnAddPresetAtCursor.onClick = function() {
            var presetFile = File.openDialog("Select a .ffx preset file", "*.ffx");
            if (presetFile) {
                app.beginUndoGroup("Add preset at cursor");
                applyPresetAtCursor(presetFile);
                app.endUndoGroup();
            }
        }

        var btnResetPosition = actionsGroup.add("button", undefined, "Reset position");
        btnResetPosition.onClick = function() {
            app.beginUndoGroup("Reset position");
            resetPositionsToCompCenter();
            app.endUndoGroup();
        }

        var btnRandomPos = actionsGroup.add("button", undefined, "Random position");
        btnRandomPos.onClick = function() {
            var border = parseInt(borderInput.text) || 0;
            app.beginUndoGroup("Random position");
            randomizePositions(border);
            app.endUndoGroup();
        }

        var squareHeight = (btnSize[1] * 3) + (squareGroup.spacing * 2);
        fitButtonHeights([btnAddPreset, btnAddPresetAtCursor, btnResetPosition, btnRandomPos], squareHeight, actionsGroup.spacing);

        var aeasyTab = tabbedPanel.add("tab", undefined, "Other");
        aeasyTab.orientation = "column";
        aeasyTab.alignChildren = ["fill", "top"];
        aeasyTab.spacing = 5;
        aeasyTab.margins = 5;

        var btnLink = aeasyTab.add("button", undefined, "Link selected layers (bottom to top)");
        btnLink.onClick = function () {
            app.beginUndoGroup("Link Layers");
            linkLayersBottomToTop();
            app.endUndoGroup();
        };

        var btnUnlink = aeasyTab.add("button", undefined, "Unlink all linked layers");
        btnUnlink.onClick = function () {
            app.beginUndoGroup("Unlink All Layers");
            unlinkAllLayers();
            app.endUndoGroup();
        };

        var btnB2 = aeasyTab.add("button", undefined, "Replace selected to inactives");
        btnB2.onClick = function () {
            app.beginUndoGroup("Auto Cut + b2 Replace on Selected");
            autoCutAndReplace();
            app.endUndoGroup();
        };

        fitButtonHeights([btnLink, btnUnlink, btnB2], squareHeight, aeasyTab.spacing);

        var footerGroup = win.add("group");
        footerGroup.orientation = "row";
        footerGroup.alignChildren = ["center", "center"];
        footerGroup.alignment = ["fill", "bottom"];
        footerGroup.margins = 0;
        footerGroup.spacing = 0;

        var versionText = footerGroup.add("statictext", undefined, "by Maxokie");
        versionText.alignment = ["center", "center"];
        var gray = [0.5, 0.5, 0.5, 1];
        versionText.graphics.foregroundColor = versionText.graphics.newPen(versionText.graphics.PenType.SOLID_COLOR, gray, 1);

        if (win instanceof Window) {
            win.center();
            win.show();
        }

        win.layout.layout(true);

        var footerHeight = footerGroup.size.height;
        footerGroup.minimumSize = [0, footerHeight];
        footerGroup.maximumSize = [10000, footerHeight];
        versionText.minimumSize = versionText.size;

        win.minimumSize = [0, 0];
        win.onResizing = win.onResize = function() {
            this.layout.resize();
        };

        return win;
    }

    function fitButtonHeights(buttons, totalHeight, spacing) {
        var innerHeight = totalHeight - (spacing * (buttons.length - 1));
        var baseHeight = Math.floor(innerHeight / buttons.length);
        var extra = innerHeight - (baseHeight * buttons.length);
        for (var i = 0; i < buttons.length; i++) {
            var height = baseHeight + (i < extra ? 1 : 0);
            buttons[i].preferredSize = [-1, height];
            buttons[i].minimumSize = [0, height];
            buttons[i].maximumSize = [10000, height];
        }
    }

    function stackLayersCorner(corner, spacing, border, moveToBorder) {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) return;

        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length < 2) return;

        var sortedLayers = [];
        for (var i = 0; i < selectedLayers.length; i++) {
            sortedLayers.push(selectedLayers[i]);
        }
        sortedLayers.sort(function(a, b) { return b.index - a.index; });

        var xDir = 0, yDir = 0;
        if (corner === "topLeft") { xDir = +1; yDir = +1; }
        else if (corner === "topRight") { xDir = -1; yDir = +1; }
        else if (corner === "bottomLeft") { xDir = +1; yDir = -1; }
        else { xDir = -1; yDir = -1; }

        var compLeft = 0 + border;
        var compTop = 0 + border;
        var compRight = comp.width - border;
        var compBottom = comp.height - border;

        var firstLayer = sortedLayers[0];
        if (!firstLayer.property("Position") || !firstLayer.property("Anchor Point")) return;
        var firstPos = firstLayer.property("Position").value;
        var firstAnchor = firstLayer.property("Anchor Point").value;
        var firstRect = firstLayer.sourceRectAtTime(comp.time, false);
        var firstLeft = firstPos[0] - firstAnchor[0] + firstRect.left;
        var firstTop = firstPos[1] - firstAnchor[1] + firstRect.top;
        var firstRight = firstLeft + firstRect.width;
        var firstBottom = firstTop + firstRect.height;

        for (var i = 0; i < sortedLayers.length; i++) {
            var layer = sortedLayers[i];
            if (layer.property("Position") && layer.property("Anchor Point")) {
                var pos = layer.property("Position");
                var anchor = layer.property("Anchor Point").value;
                var rect = layer.sourceRectAtTime(comp.time, false);

                var targetX, targetY;
                if (!moveToBorder && i === 0) {
                    continue;
                }

                if (!moveToBorder) {
                    if (corner === "topLeft") {
                        targetX = firstLeft + (spacing * i);
                        targetY = firstTop + (spacing * i);
                        pos.setValue([targetX + anchor[0] - rect.left, targetY + anchor[1] - rect.top]);
                    } else if (corner === "topRight") {
                        targetX = firstRight - (spacing * i);
                        targetY = firstTop + (spacing * i);
                        pos.setValue([targetX + anchor[0] - rect.left - rect.width, targetY + anchor[1] - rect.top]);
                    } else if (corner === "bottomLeft") {
                        targetX = firstLeft + (spacing * i);
                        targetY = firstBottom - (spacing * i);
                        pos.setValue([targetX + anchor[0] - rect.left, targetY + anchor[1] - rect.top - rect.height]);
                    } else {
                        targetX = firstRight - (spacing * i);
                        targetY = firstBottom - (spacing * i);
                        pos.setValue([targetX + anchor[0] - rect.left - rect.width, targetY + anchor[1] - rect.top - rect.height]);
                    }
                    continue;
                }

                if (corner === "topLeft") {
                    targetX = compLeft + (spacing * i);
                    targetY = compTop + (spacing * i);
                    pos.setValue([targetX + anchor[0] - rect.left, targetY + anchor[1] - rect.top]);
                } else if (corner === "topRight") {
                    targetX = compRight - (spacing * i);
                    targetY = compTop + (spacing * i);
                    pos.setValue([targetX + anchor[0] - rect.left - rect.width, targetY + anchor[1] - rect.top]);
                } else if (corner === "bottomLeft") {
                    targetX = compLeft + (spacing * i);
                    targetY = compBottom - (spacing * i);
                    pos.setValue([targetX + anchor[0] - rect.left, targetY + anchor[1] - rect.top - rect.height]);
                } else {
                    targetX = compRight - (spacing * i);
                    targetY = compBottom - (spacing * i);
                    pos.setValue([targetX + anchor[0] - rect.left - rect.width, targetY + anchor[1] - rect.top - rect.height]);
                }
            }
        }
    }

    function stackLayersDirection(direction, spacing, border, moveToBorder) {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) return;

        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length < 2) return;

        var sortedLayers = [];
        for (var i = 0; i < selectedLayers.length; i++) {
            sortedLayers.push(selectedLayers[i]);
        }
        sortedLayers.sort(function(a, b) { return b.index - a.index; });

        var firstLayer = sortedLayers[0];
        if (!firstLayer.property("Position") || !firstLayer.property("Anchor Point")) return;

        var firstPos = firstLayer.property("Position").value;
        var firstAnchor = firstLayer.property("Anchor Point").value;
        var firstRect = firstLayer.sourceRectAtTime(comp.time, false);
        var firstLeft = firstPos[0] - firstAnchor[0] + firstRect.left;
        var firstTop = firstPos[1] - firstAnchor[1] + firstRect.top;
        var firstRight = firstLeft + firstRect.width;
        var firstBottom = firstTop + firstRect.height;
        var firstCenterX = firstLeft + firstRect.width / 2;
        var firstCenterY = firstTop + firstRect.height / 2;

        var compLeft = 0 + border;
        var compTop = 0 + border;
        var compRight = comp.width - border;
        var compBottom = comp.height - border;
        var compCenterX = comp.width / 2;
        var compCenterY = comp.height / 2;

        for (var i = 0; i < sortedLayers.length; i++) {
            var layer = sortedLayers[i];
            if (layer.property("Position") && layer.property("Anchor Point")) {
                var pos = layer.property("Position");
                var anchor = layer.property("Anchor Point").value;
                var rect = layer.sourceRectAtTime(comp.time, false);
                var newPosX = pos.value[0];
                var newPosY = pos.value[1];

                if (direction === "top") {
                    var targetTop = (moveToBorder ? compTop : firstTop) + (spacing * i);
                    newPosY = targetTop + anchor[1] - rect.top;
                    newPosX = (moveToBorder ? compCenterX : firstCenterX) + anchor[0] - (rect.left + rect.width / 2);
                } else if (direction === "bottom") {
                    var targetBottom = (moveToBorder ? compBottom : firstBottom) - (spacing * i);
                    newPosY = targetBottom + anchor[1] - rect.top - rect.height;
                    newPosX = (moveToBorder ? compCenterX : firstCenterX) + anchor[0] - (rect.left + rect.width / 2);
                } else if (direction === "left") {
                    var targetLeft = (moveToBorder ? compLeft : firstLeft) + (spacing * i);
                    newPosX = targetLeft + anchor[0] - rect.left;
                    newPosY = (moveToBorder ? compCenterY : firstCenterY) + anchor[1] - (rect.top + rect.height / 2);
                } else {
                    var targetRight = (moveToBorder ? compRight : firstRight) - (spacing * i);
                    newPosX = targetRight + anchor[0] - rect.left - rect.width;
                    newPosY = (moveToBorder ? compCenterY : firstCenterY) + anchor[1] - (rect.top + rect.height / 2);
                }

                pos.setValue([newPosX, newPosY]);
            }
        }
    }

    function applyPresetAtStart(presetFile) {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) return;

        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 0) return;

        var originalTime = comp.time;
        var layersArray = [];
        for (var i = 0; i < selectedLayers.length; i++) {
            layersArray.push(selectedLayers[i]);
        }

        for (var i = 0; i < layersArray.length; i++) {
            var layer = layersArray[i];
            try {
                for (var j = 0; j < layersArray.length; j++) {
                    layersArray[j].selected = false;
                }
                layer.selected = true;
                comp.time = layer.inPoint;
                layer.applyPreset(presetFile);
            } catch (e) {
                alert("Error applying preset to layer: " + layer.name + "\n" + e.toString());
            }
        }

        for (var i = 0; i < layersArray.length; i++) {
            layersArray[i].selected = true;
        }
        comp.time = originalTime;
    }

    function applyPresetAtCursor(presetFile) {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) return;

        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 0) return;

        var originalTime = comp.time;
        var layersArray = [];
        for (var i = 0; i < selectedLayers.length; i++) {
            layersArray.push(selectedLayers[i]);
        }

        for (var i = 0; i < layersArray.length; i++) {
            var layer = layersArray[i];
            try {
                for (var j = 0; j < layersArray.length; j++) {
                    layersArray[j].selected = false;
                }
                layer.selected = true;
                comp.time = originalTime;
                layer.applyPreset(presetFile);
            } catch (e) {
                alert("Error applying preset to layer: " + layer.name + "\n" + e.toString());
            }
        }

        for (var i = 0; i < layersArray.length; i++) {
            layersArray[i].selected = true;
        }
        comp.time = originalTime;
    }

    function resetPositionsToCompCenter() {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) return;

        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 0) return;

        var centerX = comp.width / 2;
        var centerY = comp.height / 2;

        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            var pos = layer.property("Position");
            var anchor = layer.property("Anchor Point");
            if (anchor) {
                var rect = layer.sourceRectAtTime(comp.time, false);
                var anchorX = rect.left + rect.width / 2;
                var anchorY = rect.top + rect.height / 2;
                anchor.setValue([anchorX, anchorY]);
            }
            if (pos) {
                pos.setValue([centerX, centerY]);
            }
        }
    }

    function randomBetween(minValue, maxValue) {
        return minValue + (Math.random() * (maxValue - minValue));
    }

    function randomizePositions(border) {
        var comp = app.project.activeItem;
        if (!comp || !(comp instanceof CompItem)) return;

        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length === 0) return;

        var compLeft = 0 + border;
        var compTop = 0 + border;
        var compRight = comp.width - border;
        var compBottom = comp.height - border;
        var compCenterX = comp.width / 2;
        var compCenterY = comp.height / 2;

        for (var i = 0; i < selectedLayers.length; i++) {
            var layer = selectedLayers[i];
            var pos = layer.property("Position");
            if (!pos) continue;

            var posValue = pos.value;
            var zValue = (posValue.length > 2) ? posValue[2] : null;
            var newX = posValue[0];
            var newY = posValue[1];

            try {
                if (layer instanceof AVLayer && layer.sourceRectAtTime) {
                    var anchor = layer.property("Anchor Point");
                    var anchorValue = anchor ? anchor.value : [0, 0];
                    var rect = layer.sourceRectAtTime(comp.time, false);

                    var minX = compLeft + anchorValue[0] - rect.left;
                    var maxX = compRight + anchorValue[0] - rect.left - rect.width;
                    var minY = compTop + anchorValue[1] - rect.top;
                    var maxY = compBottom + anchorValue[1] - rect.top - rect.height;

                    if (minX <= maxX) {
                        newX = randomBetween(minX, maxX);
                    } else {
                        newX = compCenterX;
                    }

                    if (minY <= maxY) {
                        newY = randomBetween(minY, maxY);
                    } else {
                        newY = compCenterY;
                    }
                } else {
                    newX = randomBetween(compLeft, compRight);
                    newY = randomBetween(compTop, compBottom);
                }
            } catch (e) {
                newX = randomBetween(compLeft, compRight);
                newY = randomBetween(compTop, compBottom);
            }

            var useKeyframe = pos.canVaryOverTime && pos.isTimeVarying;
            if (zValue !== null) {
                if (useKeyframe) {
                    pos.setValueAtTime(comp.time, [newX, newY, zValue]);
                } else {
                    pos.setValue([newX, newY, zValue]);
                }
            } else {
                if (useKeyframe) {
                    pos.setValueAtTime(comp.time, [newX, newY]);
                } else {
                    pos.setValue([newX, newY]);
                }
            }
        }
    }

    function linkLayersBottomToTop() {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("Please select a Composition first!");
            return;
        }
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length < 2) {
            alert("Select at least 2 layers!");
            return;
        }
        for (var i = selectedLayers.length - 1; i > 0; i--) {
            selectedLayers[i].parent = selectedLayers[i - 1];
        }
    }

    function unlinkAllLayers() {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) return;
        for (var i = 1; i <= comp.numLayers; i++) {
            if (comp.layer(i).parent !== null) comp.layer(i).parent = null;
        }
    }

    function autoCutAndReplace() {
        var comp = app.project.activeItem;
        if (!(comp instanceof CompItem)) {
            alert("Please select a Composition first!");
            return;
        }

        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length < 2) {
            alert("Select at least 2 layers (one '_b1' layer and one overlapping layer)!");
            return;
        }

        var sortedLayers = [];
        for (var i = 0; i < selectedLayers.length; i++) {
            sortedLayers.push(selectedLayers[i]);
        }

        sortedLayers.sort(function(a, b) { return a.index - b.index; });

        for (var i = sortedLayers.length - 1; i >= 0; i--) {
            var layer = sortedLayers[i];
            if (!(layer instanceof AVLayer)) continue;

            if (layer.name.indexOf("_b1") !== -1) {
                for (var j = i - 1; j >= 0; j--) {
                    var upper = sortedLayers[j];
                    if (!(upper instanceof AVLayer)) continue;

                    if (upper.inPoint >= layer.inPoint && upper.inPoint < layer.outPoint) {

                        var originalIndex = layer.index;
                        layer.splitLayer(upper.inPoint);

                        var newPart = comp.layer(originalIndex);
                        var newName = newPart.name.replace("_b1", "_b2");

                        var item = findFootageByName(newName);
                        if (item) {
                            newPart.replaceSource(item, false);
                        }
                        newPart.name = newName;
                    }
                }
            }
        }
    }

    function findFootageByName(name) {
        for (var i = 1; i <= app.project.numItems; i++) {
            if (app.project.item(i).name === name) {
                return app.project.item(i);
            }
        }
        return null;
    }

    var myPanel = buildUI(this);
}
