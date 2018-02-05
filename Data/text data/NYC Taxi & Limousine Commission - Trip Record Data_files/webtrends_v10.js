// WebTrends SmartSource Data Collector Tag v10.4.1
// Copyright (c) 2014 Webtrends Inc.  All rights reserved.
// Tag Builder Version: 4.1.3.2
// Created: 2014.03.27

if (typeof (prod_host) == 'undefined') var prod_host = "nyc.gov";
if (typeof (test_host) == 'undefined') var test_host = "nyc-tst-web.csc.nycnet";

var prod_host_regex = new RegExp(prod_host);
var test_host_regex = new RegExp(test_host);

var on_prod = prod_host_regex.test(window.location);
var on_test_nyc_gov = test_host_regex.test(window.location);

window.webtrendsAsyncInit=function(){
	//set default dcs & domain values
	var dcsid_val = "abcdefghijklmnopqrstuvwxyz0123";
	var domain_val = "donot.usevalid.dom";
	var onsitedoms_val = ".donotusevalid.dom";
	var fpcdom_val = ".donotusevalid.dom";
	
	//check what host we're on and use appropriate dcsid & domain info
	if (on_prod) {
		dcsid_val = prod_dcsId_val;
		domain_val = "statse.webtrendslive.com";
		onsitedoms_val = prod_host;
		fpcdom_val = "."+prod_host;
	}
	else if (on_test_nyc_gov && typeof(test_dcsId_val) != 'undefined'){
		dcsid_val = test_dcsId_val;
		domain_val = "statse.webtrendslive.com";
		onsitedoms_val = test_host;
		fpcdom_val = "."+test_host;
	}
	
    var dcs=new Webtrends.dcs().init({
        dcsid:dcsid_val,
        domain:domain_val,
        timezone:-5,
        i18n:true,
        offsite:true,
        download:true,
        downloadtypes:"sas7bdat,sas,xls,doc,pdf,txt,csv,zip,docx,xlsx,rar,gzip,3gp,arc,arj,asf,asx,edp,eps,flv,gz,ics,m3u,m4r,m4v,mov,mp3,mp4,mpeg,mpg,potx,ppam,ppsm,ppsx,ppt,pptm,pptx,psd,ram,rss,sit,tar,tif,vcf,vcs,wav,wma,wmv,xlsm,xml,z",
        anchor:true,
        javascript: true,
        onsitedoms:onsitedoms_val,
        fpcdom:fpcdom_val,
        plugins:{
        	hm:{src:"//s.webtrends.com/js/webtrends.hm.js"},
		nycgov:{src:"//www1.nyc.gov/assets/home/js/webtrends/webtrends.nycgov.js"}
        }
        });

	dcs.track();
};
(function(){
    var s=document.createElement("script"); s.async=true; s.src="//www1.nyc.gov/assets/home/js/webtrends/webtrends.min.js";    
    var s2=document.getElementsByTagName("script")[0]; s2.parentNode.insertBefore(s,s2);
}());