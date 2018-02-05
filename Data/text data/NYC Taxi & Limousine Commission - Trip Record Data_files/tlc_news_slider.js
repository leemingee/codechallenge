////// Do Not Edit Below This Line ////// 

var totalDiv = tlcnews.length;
var hScrollerWidth = "168px";
var hScrollerHeight = "220px";
var scrollSpeed = "10";
var scrollDelay = "10";
var currentPosition = 0;
var inProgress = false;
var urlCheck = true;
var divName = "contentdiv";
var hScrollerLayers = new Array();
var objPage = null;
var objPage1 = null;
var oldPosition = 0;
var news_switchdelay = 5000 // 5000 ms = 5 sec
var news_running = false;
var newstimeout;




function startnews(){
	// make sure function doesn't run twice
	if (news_running == true) { return; }
	if (inProgress == true) { return; }
		news_running=true;

	newstimeout=setTimeout("scrollNext()",news_switchdelay);
}

function stopnews() {
	clearTimeout(newstimeout);
	switch_stopped = false;
}



function scrollPrevious() {
	if (inProgress == true) { return; }
	stopnews();
	oldPosition=currentPosition;
	if (currentPosition == 0) {
		moveLayer(hScrollerLayers[0], hScrollerLayers[hScrollerLayers.length - 1], "right");
		currentPosition = hScrollerLayers.length - 1;
    	//switchClass();	

	} else {
		moveLayer(hScrollerLayers[currentPosition], hScrollerLayers[currentPosition - 1], "right");
		currentPosition = currentPosition - 1;
    	//switchClass();	

	}
	itemStatus();
	newstimeout=setTimeout("scrollNext()",news_switchdelay);

}

function scrollNext() {
	if (inProgress == true) { return; }
	stopnews();
	oldPosition=currentPosition;

	if (currentPosition == hScrollerLayers.length - 1) {
	  moveLayer(hScrollerLayers[hScrollerLayers.length - 1], hScrollerLayers[0], "left");
	  currentPosition = 0;
   	  //switchClass();	
 
	} else {
	  moveLayer(hScrollerLayers[currentPosition], hScrollerLayers[currentPosition + 1], "left");
	  currentPosition = currentPosition + 1;
   	 // switchClass();	

	}
	itemStatus();
	newstimeout=setTimeout("scrollNext()",news_switchdelay);

}

function itemStatus() {
	var status = currentPosition + 1;
	var statuaTotal = hScrollerLayers.length;
	document.getElementById("itemStatus").innerHTML = '<span>' + status + '/' + statuaTotal + '</span>';
}


function skipTo(which) {
	if (inProgress == true) { return; }
	oldLayer = document.getElementById(hScrollerLayers[currentPosition]);
	newLayer = document.getElementById(hScrollerLayers[which - 1]);
	
	oldPosition=currentPosition;
	if (oldLayer == newLayer){
		if (inProgress == true) { return; }
		return;
	}

	inProgress = true;
	oldLayer.style.left = 0;
	newLayer.style.left = "-" + spx(hScrollerWidth);
	moveLayerRight(oldLayer.id, newLayer.id);
	currentPosition = which - 1;
	switchClass();	
}

function moveLayer(whichLayer, nextLayer, leftOrRight) {
	oldLayer = document.getElementById(whichLayer);
	newLayer = document.getElementById(nextLayer);

	if (leftOrRight == "right") {
	 inProgress = true;
	 oldLayer.style.left = 0;
	 newLayer.style.left = "-" + spx(hScrollerWidth);
	 moveLayerRight(oldLayer.id, newLayer.id);

    }

	if (leftOrRight == "left") {
	 inProgress = true;
	 oldLayer.style.left = 0;
	 newLayer.style.left = spx(hScrollerWidth);
	 moveLayerLeft(oldLayer.id, newLayer.id);

	}
}

function moveLayerRight(whichLayer, nextLayer) {
   oldLayer = document.getElementById(whichLayer);
   newLayer = document.getElementById(nextLayer);

	if (spx(oldLayer.style.left) < spx(hScrollerWidth)) {
		oldLayer.style.left = spx(oldLayer.style.left) + Math.round(scrollSpeed);
		newLayer.style.left = spx(newLayer.style.left) + Math.round(scrollSpeed);
		setTimeout("moveLayerRight('" + oldLayer.id + "', '" + newLayer.id + "')", scrollDelay)
	} else {		
	oldLayer.style.left = spx(hScrollerWidth);
	newLayer.style.left = 0;
	inProgress = false;
	}
}

function moveLayerLeft(whichLayer, nextLayer) {
 oldLayer = document.getElementById(whichLayer);
 newLayer = document.getElementById(nextLayer);

	if (spx(oldLayer.style.left) > "-" + spx(hScrollerWidth)) {
	 oldLayer.style.left = spx(oldLayer.style.left) - Math.round(scrollSpeed);
	 newLayer.style.left = spx(newLayer.style.left) - Math.round(scrollSpeed);
	 setTimeout("moveLayerLeft('" + oldLayer.id + "', '" + newLayer.id + "')", scrollDelay)
	 } else {
	  oldLayer.style.left = "-" + spx(hScrollerWidth);
	  newLayer.style.left = 0;
	  inProgress = false;
	}
}

function spx(what) {
	 return Math.round(what.substr(0,what.indexOf("px")));
	}


function pagination() { //adds nummbers of pages
	for (var i=0; i < hScrollerLayers.length; i++)
		{
			var page = i+1
			document.writeln('<a id=' + i + ' onClick="skipTo('+ page + ');" style="cursor: pointer;">' + page + '</a>');			
		}
	}
	
function getURL() { //test location of page to display navigation menu or close button
	var query=window.location.href;
	var results = query.search(/index.shtml/);
	if (results == -1) {
		urlCheck = false;
	 }
	 else  {
	 	urlCheck = true;
	}
}

function testForDiv(id, position) { //Testing Div Name
	var a = document.getElementById(id);

		if (a) {
			    // Populate Array 
				hScrollerLayers[position] = id;
			    return;
		} else { return;}
}

function addDiv() {   //add Div name to array
	
	for (var i=0; i < totalDiv; i++)
		{
			var id = divName + i;
			hScrollerLayers[i] = id;
			
		}
}

function switchClass() {
	objPage=document.getElementById(currentPosition);
    objPage.setAttribute("class", "selected");
    objPage.setAttribute("className", "selected");  //IE work around 
	objPage=document.getElementById(oldPosition);
    objPage.setAttribute("class", "ok");
    objPage.setAttribute("className", "ok");       //IE work around
}

function intialSwitchClass() {
	objPage=document.getElementById(currentPosition);
    objPage.setAttribute("class", "selected");
    objPage.setAttribute("className", "selected");  //IE work around 
}

function init() {
	addDiv();
	document.write('<table width="168" border="0" cellspacing="0" cellpadding="0"><tr><td><div class="news_title_module">Taxi News</div></td>');
    document.write('</tr><tr><td class="news_slide_container">');
		document.write('<div id="mainLayer" style="position:relative; width:' + hScrollerWidth + '; height:' + hScrollerHeight + '; background-color:#ffde01; clip: rect(0 ' + hScrollerWidth + ' ' + hScrollerHeight + ' 0); overflow: hidden; margin-left: 0px;">');
		for ( var i=0; i<tlcnews.length; i++)
		{
			if (i==0)
			{
				document.write('<div id="contentdiv' + i + '" style="position:absolute; top:0px; left:0px; width:' + hScrollerWidth + '; height:' + hScrollerHeight + '; background-color: #ffde01; margin-left: 0px;" >');
				document.write('<table cellspacing="0" cellpadding="0" border="0" width="168"> <tr><td>');
				document.write('<div>' + tlcnews[i][0] + '</div>');
				document.write('</td></tr></table> ')
				document.write ('</div>');					
			}
		
			else 
			{
				document.write('<div id="contentdiv' + i + '" style="position:absolute; top:0px; left:-' + hScrollerWidth + '; width:' + hScrollerWidth + '; height:' + hScrollerHeight + '; background-color: #ffde01; margin-left: 0px; ">');
				document.write('<table cellspacing="0" cellpadding="0" border="0" width="168"> <tr><td>');
				document.write('<div>' + tlcnews[i][0] + '</div>');
				document.write('</td></tr></table> ')
				document.write ('</div>');			
			}
		}
	document.write('</div>');
	document.write('</td></tr>');
    document.write('<tr><td class="status"><div class="previousTip"><a onMouseOver="swapImage(\'newsLeft\',\'news_left_arrow_over.gif\')" onMouseOut="restoreImage(\'newsLeft\')" href="javascript:scrollPrevious();"><img src="../../includes/site_images/modules/news_left_arrow.gif" border=0 alt="Previous" name="newsLeft" id="newsLeft"></a></div><div id="itemStatus"></div><div class="nextTip"><a onMouseOver="swapImage(\'newsRight\',\'news_right_arrow_over.gif\')" onMouseOut="restoreImage(\'newsRight\')" href="javascript:scrollNext();"><img src="../../includes/site_images/modules/news_right_arrow.gif" border=0 alt="Next" name="newsRight" id="newsRight"></a></div></td></tr></table></script>');
	itemStatus();
}


function addLoadEvent(func) { 
	var oldonload = window.onload; 
	if (typeof window.onload != 'function') { 
		window.onload = func; 
	} else { 
		window.onload = function() { 
			if (oldonload) { 
				oldonload(); 
			} 
			func(); 
		} 
	} 
} 
init();
addLoadEvent(startnews);