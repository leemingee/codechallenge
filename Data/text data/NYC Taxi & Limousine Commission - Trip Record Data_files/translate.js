var translationCookie = 'simplicity_language_preference'; // This is the name of the cookie that is used.

var translationText=new Array();
translationText[translationText.length]=["ar","&#1575;&#1604;&#1578;&#1585;&#1580;&#1605;&#1577; &#1601;&#1610; &#1575;&#1604;&#1578;&#1602;&#1583;&#1605;"];
translationText[translationText.length]=["bg","&#1055;&#1088;&#1077;&#1074;&#1086;&#1076;&#1080; &#1074; &#1087;&#1088;&#1086;&#1094;&#1077;&#1089; &#1085;&#1072;"];
translationText[translationText.length]=["ca","Traducci&#243; en curs"];
translationText[translationText.length]=["zh-CN","&#32763;&#35793;&#20013;&#30340;&#36827;&#23637;"];
translationText[translationText.length]=["zh-TW","&#32763;&#35695;&#20013;&#30340;&#36914;&#23637;"];
translationText[translationText.length]=["hr","Prijevodi u tijeku"];
translationText[translationText.length]=["cs","P&#345;eklad v pokrok"];
translationText[translationText.length]=["da","Overs&#230;ttelse i gang"];
translationText[translationText.length]=["nl","Vertaling in progress"];
translationText[translationText.length]=["tl","Pagsasalin sa progreso"];
translationText[translationText.length]=["fi","K&#228;&#228;nt&#228;minen k&#228;ynniss&#228;"];
translationText[translationText.length]=["fr","Traduction en cours"];
translationText[translationText.length]=["de","&#220;bersetzung in progress"];
translationText[translationText.length]=["el","&#924;&#949;&#964;&#940;&#966;&#961;&#945;&#963;&#951; &#963;&#949; &#949;&#958;&#941;&#955;&#953;&#958;&#951;"];
translationText[translationText.length]=["iw","&#1489;&#1514;&#1492;&#1500;&#1497;&#1498; &#1514;&#1512;&#1490;&#1493;&#1501;"];
translationText[translationText.length]=["hi","&#2346;&#2381;&#2352;&#2327;&#2340;&#2367; &#2350;&#2375;&#2306; &#2309;&#2344;&#2369;&#2357;&#2366;&#2342;"];
translationText[translationText.length]=["id","Terjemahan dalam kemajuan"];
translationText[translationText.length]=["it","Traduzione in corso"];
translationText[translationText.length]=["ja","&#36914;&#34892;&#20013;&#12398;&#32763;&#35379;"];
translationText[translationText.length]=["ko","&#51652;&#54665;&#51473;&#51064; &#48264;&#50669;"];
translationText[translationText.length]=["lv","Tulko&#353;anas darbi"];
translationText[translationText.length]=["lt","Vertimo darbai"];
translationText[translationText.length]=["no","Oversettelse p&#229;g&#229;r"];
translationText[translationText.length]=["pl","T&#322;umaczenie w toku"];
translationText[translationText.length]=["pt","Tradu&#231;&#227;o em andamento"];
translationText[translationText.length]=["ro","Traducere &#238;n curs de"];
translationText[translationText.length]=["ru","&#1055;&#1077;&#1088;&#1077;&#1074;&#1086;&#1076; &#1074; &#1087;&#1088;&#1086;&#1075;&#1088;&#1077;&#1089;&#1089;"];
translationText[translationText.length]=["sr","&#1050;&#1083;&#1091;&#1073; &#1112;&#1077; &#1091; &#1090;&#1086;&#1082;&#1091;"];
translationText[translationText.length]=["sk","Preklad v pokrok"];
translationText[translationText.length]=["sl","Prevajanje je v teku"];
translationText[translationText.length]=["es","Traducci&#243;n en progreso"];
translationText[translationText.length]=["sv","&#214;vers&#228;ttning p&#229;g&#229;r"];
translationText[translationText.length]=["uk","&#1055;&#1077;&#1088;&#1077;&#1082;&#1083;&#1072;&#1076; &#1074; &#1087;&#1088;&#1086;&#1075;&#1088;&#1077;&#1089;"];
translationText[translationText.length]=["vi","Ng&#432;&#7901;i d&#7883;ch"];

function setLanguage(theLanguage){
	SetCookie(translationCookie,theLanguage); // TL
	var theURL=encodeURIComponent(document.location.href);
	top.location.href="http://translate.google.com/translate?u="+theURL+"&sl=en&tl="+theLanguage+"&hl=en&ie=UTF-8";
}

window.onload=function(){
	if(this.location.href.indexOf("tl=")==-1&&top.location!=this.location){
		top.location.href=this.location.href;
	}
};

if(this.location.href.indexOf("tl=")==-1&&top.location==this.location){
	if (getQuerystring("translate") == "off") {
		SetCookie(translationCookie,"");
		DeleteCookie(translationCookie);
	}
}

function showTranslate(){
	document.getElementById("shim").style.height=document.getElementById("translate_popup").offsetHeight;
	document.getElementById("shim").style.width=document.getElementById("translate_popup").offsetWidth;
	document.getElementById("translate_popup").style.top = 356;
	document.getElementById("translate_popup").style.visibility = "visible";
	document.getElementById("shim").style.top = document.getElementById("translate_popup").style.top;
	document.getElementById("shim").style.visibility = "visible";
}

function hideTranslate(){
	document.getElementById("translate_popup").style.visibility = "hidden";
	document.getElementById("shim").style.visibility = "hidden";
}


function resetLang() {
	var tmpURL = unescape(getQuerystring("u"));
	tmpURL = tmpURL.replace(/%3Ftranslate%3Doff/gi, "");
	tmpURL = tmpURL.replace(/\?translate=off/gi, "");
	top.location.href = tmpURL + "?translate=off";
}

function getQuerystring(key, default_)
{
  if (default_==null) default_="";
  key = key.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
  var regex = new RegExp("[\\?&]"+key+"=([^&#]*)");
  var qs = regex.exec(window.location.href);
  if(qs == null)
    return default_;
  else
    return qs[1];
} 

if ((window.location.href).indexOf("translate_c?hl=en") != -1) { //show simple nav
	document.getElementById("altnav").style.display = "block";
	document.getElementById("english_button").style.display='';
	document.getElementById("translate_button").style.display = 'none';
}