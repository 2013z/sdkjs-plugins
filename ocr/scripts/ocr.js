(function(window, undefined){

	var oLangMap = {};    
    oLangMap['chi_sim'] = "中文";
    oLangMap['eng'] = "英语";
    oLangMap['rus'] = "俄语";
    oLangMap['meme'] = "Meme";
    oLangMap['tha'] = "泰语";
    oLangMap['deu'] = "德语";
    oLangMap['jpn'] = "日语";
    oLangMap['spa'] = "西班牙语";
    oLangMap['fra'] = "法语";
    oLangMap['por'] = "葡萄牙语";
    oLangMap['ita'] = "意大利语";
    oLangMap['pol'] = "波兰语";
    oLangMap['tour'] = "土耳其语";
    oLangMap['nld'] = "荷兰语";
    oLangMap['ara'] = "阿拉伯语";
    oLangMap['ces'] = "捷克";
    oLangMap['kor'] = "韩语";
    oLangMap['swe'] = "瑞典语";
    oLangMap['vie'] = "越南语";
    oLangMap['ron'] = "罗马尼亚语";
    oLangMap['ell'] = "希腊语";
    oLangMap['eng'] = "印尼语";
    oLangMap['hun'] = "匈牙利语";
    oLangMap['and'] = "丹麦语";
    oLangMap['bul'] = "保加利亚语";
    oLangMap['fin'] = "芬兰语";
    oLangMap['nor'] = "挪威语";
    oLangMap['ukr'] = "乌克兰语";
    oLangMap['cat'] = "加泰罗尼亚语";
    oLangMap['hrv'] = "克罗地亚语";
    oLangMap['heb'] = "希伯来语";
    oLangMap['lit'] = "立陶宛语";
    oLangMap['slv'] = "斯洛文尼亚语";
    oLangMap['hin'] = "印地语";
    oLangMap['ben'] = "孟加拉语";
    oLangMap['tel'] = "泰卢固语";
    oLangMap['tam'] = "泰米尔语";
    oLangMap['kan'] = "卡纳达语";
    oLangMap['mal'] = "马拉雅拉姆语";
    oLangMap['date'] = "他加禄语";
    oLangMap['swa'] = "斯瓦希里语";
    oLangMap['aze'] = "阿塞拜疆";
    oLangMap['bell'] = "白俄罗斯";
    oLangMap['afr'] = "非洲人";
    oLangMap['sqi'] = "阿尔巴尼亚语";
    oLangMap['eus'] = "巴斯克语";
    oLangMap['epo'] = "世界语";
    oLangMap['est'] = "爱沙尼亚语";
    oLangMap['glg'] = "加利西亚语";
    oLangMap['isl'] = "冰岛语";
    oLangMap['lav'] = "拉脱维亚语";
    oLangMap['mkd'] = "马其顿";
    oLangMap['msa'] = "马来语";
    oLangMap['mlt'] = "马耳他语";
    oLangMap['grc'] = "古希腊语";
    oLangMap['chr'] = "切诺基";
    oLangMap['enm'] = "英文（旧）";
    oLangMap['frk'] = "法兰克人";
    oLangMap['equ'] = "数学";
    oLangMap['srp'] = "塞尔维亚语（拉丁语）";
    oLangMap['slk'] = "斯洛伐克语";

    window.oncontextmenu = function(e)
	{
		if (e.preventDefault)
			e.preventDefault();
		if (e.stopPropagation)
			e.stopPropagation();
		return false;
    };
    
    function escapeHtml(string) {
        var res = string;
        res = res.replace(/[\', \", \\,]/g, function (sSymbol) {
            return '\\' + sSymbol;
        });
        return res;
    }

    var arrParsedData = [];

    window.Asc.plugin.init = function(){
        $('#lang-select').select2({
            minimumResultsForSearch: Infinity
        });
        this.resizeWindow(592, 100, 592, 100, 592, 100);
        var nStartFilesCount = 0, arrImages;

        $( window ).resize(function(){
            updateScroll();
        });

        function updateScroll(){
            Ps.update();
        }
        var container = document.getElementById('scrollable-image-text-div');        
		Ps = new PerfectScrollbar("#" + container.id, {});
        $('#load-file-button-id').click(
          					
			function (e) {
				
				if (window["AscDesktopEditor"])
				{
					window["AscDesktopEditor"]["OpenFilenameDialog"]("images", true, function(files) {
                        arrImages = [];
                        
                        if (!Array.isArray(files)) // string detect
                            files = [files];

						if (files.length == 0)
							return;
						
						window.Asc.plugin.resizeWindow(800, 571, 800, 571);
						
						var oImagesContainer = document.getElementById('image-container-div');
						while (oImagesContainer.firstChild) {
							oImagesContainer.removeChild(oImagesContainer.firstChild);
						}
						var oTextContainer = document.getElementById('text-container-div');
						while (oTextContainer.firstChild) {
							oTextContainer.removeChild(oTextContainer.firstChild);
						}
						
						for (var i = 0; i < files.length; i++) 
						{
							var oImgElement = document.createElement('img');
							oImgElement.src = window["AscDesktopEditor"]["GetImageBase64"](files[i], false);
							oImgElement.style.width = '100%';
							oImgElement.style.marginBottom = "10px";
							arrImages.push(oImgElement);
							oImagesContainer.appendChild(oImgElement);
						}
						
						document.getElementById('lang-select').removeAttribute('disabled');
						document.getElementById('recognize-button').removeAttribute('disabled');
						nStartFilesCount = files.length;
						$('#status-label').text('');
						$('#scrollable-image-text-div').css('display', 'inline-block');
						updateScroll();
					});
					
					return;							
				}
			
                $('#images-input').click();
            }
        );				

        $('#images-input').change(function(e) {
            var arrFiles = e.target.files;
			//check for images in file list
			var arrFiles2 = [];
			for(var i = 0; i < arrFiles.length; ++i){
				if(arrFiles[i] && arrFiles[i].type && arrFiles[i].type.indexOf('image') === 0){
					arrFiles2.push(arrFiles[i]);
				}
				else{
					alert(arrFiles[i].name + "\nOCR 插件无法读取此文件。");
				}
			}
			arrFiles = arrFiles2;
            if(arrFiles.length > 0){
                window.Asc.plugin.resizeWindow(800, 571, 800, 571);

                var oImagesContainer = document.getElementById('image-container-div');
                while (oImagesContainer.firstChild) {
                    oImagesContainer.removeChild(oImagesContainer.firstChild);
                }
                var oTextContainer = document.getElementById('text-container-div');
                while (oTextContainer.firstChild) {
                    oTextContainer.removeChild(oTextContainer.firstChild);
                }
                arrParsedData.length = 0;
                var oFileReader = new FileReader();
                var nIndex = 0;
                arrImages = [];                
                $('#status-label').text('加载图片中');
                oFileReader.onloadend = function() {
                    var oImgElement = document.createElement('img');
                    oImgElement.src = oFileReader.result;
                    oImgElement.style.width = '100%';
                    arrImages.push(oImgElement);
                    oImagesContainer.appendChild(oImgElement);
                    ++nIndex;
                    if(nIndex < arrFiles.length){
                        oFileReader.readAsDataURL(arrFiles[nIndex]);
                        $(oImgElement).css("margin-bottom", "10px");
                    }
                    else{
                        document.getElementById('lang-select').removeAttribute('disabled');
                        document.getElementById('recognize-button').removeAttribute('disabled');
                        nStartFilesCount = arrImages.length;
                        $('#status-label').text('');
                        $('#scrollable-image-text-div').css('display', 'inline-block');

                    }
                    updateScroll();
                };
                oFileReader.readAsDataURL(arrFiles[nIndex]);
            }
        });
        $('#recognize-button').click(
            function () {

                var arrImagesCopy = [].concat(arrImages);
                for (var i = 0; i < arrImagesCopy.length; i++)
                {
                    if (arrImagesCopy[i] && (0 == arrImagesCopy[i].naturalWidth) && (0 == arrImagesCopy[i].naturalHeight))
                    {
                        arrImagesCopy.splice(i, 1);
                        i--;
                    }
                }
                if (0 == arrImagesCopy.length)
                    return;

                var oTextContainer = document.getElementById('text-container-div');
                while (oTextContainer.firstChild) {
                    oTextContainer.removeChild(oTextContainer.firstChild);
                }
                arrParsedData.length = 0;
                document.getElementById('recognize-button').setAttribute('disabled', '');
                document.getElementById('lang-select').setAttribute('disabled', '');
                document.getElementById('load-file-button-id').setAttribute('disabled', '');
                var fTesseractCall = function(){
                    Tesseract.recognize(arrImagesCopy.splice(0, 1)[0], {lang: $('#lang-select option:selected')[0].value}).progress(function (progress) {
                        if(progress && progress.status === "recognizing text"){
                            var nPercent =  (100*(progress.progress + nStartFilesCount - arrImagesCopy.length - 1)/nStartFilesCount) >> 0;
                            $('#status-label').text('Recognizing: '+ nPercent + '%');
                        }
                    }).catch(function(err){						
                                $('#status-label').text('');
                                document.getElementById('recognize-button').removeAttribute('disabled');
                                document.getElementById('lang-select').removeAttribute('disabled');
								document.getElementById('load-file-button-id').removeAttribute('disabled', '');
						
					}).then(function(result){						
						 document.getElementById('text-container-div').appendChild($(result.html)[0]);
                            arrParsedData.push(result);
                            updateScroll();
                            if(arrImagesCopy.length > 0){
                                fTesseractCall();
                            }
							else{								
                                $('#status-label').text('');
                                document.getElementById('recognize-button').removeAttribute('disabled');
                                document.getElementById('lang-select').removeAttribute('disabled');
								document.getElementById('load-file-button-id').removeAttribute('disabled', '');
							}
					});
                };
                $('#status-label').text('Recognizing: 0%');
                fTesseractCall();
            }
        );
    };

    window.Asc.plugin.onThemeChanged = function(theme)
    {
        window.Asc.plugin.onThemeChangedBase(theme);

        var rule = ".select2-container--default.select2-container--open .select2-selection__arrow b { border-color : " + window.Asc.plugin.theme["text-normal"] + " !important; }";
        var styleTheme = document.createElement('style');
        styleTheme.type = 'text/css';
        styleTheme.innerHTML = rule;
        document.getElementsByTagName('head')[0].appendChild(styleTheme);
    };

    window.Asc.plugin.button = function(id){
        if (id == 0){
            var sScript = '';
            sScript += 'var oDocument = Api.GetDocument();';
            sScript += '\nvar oParagraph, oRun, arrInsertResult = [], oTextPr;';

            for(var i = 0; i < arrParsedData.length; ++i){
                var oCurData = arrParsedData[i];
                for(var j = 0;  j < oCurData.paragraphs.length; ++j){
                    var oCurParagraph = oCurData.paragraphs[j];
                    sScript += '\noParagraph = Api.CreateParagraph();';
                    sScript += '\narrInsertResult.push(oParagraph);';

                    for(var t = 0; t < oCurParagraph.lines.length; ++t){
                        var oCurLine = oCurParagraph.lines[t];
                        if(t > 0 &&  t < oCurParagraph.lines.length - 1){
                            //sScript += '\noParagraph.AddLineBreak();';
                        }
                        for(var k = 0; k < oCurLine.words.length; ++k){
                            var oWord = oCurLine.words[k];
                            var sText = oWord.text + (k < oCurLine.words.length - 1 ? ' ' : '');
                            sText = escapeHtml(sText);
                            sScript += '\noRun = oParagraph.AddText(\'' + sText + '\');';
                            sScript += '\noTextPr = oRun.GetTextPr();';
                            var arrFontName = oWord.font_name.split('_');
                            var sFontName = '';
                            for(var s = 0; s < arrFontName.length; ++s ){
                                if(arrFontName[s] === 'Bold'){
                                    sScript += '\noTextPr.SetBold(true);';
                                }
                                else if(arrFontName[s] === 'Italic'){
                                    sScript += '\noTextPr.SetItalic(true);';
                                }
                                else if(arrFontName[s] === 'Strikeout'){
                                    sScript += '\noTextPr.SetStrikeout(true);';
                                }
                                else{

                                    if(sFontName != ''){
                                        sFontName += ' ';
                                    }
                                    sFontName += arrFontName[s];
                                }
                            }
                            sScript += '\noTextPr.SetFontFamily(\'' + sFontName + '\');';
                            sScript += '\noTextPr.SetFontSize(' + ((oWord.font_size * 5 )>> 0) + ');';
                        }
                    }
                }
            }
            sScript += '\noDocument.InsertContent(arrInsertResult);';
            window.Asc.plugin.info.recalculate = true;
            this.executeCommand("close", sScript);
        }
        else{
            this.executeCommand("close", "");
        }
    };


	window.Asc.plugin.onTranslate = function(){
		var elem = document.getElementById("label1");
		if (elem){
			elem.innerHTML = window.Asc.plugin.tr("Tesseract.js 可以识别(png, jpg)图片中的文本");
		}
		elem = document.getElementById("load-file-button-id");
		if (elem){
			elem.innerHTML = window.Asc.plugin.tr("上传图片");
		}	
		elem = document.getElementById("label2");
		if (elem){
			elem.innerHTML = window.Asc.plugin.tr("选择语言");
		}
		elem = document.getElementById("recognize-button");
		if (elem){
			elem.innerHTML = window.Asc.plugin.tr("识别");
		}
		elem = document.getElementById("lang-select");
		if(elem){
			var sInnerHtml = "";
			for(var key in oLangMap){
				if(oLangMap.hasOwnProperty(key)){
					sInnerHtml += "<option value = \'" + key + "'>" + window.Asc.plugin.tr(oLangMap[key]) + "</option>";
				}
			}
			elem.innerHTML = sInnerHtml;
		}
	};
	
	})(window, undefined);
