/* This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
Created by: Pascal Vyncke :: http://www.SeniorenNet.be */

// These are the variables; you can change these if you want
var standardStyle = '1'; // This is the number of your standard style sheet; this will be used when the user did not do anything.
var fontSizeCookie = 'tlc_wide_font_size'; // This is the name of the cookie that is used.
var urlToCSSDirectory = '../../includes/css/'; // This is the URL to your directory where your .css files are placed on your site.  For example: http://www.seniorennet.be/URL_TO_STYLESHEET_DIRECTORY_OF_YOUR_SITE/

// These are the names of your different .css files; use the name exactly as on your Web site
var ScreenCSS_1 = 'screen_1.css';
var ScreenCSS_2 = 'screen_2.css';
var ScreenCSS_3 = 'screen_3.css';

var theImages=new Array();

/***********************************************************************************************

	DO NOT CHANGE ANYTHING UNDER THIS LINE, UNLESS YOU KNOW WHAT YOU ARE DOING

***********************************************************************************************/

var fontSize = GetCookie(fontSizeCookie);
if (fontSize == null) {
	fontSize = standardStyle;
}

if(fontSize == "2"){
	document.write('<link id="font_size_css" rel="stylesheet" type"text/css" href="' + urlToCSSDirectory + ScreenCSS_2 + '" media="screen">');
}else if(fontSize == "3"){
	document.write('<link id="font_size_css" rel="stylesheet" type"text/css" href="' + urlToCSSDirectory + ScreenCSS_3 + '" media="screen">');
}else{
	document.write('<link id="font_size_css" rel="stylesheet" type"text/css" href="' + urlToCSSDirectory + ScreenCSS_1 + '" media="screen">');
}

function swapImage(imageId,newImage){
	var oldImage=document.getElementById(imageId).src;
	var imageRestore=oldImage.substring(oldImage.lastIndexOf("/")+1);
	document.getElementById(imageId).src=oldImage.substring(0,oldImage.lastIndexOf("/")+1)+newImage;
	for(var i=0;i<theImages.length;i++){
		if(theImages[i][0]==imageId){
			theImages[i][1]=imageRestore;
			return(true);
		}
	}
	theImages[theImages.length]=[imageId,imageRestore];
}

function restoreImage(imageId){
	for(var i=0;i<theImages.length;i++){
		if(theImages[i][0]==imageId){
			var oldImage=document.getElementById(imageId).src;
			document.getElementById(imageId).src=oldImage.substring(0,oldImage.lastIndexOf("/")+1)+theImages[i][1];
			return(true);
		}
	}
}

function setRestoreImage(imageId,restoreImage){
	for(var i=0;i<theImages.length;i++){
		if(theImages[i][0]==imageId){
			theImages[i][1]=restoreImage;
			return(true);
		}
	}
	theImages[theImages.length]=[imageId,restoreImage]
}

function restoreAll(){
	for(var i=0;i<theImages.length;i++){
		var oldImage=document.getElementById(theImages[i][0]).src;
		document.getElementById(theImages[i][0]).src=oldImage.substring(0,oldImage.lastIndexOf("/")+1)+theImages[i][1];
	}
}

function preLoadImage(theImage){
	var newImage=new Image();
	newImage.src=theImage;
}

function preLoadImages(imageArray){
	for(var i=0;i<imageArray.length;i++){
		var newImage=new Image();
		newImage.src=imageArray[i];
	}
}
function preloadImage(theImage){
	var newImage=new Image();
	newImage.src=theImage;
}

function preloadImages(imageArray){
	for(var i=0;i<imageArray.length;i++){
		var newImage=new Image();
		newImage.src=imageArray[i];
	}
}

function switchStyle(fontSize){
	SetCookie(fontSizeCookie,fontSize);
	var theStyle="";
	if(fontSize=="2"){
		theStyle=ScreenCSS_2;
		setRestoreImage("small","small_0.gif");
		setRestoreImage("medium","med_1.gif");
		setRestoreImage("large","large_0.gif");
		restoreAll();
	}else if(fontSize=="3"){
		theStyle=ScreenCSS_3;
		setRestoreImage("small","small_0.gif");
		setRestoreImage("medium","med_0.gif");
		setRestoreImage("large","large_1.gif");
		restoreAll();
	}else{
		theStyle=ScreenCSS_1;
		setRestoreImage("small","small_1.gif");
		setRestoreImage("medium","med_0.gif");
		setRestoreImage("large","large_0.gif");
		restoreAll();
	}
	document.getElementById("font_size_css").href=urlToCSSDirectory+theStyle;
}