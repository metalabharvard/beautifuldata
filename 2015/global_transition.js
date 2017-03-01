$(document).ready(function() {
$.getJSON( "data.json", function( data ) {
	var counter = 0;
	var current_homepage = [];
	var save_last_url = [];
	var move_to = $('.adjust_outer2').position().top;
	var save_scrollpos = [(move_to-30)];
	var allthetags = [];
	var all_types = Object.keys(data);
	for(var i in all_types){
		var all_objintypes = data[all_types[i]];
		for(var k in all_objintypes){
			if(all_objintypes[k].tags.length){
				for(var m in all_objintypes[k].tags){
					var tag_all = "tag_"+all_objintypes[k].tags[m].replace(/ /g,"-");
					allthetags.push({tags: tag_all, type: "type_"+all_objintypes[k].type});
				}
			}
		}
	}
	var sortedtags_types = {};
	for (var i = 0; i < allthetags.length; ++i) {
	    var obj = allthetags[i];
	    if (sortedtags_types[obj.tags] === undefined){
	        sortedtags_types[obj.tags] = [obj.tags];
	    }	
	    sortedtags_types[obj.tags].push(obj.type);
	}
	var sortedtags_types2 = [];
	for(var k in sortedtags_types){
		var unique_tags = [];
		$.each(sortedtags_types[k], function(i, el){
		    if($.inArray(el, unique_tags) === -1) {
				unique_tags.push(sortedtags_types[k][i]);
		    }
		});
		sortedtags_types2[unique_tags[0]] = unique_tags;
	}

	$('.WRAPPER').on('click', '.HEADER,.DOWNBUTTON', function() {		
		var scroll_pos = $(window).scrollTop();
		console.log(scroll_pos + ' < ' + (move_to-200));
		//if(scroll_pos <= (move_to/2)){ 
			console.log("push to array: "+(move_to-30));
			save_scrollpos[0] = (move_to-30);
			$('html, body').animate({scrollTop: move_to-30}, 500);
		//}
	});

	$('.WRAPPER').on('click', '.desc_i_open', function() {		
    	$('.page_desc.pa').scrollTop(0);
		$('.page_desc.pa').fadeIn(400);
		$('body').css({'overflow':'hidden'});
    	$('.pa .desc_hldr').html('With art museums making both their imagery and collections data open and accessible, the question arises: what to do with it all? This was the question put to participants in Beautiful Data II, a summer workshop supported by the Getty Research Institute and hosted by metaLAB with the Harvard Art Museums and the Carpenter Center for Visual Arts.  For two weeks in July 2016, a gathering of art historians, curators, designers, and technologists forged concepts and skills necessary to make use of open collections to develop art-historical storytelling.</p>The second annual offering of Beautiful Data, this edition of the workshop focused on “difficult collections” poised on the edge of the digital/material divide—collections that resist ready digitization or exist as ephemeral and hybrid objects and events. Projects pondered data as a medium for art, one with its own curatorial and preservation challenges using data visualization, interactive media, enhanced curatorial description and exhibition practice, digital publication, and data-driven, object-oriented teaching.</p>The workshop was extensively documented by participants and staff. As a provocation, we’ve treated this documentation as data, turning it into an array in JSON, an open data format used widely in web programming. This site visualizes the resulting data set in three ways: styled as content tiles; as “raw” metadata, with cross-referenceable tags visibly linking records; and as a rotary timeline expressing those connections as arcs of adjacency. So although each visualization expresses the same data, its styling and features privilege certain characteristics and connections. Each has its emphases, and its missing elements as well. These interdependent visualizations not only offer a set of mnemonics for our class of participants; they also offer a collective provocation on the multimodal nature of “data” as a concept and norm.')
	});

	$('.WRAPPER').on('mouseover', '.desc_0_open', function() {	
		$('.page_desc.pb').scrollTop(0);	
		$('.page_desc.pb').fadeIn(400);
		$('.pb .desc_hldr').html('Here, our documentation data are visualized as media, in combinations of text and image. People are visualized as scans of their ID badges, which, during the workshop, identified us to one another and helped us pass in and out of the museum. Books, articles, and other resources show up as citations not unlike cards in a library catalogue or index file; presentations, projects, and other excursions are documented in images and descriptive tags. Vague, oblique, and fitfully incomplete, these documentary traces represent a “problem collection” in themselves.');
	});


	$('.WRAPPER').on('mouseover', '.desc_1_open', function() {
		$('.page_desc.pb').scrollTop(0);		
		$('.page_desc.pb').fadeIn(400);
		$('.pb .desc_hldr').html('Here, our documentation data display “raw” form as JSON, or JavaScript Object Notation, an open format which describes data objects as combinations of pairs of attributes and values. That formula might not be penetrable to you; what is essential to understand here is that we can use HTML, JavaScript, and other languages to interact with these data on web sites, making a direct connection between server and browser. Typically, these data reside invisibly in files accessed by the web sites we use to search and browse collections. On this page, we’ve made them visible. Clicking on tags visualizes additional linkages, as shared tags connect up and down the array. Clicking on ID numbers links every instance of that object cross-referenced in other fields throughout the dataset.');
	});

	$('.WRAPPER').on('mouseover', '.desc_2_open', function() {	
		$('.page_desc.pb').scrollTop(0);	
		$('.page_desc.pb').fadeIn(400);
		//$('body').css({'overflow':'hidden'});
		$('.pb .desc_hldr').html('In this circular graph, events, projects, presentations, and resources—“data objects” all—manifest as spokes on a wheel, their relative lengths reflecting the amount of media associated with each of them. Arcs express adjacencies in the form of shared tags. The default display, in color, expresses connections made in the JSON array on the previous screen. Mousing over an individual spoke shows its connections across the circle to other data objects that it references, with which it will tend to share resemblances. The arcs and spokes are evocative of connection and system, even as they may be less “transparent” in this view than in the other visualizations. What are “beautiful data”? They’re appealing, they’re lovely—and perhaps they’re a bit distant and incomprehensible as well, as they withdraw from us into their beauty.');});

	

	$(document).on('mousemove', function() {	
		$('.page_desc.pb').hide().stop();
	});
	$('.WRAPPER').on('mousemove', '.shift_question', function(event) {
    	event.stopPropagation();
   	});

	var resizeId;
	$(window).resize(function() {
	    	clearTimeout(resizeId);
	    	resizeId = setTimeout(setdescsize(), 1000);
	});

	setdescsize();
	function setdescsize(){
	   	if($(window).width() > $(window).height()){
	   		$('.page_desc').css({'font-size':'2.0vw'});
		}else{
			$('.page_desc').css({'font-size':'2.5vh'});
		}	
	}
	$('.WRAPPER').on('click', '.close_desc,.page_desc.pa', function() {		
		$('.page_desc.pa').fadeOut(400);
		$('body').css({'overflow-y':'scroll'});
	});
	
var type_activity = '<span class="test"><a class="obj_type t_type_activity" id="#type_activity">:ACTIVITIES</a></span> ';
var type_readings = '<span class="test"><a class="obj_type t_type_reading" id="#type_reading">:READINGS</a></span> ';
var type_insights = '<span class="test"><a class="obj_type t_type_insight" id="#type_insight">:INSIGHTS</a></span> ';
var type_collections = '<span class="test"><a class="obj_type t_type_collection" id="#type_collection">:COLLECTIONS</a></span> ';
var type_people = '<span class="test"><a class="obj_type t_type_person" id="#type_person">:PEOPLE</a></span> ';
var type_tools = '<span class="test"><a class="obj_type t_type_tool" id="#type_tool">:TOOLS</a></span> ';
var type_questions = '<span class="test"><a class="obj_type t_type_question" id="#type_question">:QUESTIONS</a></span> ';
var type_prototypes = '<span class="test"><a class="obj_type t_type_prototype" id="#type_prototype">:PROTOTYPES</a></span> ';
var type_precedents = '<span class="test"><a class="obj_type t_type_precedent" id="#type_precedent">:PRECEDENTS</a></span>';

$('.QUESTION .types .typehldr').html(type_activity+type_readings+type_insights+type_collections+type_people+type_tools+type_questions+type_prototypes+type_precedents);

$('.t_type_activity').on('mouseover', function() {
	$('.type_info .ttext').html('Breakout sessions, workshops, and group presentations.');
});
$('.t_type_reading').on('mouseover', function() {
	$('.type_info .ttext').html('Texts analyzed in group projects.');
});
$('.t_type_insight').on('mouseover', function() {
	$('.type_info .ttext').html('Ideas, conclusions and critical assessments.');
});
$('.t_type_collection').on('mouseover', function() {
	$('.type_info .ttext').html('Assembly of related graphic and textual artifacts.');
});
$('.t_type_person').on('mouseover', function() {
	$('.type_info .ttext').html('Participants: students, scholars, and practitioners.');
});
$('.t_type_tool').on('mouseover', function() {
	$('.type_info .ttext').html('External interfaces used for project research and development.');
});
$('.t_type_question').on('mouseover', function() {
	$('.type_info .ttext').html('Queries raised during and after presentations, lectures, and group discussions.');
});
$('.t_type_prototype').on('mouseover', function() {
	$('.type_info .ttext').html('Emergent media frameworks designed by participants.');
});
$('.t_type_precedent').on('mouseover', function() {
	$('.type_info .ttext').html('Case studies analyzed during the course of the workshop.');
});

$('.obj_type').on('mouseover', function() {
	$('.type_info').show();
	var x_pos = $(this).position().left;
	var y_pos = $(this).position().top;
	var x_width = $(this).width();
	$('.type_info').css({'left':(x_pos)+'px','top':(y_pos+40)+'px'});

	console.log(y_pos);
});
$('.obj_type').on('mouseout', function() {
	$('.type_info').hide();
});

	var spliturl = window.location.hash.split('&');
	for(var i in spliturl){
		if (spliturl[i].indexOf("id_") >= 0) {
			//if another type exists, replace type
			spliturl.splice(i, 1);		
		}			
	}
	save_last_url[0]=spliturl.join('&')

	var get_colors = [
		{"color":"#CBBBAE","tag":"2015"},
		{"color":"#EB0F46","tag":"materiality"},
		{"color":"#85F5CA","tag":"pigments"},
		{"color":"#C369CD","tag":"media"},
		{"color":"#95A619","tag":"surrogates"},
		{"color":"#1E1474","tag":"metadata"},
		{"color":"#441C4D","tag":"data"},
		{"color":"#2809C7","tag":"art-study-center"},
		{"color":"#A9DBD5","tag":"sculpture"},
		{"color":"#2D8E35","tag":"art-objects"},
		{"color":"#10BCA6","tag":"museums"},
		{"color":"#42F9CF","tag":"conservation"},
		{"color":"#15993E","tag":"ephemerality"},
		{"color":"#50ED0A","tag":"rothko"},
		{"color":"#56400C","tag":"curation"},
		{"color":"#281E03","tag":"collections"},
		{"color":"#F9AF6C","tag":"database"},
		{"color":"#93C217","tag":"broader-context"},
		{"color":"#267C9C","tag":"lightning-talk"},
		{"color":"#6C1050","tag":"art-history"},
		{"color":"#1724E6","tag":"visualization"},
		{"color":"#695CDF","tag":"Seb-Chan"},
		{"color":"#3BF850","tag":"engagement"},
		{"color":"#45FBF7","tag":"usership"},
		{"color":"#DC3B82","tag":"accessibility"},
		{"color":"#0F4CFD","tag":"Yanni-Loukissass"},
		{"color":"#62C3BD","tag":"Jon-Frey"}
	];
	//var get_colors2 = palette('rainbow', 100);
	//console.log(get_colors2);

	//ARRAYS///////////////////////////////////////////////////////////////////////////////////////////////////////////
	var arr_homepages = [
		'index_problem_collection',
		'index_invisible_visible',
		'index_beautiful_data'
		];
	var arr_questions = [
		'What are problem collections?',
		'How do we make the invisible visible?',
		'What are beautiful data?'
		];	
	
	//EVENT TRIGGERS//////////////////////////////////////////////////////////////////////////////////////////////////
	checkhask();

	$(window).on('hashchange', function() {checkhask()});

	$('.shift_forw').on('click', function() {
		index_rotate(1);
	});
	$('.shift_back').on('click', function() {
		index_rotate(-1);
	});

	//INDEX ROTATION/////////////////////////////////////////////////////////////////////////////////////////////////
	function index_rotate(count){
		//check current current hompage
		//console.log("save loc "+window.pageYOffset);

		var url_val = window.location.hash;
		var url_array;
		var nextprev_homepage;
		var current_index = 0;
		var next_index = 1;
		var current = arr_homepages[current_index];
		//if no hashtag, assume prob_coll
		if(url_val.length > 0){
		//if hashtag, get value of current and tags
			url_array = url_val.split("&");//.join("");
			for(var i in url_array){
				if(url_array[i].indexOf("#index_") > -1){
					//remove current index
					current = url_array[i];
    				url_array.splice(i, 1);
				}
			}
		}
		current_index = arr_homepages.indexOf(current.replace("#",""));
		//get next/prev hompage:
		if((current_index+count) >= arr_homepages.length){
			nextprev_homepage = arr_homepages[0];
		}
		else if((current_index+count) < 0){
			nextprev_homepage = arr_homepages[arr_homepages.length-1];
		}
		else{
			nextprev_homepage = arr_homepages[current_index+count]
		}
		//add next/prev to array
		var new_url = "#"+nextprev_homepage;
		if(url_array && url_array.length > 0){
			new_url = new_url+"&"+url_array.join("&");
		}
		//update url
		window.location = new_url;
		save_last_url[0]=new_url;

	}
 
	//UPDATE CONTENT/////////////////////////////////////////////////////////////////////////////////////////////////
	function load_index(indexname,tags,cmd){
		save_scrollpos[0]=window.pageYOffset; //save scroll location
		var clean_taglist = [];
		
		for(var i in tags){
		if(tags[i].indexOf("tag_") !== -1){
			for(var k in sortedtags_types2){
				
					if(tags[i] == sortedtags_types2[k][0]){
						var taglistclasses = sortedtags_types2[k].join(' ');
						var colortag = "red";
						var fontweight = "bold";
						if(indexname == "index_beautiful_data" || indexname == "index_invisible_visible"){
							colortag = "#aaa";
							for(var k in get_colors){
								if(get_colors[k].tag == tags[i].replace('tag_','')){
									//console.log(get_colors[k].tag);
									colortag = get_colors[k].color;
									fontweight = "bold";
								}
							}
						}
						clean_taglist.push('<span id="#'+tags[i]+'" class="obj_tag '+taglistclasses+'" style="font-weight: '+fontweight+'; color: '+colortag+'">'+tags[i]+'</span>');
					}

			}
		}else{
			var colortag = "red";
			var fontweight = "bold";
			//if(indexname == "index_beautiful_data" || indexname == "index_invisible_visible"){
				//colortag = "#aaa";
				for(var k in get_colors){
					if(get_colors[k].tag == tags[i].replace('tag_','')){
						//console.log(get_colors[k].tag);
						colortag = get_colors[k].color;
						fontweight = "bold";
					}
				}
			clean_taglist.push('<span id="#'+tags[i]+'" class="obj_id" style="font-weight: '+fontweight+'; color: '+colortag+'">'+tags[i]+'</span>');
								
		}
		}

		if(tags.length){
			$('.tagkey_list .thelist').html(clean_taglist.join(', '));
		}else{
			$('.tagkey_list .thelist').html('<b>none</b> (select <i>tags</i>, a <i>type</i>, or an <i>id</i> to begin filtering)');
		}
		
		for(var i in tags){
			if(tags[i].indexOf("type_") !== -1){
				//reject_tags.push($('.'+tags[i]).attr('class').split(' '));
				$('.thelist .obj_tag').not("."+tags[i]).css({'text-decoration': 'line-through','color':'#aaa'}).addClass('rejecttag');	
			}
		}
		var reject_tags = [];
		$('.rejecttag').each(function(i,obj) {
			var rejecttag_id = $(this).attr('id')
			reject_tags.push(rejecttag_id.replace('#',''));
		});		
		


		//update question
		var arr_homindex = arr_homepages.indexOf(indexname);
		$(".shift_question div").html('<span class="desc_'+arr_homindex+'_open">'+arr_questions[arr_homindex]+'</span>');
		console.log(arr_homindex);
			//fill main filter selections
			if(indexname == "index_invisible_visible"){
				load_visible_coll(indexname,tags,data,cmd,get_colors,reject_tags);
				$('.tagkey_list .thelist i').css({'font-weight':'bold','color':'green'});
			}
			else if(indexname == "index_beautiful_data"){
				load_beautiful_coll(indexname,tags,data,cmd,get_colors,reject_tags)
				$('html, body').animate({scrollTop: save_scrollpos}, 0);
				$('.tagkey_list .thelist i').css({'font-weight':'bold','color':'red'});
			}else{
				load_prob_coll(indexname,tags,data,cmd);
				$('html, body').animate({scrollTop: save_scrollpos}, 0);
				$('.tagkey_list .thelist i').css({'font-weight':'bold','color':'red'});
			}
			


	};







	///CHECK URL HASHTAG AND TAGS////////////////////////////////////////////////////////////////////////////////////
	function checkhask(){
			

		//check url hash
		var url_val = window.location.hash;
		//url to array
		var current = arr_homepages[0];
		var tags = "";

		function checkforchange(oldpage,newpage,thetags){
			//if(oldpage){
				//console.log("current: "+oldpage);
				if(oldpage == newpage){
					//if index doesn't change, UPDATE content
					console.log("INDEX UPDATE");
					load_index(newpage,thetags,"cmd_update");
				}else{
					//if index changes, LOAD new content
					console.log("INDEX LOAD");
					load_index(newpage,thetags,"cmd_load");
				}
			//}
			current_homepage[0] = current;
		}
	
		//if url hash, get homepage
		if(url_val.length > 0){
			var url_array = url_val.split("&");
			//if tags get current and tags
			if(url_array.length > 1){
				for(var i in url_array){
					if(url_array[i].indexOf("#index_") > -1){
						//remove current index
						current = url_array[i].replace('#','');
	    				url_array.splice(i, 1);
	    				$('.QUESTION .obj_type').css({'color':'black'});

					}
					if(url_array[i].indexOf("type_") >= 0) {
						$('.QUESTION .obj_type').css({'color':'black'});
						$('.QUESTION .t_'+url_array[i]).css({'color':'red'});
					}
						


				}
				tags = url_array;				
			}else{
			//if no tags
				current = url_array[0].replace('#','');
			}
		}
		checkforchange(current_homepage[0],current,tags);
		//load_index(current,tags);
		

	}

	//EVENTS//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	clickaway();
	
	function clickaway(){
	$('.WRAPPER').on('click', '.obj_tag,.obj_type,.obj_id', function() {
		//console.log('CLIIIIIIICKED');
		//get hash value
		var tag_val = $(this).attr('id').replace("#","");
		var url_val = window.location.hash;
		var arr_url_val = url_val.split("&");
		arr_url_val.splice(0,1);
		//check if tag exists in urls
		console.log("CLICKED");


		if (arr_url_val.indexOf(tag_val) > -1) {//if exists already, delete from url
			//console.log("exists, delete");
			arr_url_val.splice(arr_url_val.indexOf(tag_val), 1);
		}
		else {//if doesn't exist
			//check if clicked is type
			if (tag_val.indexOf("type_") > -1) {
				//console.log("!!!!!tag_val is a type:"+tag_val);
				//if clicked is type, check if another type exists
				for(var i in arr_url_val){
					if (arr_url_val[i].indexOf("type_") >= 0) {
						//if another type exists, replace type
						arr_url_val.splice(i, 1);	
						//console.log(tag_val);	
						
					}
				}
			}
			//else add tag/type
			for(var i in arr_url_val){
				if (arr_url_val[i].indexOf("id_") >= 0) {
					//if another id exists, delete
					arr_url_val.splice(i, 1);		
				}
			}

			arr_url_val.push(tag_val);
		}
		var updated_tags = [];
		for(var i in arr_url_val){
			var uptag = "&"+arr_url_val[i];
			updated_tags.push(uptag);
		}
		var newurl = "#"+current_homepage[0]+updated_tags.join("");
		//if _id, replace all,
		
		if(tag_val.toLowerCase().indexOf("id_") >= 0){
			//var newurl = "#"+current_homepage[0]+"&"+tag_val;
			if (arr_url_val.indexOf(tag_val) >= 0) {
				//console.log(tag_val+" id DOES NOT exist, replace all");
				newurl = "#"+current_homepage[0]+"&"+tag_val;
			}else{
				//if already in id, remove and go back**************
				//console.log(tag_val+" id exists, delete, go back");
				if(save_last_url && $(this).parent().attr('class') !== "thelist"){
					newurl = save_last_url;
				}else{
					newurl = "#"+current_homepage[0];

				}
				//console.log("thehomepage #"+current_homepage[0]);
				//console.log("newurl: "+ save_last_url);
			}
			//go to new ul

		}else{//if not id, back up url
			save_last_url[0]=newurl;
			//console.log('push: '+newurl[0]);
		}
			//new url
			//var newurl = "#"+current_homepage[0]+updated_tags.join("");
		
			//go to new ul
			window.location = newurl;
		//}


		

	});
	}
	
$('.CONTENT').on('click', '.image_popup', function() {
	var linkurl = $(this).attr('id');
	$('.url_popup_outer').show();
	$('.url_popup').html('<img src='+linkurl+'><div class="url_pop_desc"><a href='+linkurl+' target="_blank">'+linkurl.replace(/"/g, '')+'</a></div>');

});

$('.url_popup_outer').on('click', function() {
	$('.url_popup_outer').hide();
	$('.url_popup').html('');
});

	


			


});
});

