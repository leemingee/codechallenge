var iama=new Array();
iama[iama.length]=["Passenger",[["Learn about TLC rules","../../html/rules/rules.shtml"],
["Learn about the industry","../../html/passenger/passenger.shtml"],
["File a complaint","../../html/passenger/sub_consumer_compl.shtml"],
["Commend a driver","../../html/passenger/commend_driver.shtml"],
["See when my hearing is","../../html/about/court_administration.shtml"],
["Find lost property","../../html/passenger/sub_lost_prop_inquiry.shtml"],
["Report finding property in a taxi","../../html/passenger/sub_lost_prop_inquiry.shtml"],
["Learn about fare Information","../../html/passenger/taxicab_rate.shtml"],
["Learn about wheelchair accessiblity","../../html/passenger/accessible.shtml"],
["Find a legal livery vehicle ","../../downloads/pdf/find_a_ride.pdf"],
]];
iama[iama.length]=["Driver",[["Plead guilty / Pay Summons Online","../../html/industry/lars.shtml"],
["Renew my license","../../html/industry/renew_drivers.shtml"],
["Check DMV and TLC License Status","../../html/industry/current_licensees.shtml"],
["Learn about TLC Rules and Regulations","../../html/rules/rules.shtml"],
["Find a Taxi School","../../downloads/pdf/taxischool_post_filing.pdf"],
["Check penalty points and open summonses","../../html/industry/open_summons_list.shtml"],
["Update my information","https://www1.nyc.gov/lars"],
["See when my hearing is","../../html/about/court_administration.shtml"],
["Learn about the Used Taxi Vehicle Pilot","../../html/industry/used_taxi_veh_pilot.shtml"],
["Find a frequently used forms","../../html/industry/licenses_forms.shtml"],
["View How-to Videos","../../html/industry/how_to_videos.shtml"],
]];
iama[iama.length]=["SHL permit applicant",[["Purchase an SHL permit","../../html/industry/shl.shtml"],
]];
iama[iama.length]=["Vehicle Owner",[["Plead guilty / Pay Summons Online","../../html/industry/lars.shtml"],
["Check DMV and TLC License Status","../../html/industry/current_licensees.shtml"],
["Renew my license","../../html/industry/lars.shtml"],
["Check penalty points and open summonses","../../html/industry/open_summons_list.shtml"],
["What vehicles are legal for for-hire use","../../html/industry/taxicab_vehicles_in_use.shtml"],
["Check on a vehicle inspection appointment","../../html/industry/medallion_schedule.shtml"],
["Learn about TLC Rules and Regulations","../../html/rules/rules.shtml"],
["Update my information","https://www1.nyc.gov/lars"],
["Find a frequently used forms","../../html/industry/licenses_forms.shtml"],
["See authorized markings printers","../../html/industry/printer_markings.shtml"],
["Learn about the Used Taxi Vehicle Pilot","../../html/industry/used_taxi_veh_pilot.shtml"],
["View How-to Videos","../../html/industry/how_to_videos.shtml"],
]];
iama[iama.length]=["Medallion Owner",[["Plead guilty / Pay Summons Online","../../html/industry/lars.shtml"],
["Check DMV and TLC License Status","../../html/industry/current_licensees.shtml"],
["Renew my license","../../html/industry/lars.shtml"],
["Check penalty points and open summonses","../../html/industry/open_summons_list.shtml"],
["See what vehicles are legal for use as taxicabs","../../html/industry/taxicab_vehicles_in_use.shtml"],
["See a list of TLC brokers/agents","../../downloads/excel/current_medallion_agents.xls"],
["Learn about TLC Rules and Regulations","../../html/rules/rules.shtml"],
["Find frequently used forms","../../html/industry/licenses_forms.shtml"],
["Looking for Vehicle Retirement Extension","../../html/industry/vehicle_retirement.shtml"],
["Learn about the Used Taxi Vehicle Pilot","../../html/industry/used_taxi_veh_pilot.shtml"],
]];
iama[iama.length]=["SHL Permit Owner",[["Update my information","https://www1.nyc.gov/lars"],
]];
iama[iama.length]=["Base Owner",[["Plead guilty / Pay Summons Online","../../html/industry/lars.shtml"],
["Check DMV and TLC License Status","../../html/industry/current_licensees.shtml"],
["Renew my license","../../html/industry/lars.shtml"],
["Check penalty points and open summonses","../../html/industry/open_summons_list.shtml"],
["Schedule/Reschedule a vehicle/new vehicle inspection appointment","../../html/industry/vehicle_appointment_insp_request_login.shtml"],
["Learn about TLC Rules and Regulations","../../html/rules/rules.shtml"],
["Find frequently used forms","../../html/industry/licenses_forms.shtml"],
["View How-to Videos","../../html/industry/how_to_videos.shtml"],
]];
iama[iama.length]=["Technology Service Provider",[["Apply for a DSP License","../../html/industry/dsp_lic_appl_info.shtml"],
["Apply for an E-Hail License","../../html/industry/licenses_ehail.shtml"],
["Learn about the Vehicle Safety Technology Pilot","../../html/industry/veh_safety_tech_pilot_program.shtml"],
["Apply to become a TPEP/LPEP Provider","../../html/technology/tpep_authorization.shtml"],

]];
iama[iama.length]=["Other Licensees",[["Plead guilty / Pay Summons Online","../../html/industry/lars.shtml"],
["Meter Shop ","../../downloads/excel/current_taxicab_metershops.xls"],
["Agents/Brokers","../../html/about/licenses_business.shtml"],
["Exterior Advertisers ","../../downloads/pdf/authorized_exterior_advertising_companies.pdf"],
["Find frequently used forms","../../html/industry/licenses_forms.shtml"],
]];
iama[iama.length]=["An Unlicensed Entity",[["Plead guilty / Pay Summons Online","../../html/industry/lars.shtml"],
]];
iama[iama.length]=["Interested in becoming a Driver",[["Obtain a license","../../html/industry/drivers.shtml"],
["Learn about TLC Rules and Regulations","../../html/rules/rules.shtml"],
]];
iama[iama.length]=["Interested in becoming Owner",[["Obtain a license","../../html/industry/owner_appl_instructions.shtml"],
["Learn about TLC Rules and Regulations","../../html/rules/rules.shtml"],
]];

function writeFirstOptions(){
	for(var i=0;i<iama.length;i++){
		document.write('<option value="'+i+'">'+iama[i][0]+'</option>');
	}
}

function populateSecond(theValue){
	var theIndex=parseInt(theValue);
	if(isNaN(theIndex)){
		document.getElementById("i_am_here_to").options.length=0;
		document.getElementById("i_am_here_to").options[0]=new Option("Please select and option above","",true,false);
	}else{
		var theArray=iama[theIndex][1];
		var theSelect=document.getElementById("i_am_here_to");
		theSelect.options.length=0;
		theSelect.options[0]=new Option("Choose One","",true,false);
		for(var j=0;j<theArray.length;j++){
			theSelect.options[theSelect.options.length]=new Option(theArray[j][0],theArray[j][1],false,false);
		}
	}
}

function gotoUrl(theUrl){
	if(theUrl!="#"){
		document.location.href=theUrl;
	}
}

function pushmedallion(){
		var theMedallion = document.getElementById("medallion_no").value;
		var requestUrl = "http://www.nyc.gov/html/tlc_medallion_info/html/tlc_lookup.shtml?medallion=" + theMedallion;
		document.location.href=requestUrl;
	
}