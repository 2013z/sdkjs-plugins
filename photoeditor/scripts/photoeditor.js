
var oImage = false;
var imageEditor = null;
var themeStyle = null;

(function(window, undefined){

    window.Asc.plugin.onThemeChanged = function (theme) {

        var head  = document.getElementsByTagName('head')[0];
        var link  = document.createElement('link');
        link.rel  = 'stylesheet';
        link.type = 'text/css';
        link.media = 'all';

        if(theme.type === "dark") {
            themeStyle = blackTheme;
            link.href = './style/black-theme.css';
        } else {
            themeStyle = whiteTheme;
            link.href = './style/white-theme.css';
        }
        head.appendChild(link);
    };

var translationDone = false;
var initializationDone = false;
var language = null;

    window.Asc.plugin.onTranslate = function () {
        language = {
            'Grayscale': window.Asc.plugin.tr("灰度"),
            'Sepia': window.Asc.plugin.tr("褐色"),
            'Blur': window.Asc.plugin.tr("模糊"),
            'Emboss': window.Asc.plugin.tr("浮雕"),
            'Invert': window.Asc.plugin.tr("反转"),
            'Sepia2': window.Asc.plugin.tr("褐色2"),
            'Sharpen': window.Asc.plugin.tr("锐化"),
            'Remove White': window.Asc.plugin.tr("去除白色"),
            'Threshold': window.Asc.plugin.tr("阈值"),
            'Distance': window.Asc.plugin.tr("距离"),
            'Gradient transparency': window.Asc.plugin.tr("渐变透明度"),
            'Value': window.Asc.plugin.tr("值"),
            'Brightness': window.Asc.plugin.tr("亮度"),
            'Noise': window.Asc.plugin.tr("马赛克"),
            'Pixelate': window.Asc.plugin.tr("像素"),
            'Color Filter': window.Asc.plugin.tr("滤色器"),
            'Tint': window.Asc.plugin.tr("着色"),
            'Multiply': window.Asc.plugin.tr("倍增"),
            'Blend': window.Asc.plugin.tr("混合"),
            'Filter': window.Asc.plugin.tr("筛选"),
            'Mask': window.Asc.plugin.tr("蒙版"),
            'Text': window.Asc.plugin.tr("文本"),
            'Icon': window.Asc.plugin.tr("图标"),
            'Shape': window.Asc.plugin.tr("形状"),
            'Draw': window.Asc.plugin.tr("画笔"),
            'Rotate': window.Asc.plugin.tr("旋转"),
            'Flip': window.Asc.plugin.tr("翻转"),
            'Flip X': window.Asc.plugin.tr("翻转 X"),
            'Flip Y': window.Asc.plugin.tr("翻转 Y"),
            'Crop': window.Asc.plugin.tr("裁剪"),
            'Delete-all': window.Asc.plugin.tr("全部删除"),
            'Delete': window.Asc.plugin.tr("删除"),
            'Reset': window.Asc.plugin.tr("重置"),
            'Redo': window.Asc.plugin.tr("重做"),
            'Undo': window.Asc.plugin.tr("撤销"),
            'Load Mask Image': window.Asc.plugin.tr("加载蒙版图像"),
            'Apply': window.Asc.plugin.tr("应用"),
            'Cancel': window.Asc.plugin.tr("取消"),
            'Bold': window.Asc.plugin.tr("加粗"),
            'Italic': window.Asc.plugin.tr("斜体"),
            'Underline': window.Asc.plugin.tr("删除线"),
            'Left': window.Asc.plugin.tr("左对齐"),
            'Center': window.Asc.plugin.tr("居中"),
            'Right': window.Asc.plugin.tr("右对齐"),
            'Color': window.Asc.plugin.tr("颜色"),
            'Text size': window.Asc.plugin.tr("字体大小"),
            'Arrow': window.Asc.plugin.tr("箭头"),
            'Arrow-1': window.Asc.plugin.tr("箭头-1"),
            'Arrow-2': window.Asc.plugin.tr("箭头-2"),
            'Star': window.Asc.plugin.tr("星标"),
            'Star-1': window.Asc.plugin.tr("星标-1"),
            'Star-2': window.Asc.plugin.tr("星标-2"),
            'Polygon': window.Asc.plugin.tr("多边形"),
            'Location': window.Asc.plugin.tr("位置"),
            'Heart': window.Asc.plugin.tr("爱心"),
            'Bubble': window.Asc.plugin.tr("气泡"),
            'Custom icon': window.Asc.plugin.tr("自定义图标"),
            'Rectangle': window.Asc.plugin.tr("矩形"),
            'Circle': window.Asc.plugin.tr("圆形"),
            'Triangle': window.Asc.plugin.tr("三角形"),
            'Fill': window.Asc.plugin.tr("填满"),
            'Stroke': window.Asc.plugin.tr("描边"),
            'Free': window.Asc.plugin.tr("自由"),
            'Straight': window.Asc.plugin.tr("直线"),
            'Range': window.Asc.plugin.tr("范围"),
            'Custom': window.Asc.plugin.tr("自定义"),
            'Square': window.Asc.plugin.tr("方块")
        };

        CreateImageEditor();
        translationDone = true;
    };

    window.Asc.plugin.init = function (sHtml) {

        oImage = $(sHtml)[0];
        if (!oImage || !$(oImage).is('img')) {
            oImage = $(sHtml).find('img')[0];
        }
        if (!oImage) {
            oImage = document.createElement("img");
            //white rect
            oImage.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAAEsCAIAAAD2HxkiAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAMrSURBVHhe7dMxAQAADMOg+TfdycgDHrgBKQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJISYhBCTEGISQkxCiEkIMQkhJiHEJITU9vSZzteUMFOrAAAAAElFTkSuQmCC';
            oImage.width = 300;
            oImage.height = 300;
        }

        CreateImageEditor();
        initializationDone = true;

        var imageHeight = null;
        oImage.height > 500 ? imageHeight = 500 : imageHeight = oImage.height;
        window.Asc.plugin.resizeWindow(undefined, undefined, 870, imageHeight + 300, 0, 0);
    };

    window.Asc.plugin.button = function (id) {

        if (id == 0) {
            if (imageEditor.getDrawingMode() === 'CROPPER') {
                var imageData = imageEditor.crop(imageEditor.getCropzoneRect()).then(function () {
                        saveImage();
                    }
                );
            } else {
                saveImage();
            }
        } else {
            this.executeCommand("close", "");
        }
    };

    function CreateImageEditor() {

        if (initializationDone == true || translationDone == true) {
            imageEditor = new tui.ImageEditor('#tui-image-editor-container', {

                includeUI: {
                    loadImage: {

                        path: oImage.src,
                        name: 'Image'
                    },
                    theme: themeStyle,
                    initMenu: 'filter',
                    menuBarPosition: 'bottom',
                    locale: language,
                },
                cssMaxWidth: 700,
                cssMaxHeight: 500,
            });
        }
    }

    window.saveImage = function () {

        Asc.scope.dataURL = imageEditor.toDataURL();
        var editorDimension = imageEditor.getCanvasSize();
        Asc.scope.editorDimensionWidth = editorDimension.width;
        Asc.scope.editorDimensionHeight = editorDimension.height;
        var saveImage = createScript();
    }

    window.createScript = function () {

        switch (window.Asc.plugin.info.editorType) {
            case 'word': {
                window.Asc.plugin.callCommand(function () {
                    var oDocument = Api.GetDocument();
                    var oParagraph, oRun, arrInsertResult = [], oImage;
                    oParagraph = Api.CreateParagraph();
                    arrInsertResult.push(oParagraph);
                    var nEmuWidth = ((Asc.scope.editorDimensionWidth / 96) * 914400 + 0.5) >> 0;
                    var nEmuHeight = ((Asc.scope.editorDimensionHeight / 96) * 914400 + 0.5) >> 0;
                    oImage = Api.CreateImage(Asc.scope.dataURL, nEmuWidth, nEmuHeight);
                    oParagraph.AddDrawing(oImage);
                    oDocument.InsertContent(arrInsertResult);
                }, true);
                break;

            }
            case 'cell': {
                window.Asc.plugin.callCommand(function () {
                    var oWorksheet = Api.GetActiveSheet();
                    var nEmuWidth = ((Asc.scope.editorDimensionWidth / 96) * 914400 + 0.5) >> 0;
                    var nEmuHeight = ((Asc.scope.editorDimensionHeight / 96) * 914400 + 0.5) >> 0;
                    oWorksheet.ReplaceCurrentImage(Asc.scope.dataURL, nEmuWidth, nEmuHeight);
                }, true);
                break;
            }
            case 'slide': {
                window.Asc.plugin.callCommand(function () {
                    var oPresentation = Api.GetPresentation();
                    var nEmuWidth = ((Asc.scope.editorDimensionWidth / 96) * 914400 + 0.5) >> 0;
                    var nEmuHeight = ((Asc.scope.editorDimensionHeight / 96) * 914400 + 0.5) >> 0;
                    oPresentation.ReplaceCurrentImage(Asc.scope.dataURL, nEmuWidth, nEmuHeight);
                }, true);
                break;
            }

        }
    };
	
})(window, undefined);
