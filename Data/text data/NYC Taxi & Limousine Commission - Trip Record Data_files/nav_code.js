// Left Navigation Script for NYC.gov Agency Templates

// Returns path with folder and file, else -1.
// ex. /folder/file.html
function getPath(thePath) {
	if (thePath == null) { return -1; }
	var startSlash = thePath.lastIndexOf("/");
	startSlash = thePath.lastIndexOf("/",startSlash -1);

	if (startSlash == -1) {
		return -1;
	} else {
		return thePath.substr(startSlash, thePath.length - startSlash);
	}
}

// Returns folder, else -1.
// ex. /folder/
function getFolder(thePath) {
	if (thePath == null) { return -1; }
	var startSlash = thePath.lastIndexOf("/");
	startSlash2 = thePath.lastIndexOf("/",startSlash -1);

	if(startSlash == startSlash2) { return -1; }
	if (startSlash == -1 || startSlash2 == -1) {
		return -1;
	} else {
		return thePath.substr(startSlash2, startSlash - startSlash2 + 1);
	}
}

	var currentURL = getPath(location.href);
	var expandCurrentNode = false;
	var haveNodes = false;
	
	document.write("<table width='100%' border='0' cellspacing='0' cellpadding='0'>");
	
	for(x=0;x<NAV_NODES.length;x++) {
		expandCurrentNode = false;
		haveNodes = false;
	
		//check for sub nodes
		if (NAV_NODES[x] == null) break;
		if (NAV_NODES[x].length > 2) {
			if (currentURL.indexOf(getFolder(NAV_NODES[x][1])) != -1) {
				expandCurrentNode = true;
			}
			for(y=2;y<NAV_NODES[x].length;y++) {
				if (NAV_NODES[x][y] == null) break;
				if (NAV_NODES[x][y][1] != null) haveNodes = true;
				if (currentURL.indexOf(getPath(NAV_NODES[x][y][1])) != -1) {
					expandCurrentNode = true;
				}
			}
		}
		var drawnSub=false;
		//draw main nodes
		if ((currentURL.indexOf("/home/")==-1)&&(currentURL.indexOf(getPath(NAV_NODES[x][1])) != -1 || expandCurrentNode == true)) {
			document.write('<tr valign="top"><td class="nav_section_active" onMouseOver=this.id="over" onMouseOut=this.id="" onclick=document.location.href="'+NAV_NODES[x][1]+'"><a href="'+NAV_NODES[x][1]+'">'+ NAV_NODES[x][0] + '</a></td></tr>');
		} else {
			if(NAV_NODES[x][1].indexOf("/home/")!=-1){
				document.write('<tr valign="top"><td class="nav_home" onMouseOver=this.id="over" onMouseOut=this.id="" onclick=document.location.href="'+NAV_NODES[x][1]+'"><a href="'+NAV_NODES[x][1]+'">'+ NAV_NODES[x][0] + '</a></td></tr>');
			}
			else if(NAV_NODES[x][1].indexOf("/contact/")!=-1){
				document.write('<tr valign="top"><td class="nav_contact" onMouseOver=this.id="over" onMouseOut=this.id="" onclick=document.location.href="'+NAV_NODES[x][1]+'"><a href="'+NAV_NODES[x][1]+'">'+ NAV_NODES[x][0] + '</a></td></tr>');
			}
			else{
				document.write('<tr valign="top"><td class="nav_section" onMouseOver=this.id="over" onMouseOut=this.id="" onclick=document.location.href="'+NAV_NODES[x][1]+'"><a href="'+NAV_NODES[x][1]+'">'+ NAV_NODES[x][0] + '</a></td></tr>');
			}
		}
	
		//draw sub nodes
		if (NAV_NODES[x].length > 2 && expandCurrentNode == true) {
			for(y=2;y<NAV_NODES[x].length;y++) {
				if (NAV_NODES[x][y] == null){
					break;
				}
				if (currentURL.indexOf(getPath(NAV_NODES[x][y][1])) != -1) {
					document.write('<tr valign="top"><td class="nav_subsection_active"><table width="100%"><tr valign="top"><td width="29" align="right" style="padding-top: 6px;"><img src="../../includes/site_images/nav/sub_nav_arrow.gif"></td><td><a href="'+NAV_NODES[x][y][1]+'">' + NAV_NODES[x][y][0] + '</a></td></tr></table></td></tr>');

					drawnSub=true;
				} else {
					document.write('<tr valign="top"><td class="nav_subsection"><table width="100%"><tr valign="top"><td width="29" align="right" style="padding-top: 6px;"><img src="../../includes/site_images/nav/sub_nav_arrow.gif"></td><td><a href="'+NAV_NODES[x][y][1]+'">' + NAV_NODES[x][y][0] + '</a></td></tr></table></td></tr>');
					drawnSub=true;
				}
			}
		}
		if(drawnSub){
			document.write('<tr valign="top"><td class="nav_spacer"><img src="../../includes/site_images/nav/nav_bottom_border.gif"></td></tr>');
		}
	}
	document.write("</table>");
