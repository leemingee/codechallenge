
/** Update: 10/15/2014 -
*
* G.Soto - Leveraged JavaScript code (https://gist.github.com/mirontoli/4722797) to translate ISO-639-1 code to friendly language name.
           Referenced languages have been modified to only reflect those that are available in the Google Translate widget as of the date of this
           update.
*/

/**
 * @author Anatoly Mironov (mirontoli)
 * http://sharepointkunskap.wordpress.com
 * http://www.bool.se
 *  
 * http://stackoverflow.com/questions/3605495/generate-a-list-of-localized-language-names-with-links-to-google-translate/14800384#14800384
 * http://stackoverflow.com/questions/10997128/language-name-from-iso-639-1-code-in-javascript/14800499#14800499
 * 
 * using Phil Teare's answer on stackoverflow
 * http://stackoverflow.com/questions/3217492/list-of-language-codes-in-yaml-or-json/4900304#4900304
 * Just for testing only. Incorporate in your own javascript namespace
 * Example: getLanguageName("cv-RU") --> Chuvash
 */
(function () {
    'use strict';
	
    /**
     * @author Phil Teare
     * using wikipedia data
 
    "":{
       "name":"" //
    },
    */
	var isoLangs = {
		"en":{
			"name":"English" 
		},
		"af":{
			"name":"Afrikaans" 
		},	
		"sq":{
				"name":"Albanian" 
		},
		"ar":{
			"name":"Arabic" 
		},
		"hy":{
			"name":"Armenian" 
		},
		"az":{
			"name":"Azerbaijani" 
		},
		"eu":{
			"name":"Basque" 
		},
		"be":{
			"name":"Belarusian" 
		},
		"bn":{
			"name":"Bengali" 
		},
		"bs":{
			"name":"Bosnian" 
		},
		"bg":{
			"name":"Bulgarian" 
		},
		"ca":{
			"name":"Catalan" 
		},
		"ceb":{
			"name":"Cebuano" 
		},
		"zh-CN":{
			"name":"Chinese (Simplified)" 
		},
		"zh-TW":{
			"name":"Chinese (Traditional)" 
		},
		"hr":{
			"name":"Croatian" 
		},
		"cs":{
			"name":"Czech" 
		},
		"da":{
			"name":"Danish" 
		},
		"nl":{
			"name":"Dutch" 
		},
		"eo":{
			"name":"Esperanto" 
		},
		"et":{
			"name":"Estonian" 
		},
		"tl":{
			"name":"Filipino" 
		},
		"fi":{
			"name":"Finnish" 
		},
		"fr":{
			"name":"French" 
		},
		"gl":{
			"name":"Galician" 
		},
		"ka":{
			"name":"Georgian" 
		},
		"de":{
			"name":"German" 
		},
		"el":{
			"name":"Greek" 
		},
		"gu":{
			"name":"Gujarati" 
		},
		"ht":{
			"name":"Haitian Creole" 
		},
		"ha":{
			"name":"Hausa" 
		},
		"iw":{
			"name":"Hebrew" 
		},
		"hi":{
			"name":"Hindi"
		},
		"hmn":{
			"name":"Hmong" 
		},
		"hu":{
			"name":"Hungarian" 
		},
		"is":{
			"name":"Icelandic" 
		},
		"ig":{
			"name":"Igbo" 
		},
		"id":{
			"name":"Indonesian" 
		},
		"ga":{
			"name":"Irish" 
		},
		"it":{
			"name":"Italian" 
		},
		"ja":{
			"name":"Japanese" 
		},
		"jw":{
			"name":"Javanese" 
		},
		"kn":{
			"name":"Kannada" 
		},
		"km":{
			"name":"Khmer" 
		},
		"ko":{
			"name":"Korean" 
		},
		"lo":{
			"name":"Lao" 
		},
		"la":{
			"name":"Latin" 
		},
		"lv":{
			"name":"Latvian" 
		},
		"lt":{
			"name":"Lithuanian" 
		},
		"mk":{
			"name":"Macedonian" 
		},
		"ms":{
			"name":"Malay" 
		},
		"mt":{
			"name":"Maltese" 
		},
		"mi":{
			"name":"Maori" 
		},
		"mr":{
			"name":"Marathi" 
		},
		"mn":{
			"name":"Mongolian" 
		},
		"ne":{
			"name":"Nepali" 
		},
		"no":{
			"name":"Norwegian" 
		},
		"fa":{
			"name":"Persian" 
		},
		"pl":{
			"name":"Polish" 
		},
		"pt":{
			"name":"Portuguese" 
		},
		"pa":{
			"name":"Punjabi" 
		},
		"ro":{
			"name":"Romanian" 
		},
		"ru":{
			"name":"Russian" 
		},
		"sr":{
			"name":"Serbian" 
		},
		"sk":{
			"name":"Slovak" 
		},
		"sl":{
			"name":"Slovenian" 
		},
		"so":{
			"name":"Somali" 
		},
		"es":{
			"name":"Spanish" 
		},
		"sw":{
			"name":"Swahili" 
		},
		"sv":{
			"name":"Swedish" 
		},
		"ta":{
			"name":"Tamil" 
		},
		"te":{
			"name":"Telugu" 
		},
		"th":{
			"name":"Thai" 
		},
		"tr":{
			"name":"Turkish" 
		},
		"uk":{
			"name":"Ukrainian" 
		},
		"ur":{
			"name":"Urdu" 
		},
		"vi":{
			"name":"Vietnamese" 
		},
		"cy":{
			"name":"Welsh" 
		},
		"yi":{
			"name":"Yiddish" 
		},
		"yo":{
			"name":"Yoruba" 
		},
		"zu":{
			"name":"Zulu" 
		}
	};
	
	var getLanguageName = function(key) {
		//The expected key value is the google translate cookie value e.g. /en/es
		//This can be retrieved by using WebTrends.dcsGetCookie("googtrans") and passed into this function

		//Get the location of the last slash in the cookie value
		var lastSlash = key.lastIndexOf("/");
		//Change the current key value to trim/remove the prefix before the language, including the last slash
		key = key.substring(lastSlash+1);
		//Do a lookup for the language based on the trimmed key value
		var lang = isoLangs[key];
		
		return lang ? lang.name : key;
	};
	window.getLanguageName = getLanguageName;
})();


/*
*
* Update: 10/2/2014 - 
 
* NYC Gov custom Plugin
*
* Track Onsite Search. Search term is placed in WT.oss. If results returned WT.oss_r=1 if no results WT.oss_r=0
* Logic included to delay tag from firing until search results loaded on page
* Add logic to send search results to different dcsid based on parameter passed to page
* Add logic to check if googtrans cookie has changed to detect if translation occurred
*
* DS 931
*/

//Instatiate the cookieRegistry array that will be used to keep track of the Google Translate key.
cookieRegistry = [];

(function (WT) {
    // a little glue to add in querySelectorAll into browsers that don't nativly support it
// like IE6 & 7

    if (!document.querySelectorAll) {
        // IE7 support for querySelectorAll. Supports multiple / grouped selectors and the attribute selector with a "for" attribute. http://www.codecouch.com/
        (function (d, s) {
            d = document, s = d.createStyleSheet();
            d.querySelectorAll = function (r, c, i, j, a) {
                a = d.all, c = [], r = r.replace(/\[for\b/gi, '[htmlFor').split(',');
                for (i = r.length; i--;) {
                    s.addRule(r[i], 'k:v', 0);
                    for (j = a.length; j--;) a[j].currentStyle.k && c.push(a[j]);
                    s.removeRule(0);
                }
                return c;
            }
        })()
    }
    wt_nyc = {
		// universal add event listener
        doWork: function (dcs, options) {
            function UniAddEvent(elem, evnt, func) {
                if (elem.addEventListener)  // W3C DOM
                    elem.addEventListener(evnt, func, false);
                else if (elem.attachEvent) { // IE DOM
                    elem.attachEvent("on" + evnt, func);
                }
                else { // Not much to do
                    elem[evnt] = func;
                }
            }
   
            var prod_host2 = new RegExp("www1.nyc.gov");
			var test_host2 = new RegExp("nyc-tst-web.csc.nycnet");
			var on_nyc_gov2 = prod_host2.test(window.location);
			var on_test_nyc_gov2 = test_host2.test(window.location);
			
			if (on_nyc_gov2 || on_test_nyc_gov2) { //only run if www1.nyc.gov or nyc-tst-web
				if (readCookie('googtrans') != null) {
					cookieRegistry['googtrans'] = readCookie('googtrans'); 
				}
			}

			// Check if google translate cookie changes
			function readCookie(name) {
				var nameEQ = name + "=";
				var ca = document.cookie.split(';');
				for (var i = 0; i < ca.length; i++) {
					var c = ca[i];
					while (c.charAt(0) == ' ') c = c.substring(1, c.length);
					if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
				}
				return null;
			}   

			function listenCookieChange(cookieName, callback) {
				setInterval(function() {
					if (readCookie(cookieName) != null && readCookie(cookieName) != cookieRegistry[cookieName]) {
							if (readCookie(cookieName) != cookieRegistry[cookieName]) {
							// update registry so we dont get triggered again
							cookieRegistry[cookieName] = readCookie(cookieName);
							return callback();
						   }
					} 
					else {
							cookieRegistry[cookieName] = readCookie(cookieName);
					}
				}, 250);
			}
	
			// bind the listener
			listenCookieChange('googtrans', function() {
				TranslateLang = Webtrends.dcsGetCookie('googtrans');
				if (typeof TranslateLang != 'undefined' && TranslateLang != '') {
					TranslateLang = getLanguageName(TranslateLang);
					Webtrends.multiTrack({
							argsa: ["DCSext.goog_trans", TranslateLang,"DCSext.goog_searchfound", '', "DCSext.goog_searchnotfound", '', "WT.dl", '99',"DCSext.s_311_sid", "", "DCSext.serviceName", ""]
					});
				}
				
			});			
        }
    };     
	
	Webtrends.registerPlugin("nycgov", function (dcs, options) {
		wt_nyc.doWork(dcs, options);
	});    
})();