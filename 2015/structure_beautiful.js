function load_beautiful_coll(indexname,taglist,data,cmd,get_colors){	
	console.log(indexname+':'+taglist);
	$('.CONTENT').html('<div class="adjust_outer"><div id="visualization-box"></div></div>');
	var divwidth = $('#visualization-box').width();
	var windowheight = window.innerHeight;
	var all_obj = [];
	var fadespeed = 300;
	//push to single array (all_obj)
	var all_types = Object.keys(data);
	for(var i in all_types){
		var all_objintypes = data[all_types[i]];
		for(k in all_objintypes){
			all_obj.push(all_objintypes[k]);
		}
	}

	//push ids to array (all_ids)
	function shuffle(o){
	    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    return o;
	}


	//create canvas
	var canvas2 = document.createElement('canvas');
	canvas2.id = "canvaslayer2";
	canvas2.width = divwidth;
	canvas2.height = divwidth;
	canvas2.style.zIndex = 8;
	canvas2.style.position = "absolute";
	canvas2.style.border = "0px solid red";
	document.getElementById('visualization-box').appendChild(canvas2);	

	//create canvas
	var canvas = document.createElement('canvas');
	canvas.id = "canvaslayer";
	canvas.width = divwidth;
	canvas.height = divwidth;
	canvas.style.zIndex = 8;
	canvas.style.position = "absolute";
	canvas.style.border = "0px solid red";
	document.getElementById('visualization-box').appendChild(canvas);

	//create svg
	var svgNS = "http://www.w3.org/2000/svg"; 
	var svg_viz_micro = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg_viz_micro.setAttribute('style', 'border: 0px solid black');
	svg_viz_micro.setAttribute('width', '100%');
	svg_viz_micro.setAttribute('height', '2000px');
	svg_viz_micro.setAttribute('id', 'svg_micro');
	svg_viz_micro.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	document.getElementById('visualization-box').appendChild(svg_viz_micro);

redraw(divwidth);

var resizeId;
$(window).resize(function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});


function doneResizing(){
	divwidth = $('#visualization-box').width();
	redraw(divwidth);
	default_view();
}


function redraw(divwidth){	
//console.log(divwidth);	
	//get circle radius
	var entire_r = divwidth/3;
	var all_rel_ques=[];




	for(var i in all_obj){
		//num times referenced
		//for each unique ID, count
		var rel_ques = all_obj[i].related_questions;
		var rel_pro = all_obj[i].related_prototypes;
		var rel_peo = all_obj[i].people;
		var rel_tool = all_obj[i].related_tools;
		var rel_coll = all_obj[i].related_collections;

		for(var j in rel_ques){
		all_rel_ques.push(rel_ques[j]);
		}
		for(var j in rel_pro){
		all_rel_ques.push(rel_pro[j]);
		}		
		for(var j in rel_peo){
		all_rel_ques.push(rel_peo[j]);
		}	
		for(var j in rel_tool){
		all_rel_ques.push(rel_tool[j]);
		}
		for(var j in rel_coll){
		all_rel_ques.push(rel_coll[j]);
		}	
	}



	//count unique
	var counts = {};
	var uniquenum = [];
	var all_tags = [];
	for (var i = 0; i < all_rel_ques.length; i++) {
	    counts[all_rel_ques[i]] = 1 + (counts[all_rel_ques[i]] || 0);
	}
	
	for(var i in all_obj){
		//GET ALL UNIQUE TAGS
		var rel_tags = all_obj[i].tags;
		for(var k in rel_tags){
			all_tags.push(rel_tags[k]);
		}
		
		//match ids in both arrays and add
		all_obj[i]["counter"] = 1;
		for(var k in counts){
			if(all_obj[i].id == k){
				all_obj[i]["counter"] = counts[k];
			}
		}
	}

	//remove duplicates in tag array
	/*
	var unique_tags = [];
	$.each(all_tags, function(i, el){
	    if($.inArray(el, unique_tags) === -1) {
	    	unique_tags.push({
	    		tag:all_tags[i],
	    		ids: []
	    	});
	    }
	});
	*/

	var unique_tags = [];
	var unique_tags_test = [];
	$.each(all_tags, function(i, el){
	    if($.inArray(el, unique_tags) === -1) {
			unique_tags[all_tags[i]] = [];
	    }
	});

	//order by counter
	function customSort(a,b) {
		if ( a[sort] < b[sort] )
				return -1;
		if ( a[sort] > b[sort] )
				return 1;
		return 0;
	}
	var sort = "type";
	all_obj.sort(customSort);

	//circle radius
	//var mult = 3;
	//var entire_r = windowheight/mult;
	//$('#visualization-box').height(entire_r*mult);

	var highest_data = Math.max.apply(Math,all_obj.map(function(o){return o.counter;}));
	var lowest_data = Math.min.apply(Math,all_obj.map(function(o){return o.counter;}));

	//remap
	var low2 = entire_r*1.08;
	var low1 = lowest_data; //lowest data value
	var high2 = entire_r*1.6;
	var high1 = highest_data; //highest data value	
	//REMAPPING
	function remap(value){
		var value_remapped = low2 + (high2 - low2) * (value - low1) / (high1 - low1);
		return value_remapped;
	}

	var insidesvg = '';
	var ctx = canvas.getContext('2d');
	var ctx2 = canvas2.getContext('2d');
	ctx2.clearRect(0, 0, canvas.width, canvas.height);

	var array_all = [];
	var centerx = Math.round(divwidth/2);
	var centery = Math.round(entire_r*1.6);
	var initialvar = entire_r;
	var n = 360/(all_obj.length);
	var radius = 2;
	var thickness = entire_r/55;
	var color = 'gray';

	for(var i in all_obj){
		var key = all_obj[i].id;
		var thetype = all_obj[i].type;		
		var thecount = 1;
		if(all_obj[i].counter){
			thecount = all_obj[i].counter;
		}
		var lengthvar = remap(thecount);
		if(thetype == 'person'){
			color= '#000000'; //black
		}
		else if(thetype == 'question'){
			color= '#333333'; //red
		}
		else if(thetype == 'activity'){
			color= '#666666'; //orange yellow
		}
		else if(thetype == 'prototype'){
			color= '#888888'; //royal blue
		}
		else if(thetype == 'insight'){
			color= '#aaaaaa'; //forest green
		}
		else if(thetype == 'collection'){
			color= '#bbbbbb';
		}
		else if(thetype == 'tool'){
			color= '#cccccc'; //bright green
		}
		else if(thetype == 'precedent'){
			color= '#dddddd'; //yellow
		}
		else if(thetype == 'reading'){
			color= '#eeeeee'; //hot pink
		}	
		//GET ALL REFS
		var rel_ques = all_obj[i].related_questions;
		var rel_pro = all_obj[i].related_prototypes;
		var rel_peo = all_obj[i].people;
		var rel_tool = all_obj[i].related_tools;
		var rel_coll = all_obj[i].related_collections;

		//for each unique tag, get all associated ids
		for(var k in all_obj[i].tags){
			//unique_tags[all_obj[i].tags[k]].push(all_obj[i].id);
			unique_tags[all_obj[i].tags[k]].push(all_obj[i].id+","+all_obj[i].type);
		}

		var the_tag;
		if(all_obj[i].tags){
			//the_tag = "tag_"+all_obj[i].tags.join(" tag_");
			tags_removespace =[];
			for(m in all_obj[i].tags){
				tags_removespace.push(all_obj[i].tags[m].replace(/ /g,"-"));
			}
			the_tag = "tag_"+tags_removespace.join(" tag_");
		}
		
		var plotxb = Math.round((initialvar*0.9)*Math.cos((i*n) * Math.PI/180)+centerx);
		var plotyb = Math.round((initialvar*0.9)*Math.sin((i*n) * Math.PI/180)+centery);

		var key_refs = [];
		function drawpaths(obj){
			if(obj && all_obj[i]){
				for(var k in obj){
					var refids = GetObjectKeyIndex(all_obj, obj[k]); //get index of ref objects
					if(all_obj[refids] && all_obj[refids].id && obj[k]){
						var lengthxb = Math.round((initialvar*0.9)*Math.cos((refids*n) * Math.PI/180)+centerx);
						var lengthyb = Math.round((initialvar*0.9)*Math.sin((refids*n) * Math.PI/180)+centery);
						key_refs.push(obj[k]);
						//console.log(k+"_"+obj[k]+": "+refids);

						insidesvg += '<g class="vectorconnections '+the_tag+' hlid_'+key+' hlid_'+obj[k]+'"><path d="M'+plotxb+","+plotyb+" C"+plotxb+","+plotyb+" "+centerx+","+centery+" "+lengthxb+","+lengthyb+" "+lengthxb+","+lengthyb+'" stroke-opacity="0.8" fill="transparent" stroke="'+"black"+'" stroke-width="1"></path></g>';
						

						

						ctx2.beginPath();
						ctx2.moveTo(plotxb,plotyb);
						ctx2.bezierCurveTo(plotxb,plotyb,centerx,centery,lengthxb,lengthyb);
						ctx2.lineWidth = 1;
						ctx2.strokeStyle = "black";
						ctx2.globalAlpha = 0.08;
						ctx2.stroke();
						


					}
				}
			}
		}

		drawpaths(rel_ques);
		drawpaths(rel_pro);
		drawpaths(rel_peo);
		drawpaths(rel_tool);
		drawpaths(rel_coll);

		array_all.push({
			key: all_obj[i].id,
			refs: key_refs,
			tags: the_tag,
			type: all_obj[i].type,
			count: thecount,
			color: color,
			plotx: plotx,
			ploty: ploty,
			lengthx: lengthx,
			lengthy: lengthy,
			initialvar: initialvar,
			lengthvar: lengthvar
		});
		




	}

function GetObjectKeyIndex(obj, keyToFind) {
    var i = 0, key;
    for (key in obj) {
        if (obj[key].id == keyToFind) {
            return i;
        }
        i++;
    }
    return null;
}

for(var i in array_all){
	var key = array_all[i].key;
	var refs = array_all[i].refs;
	//for every ref id
	for(var k in refs){
		//search for matching ref id in array_all key
		for(var m in array_all){
			if(refs[k] == array_all[m].key){
				var keysfind = array_all[m].refs;
				//add key to ref array
				array_all[m].refs.push(key)	
			}
		}
	}
}
 

//console.log(all_obj.length);

//console.log(array_all.length);
for(var i in array_all){

	var key = array_all[i].key;
	var label_text = key;//+": "+all_obj[i].tags.join(', ');
	var label_text_title = key+": "+all_obj[i].title;
	var refs = array_all[i].refs;
	var allrefs = "id_"+refs.join(" id_");
	var allrefs_back = "idb_"+refs.join(" idb_");
	var type = array_all[i].type;
	var count = array_all[i].count;
	var color = array_all[i].color;
	var plotx = array_all[i].plotx;
	var ploty = array_all[i].ploty;
	var lengthx = array_all[i].lengthx;
	var lengthy = array_all[i].lengthy;
	var initialvar = array_all[i].initialvar;
	var lengthvar = array_all[i].lengthvar;

	//bars/dots
	var n = 360/(array_all.length);
	var relative_l = (initialvar)-lengthvar;
	var make360 = (initialvar*0.95);
	var plotx = make360*Math.cos((i*n) * Math.PI/180)+centerx;
	var ploty = make360*Math.sin((i*n) * Math.PI/180)+centery;
	var lengthx = (lengthvar+(relative_l/5))*Math.cos((i*n) * Math.PI/180)+centerx;
	var lengthy = (lengthvar+(relative_l/5))*Math.sin((i*n) * Math.PI/180)+centery;
	
	var lengthx2 = ((lengthvar)+(relative_l/5)+10)*Math.cos((i)*n * Math.PI/180)+centerx;
	var lengthy2 = ((lengthvar)+(relative_l/5)+10)*Math.sin((i)*n * Math.PI/180)+centery;

	var the_tags = array_all[i].tags;
  
	var mark_color = "#888888";

    //back lines
    insidesvg += '<g class="backline idback_'+key+' idb_'+allrefs_back+'"><line x1="'+plotx+'" y1="'+ploty+'" x2="'+lengthx+'" y2="'+lengthy+'" stroke="#ffffff" stroke-width="'+thickness+'"></line></g>';


	//colored lines
    insidesvg += '<g id="#id_'+key+'" class="id_'+key+' '+'mainid_'+key+' type_'+type+' '+the_tags+' '+allrefs+' obj_id gselect"><line x1="'+plotx+'" y1="'+ploty+'" x2="'+lengthx+'" y2="'+lengthy+'" stroke="'+color+'" stroke-width="'+thickness+'"></line></g>';

	//test
	insidesvg += '<circle cx="'+plotx+'" cy="'+ploty+'" r="'+1+'" fill="'+mark_color+'" />';



	var rotation = 'transform = "rotate('+((i*n)+0)+' '+(lengthx2)+' '+(lengthy2)+')"';



	//back text
	insidesvg += '<g class="circletext back"><text class="vizlabels id_'+key+' type_'+type+' '+'mainid_'+key+' '+the_tags+' '+allrefs+'" '+rotation+' x="'+lengthx2+'" y="'+lengthy2+'" fill="black" font-size="'+10+'">'+label_text+'</text></g>';


    insidesvg += '<g class="circletext front"><text class="vizlabels id_'+key+' type_'+type+' '+'mainid_'+key+' '+the_tags+' '+allrefs+'" '+rotation+' x="'+lengthx2+'" y="'+lengthy2+'" fill="black" font-size="'+10+'">'+label_text+'</text></g>';
    //insidesvg += '<g class="circletext text_title"><text class="vizlabels id_'+key+' '+'mainid_'+key+' '+the_tags+' '+allrefs+'" '+rotation+' x="'+lengthx2+'" y="'+lengthy2+'" fill="black" font-size="'+10+'">'+label_text_title+'</text></g>';


	var m = (divwidth-(divwidth/6))/(all_obj.length); //width x
	var testx = (i*m)+((divwidth/6)/2)-(thickness); //shift to x center
	var lengthvarb = lengthvar/10;
	var testy1 = (-1*lengthvarb/2)+(centery*2.2)+(relative_l/4);
	var testy2 = (lengthvarb/2)+(centery*2.2)-(relative_l/4);
	var thickness2 = thickness-(thickness/3)

    //back lines
	//insidesvg += '<g class="backline idback_'+key+' idb_'+allrefs_back+'"><line x1="'+testx+'" y1="'+testy1+'" x2="'+testx+'" y2="'+testy2+'" stroke="#ffffff" stroke-width="'+thickness2+'"></line></g>';

	//insidesvg += '<g id="gselect" class="'+'id_'+key+' type_'+type+' '+the_tags+' '+the_tags+' '+'mainid_'+key+' '+allrefs+'"><line x1="'+testx+'" y1="'+testy1+'" x2="'+testx+'" y2="'+testy2+'" stroke="'+color+'" stroke-width="'+thickness2+'"></line></g>';
	//insidesvg += '<circle cx="'+testx+'" cy="'+(centery*2.2)+'" r="'+1+'" fill="'+mark_color+'" />';

	//insidesvg += '<text class="vizlabels id_'+key+' '+the_tags+' type_'+type+' '+'mainid_'+key+' '+allrefs+'" x="'+(testx-10)+'" y="'+(testy2+25)+'" transform = "translate('+0+','+0+') rotate('+90+' '+(testx-3)+' '+(testy2+25)+')" fill="black" font-size="'+10+'">'+label_text+'</text>';
 
}

	function tagfilter(tag_filter){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	//console.log(all_obj);
	var count_color = -1;
	var drawdraw = [];
	var filter_type = "none";


	if(tag_filter && tag_filter.length){
		for(var i in tag_filter){
			if(tag_filter[i].indexOf("type_") !== -1){
				filter_type = 'type';
			}
			else if(tag_filter[i].indexOf("id_") !== -1){
				filter_type = 'id';
			}
		}
	}
		for(var i in unique_tags){
			//console.log(unique_tags[i]);
				var tag_name = i.replace(/ /g,"-");
				if(unique_tags[i].length > 1){
					count_color++;
					var tag_color;
					for(var j in get_colors){
						if(tag_name == get_colors[j].tag){
							tag_color = get_colors[j].color
						}
					}
					//tag_color = '#'+get_colors[count_color]
					//console.log(get_colors[count_color]);
					var countelem = 0;
					for(var p in unique_tags[i]){
						var tag_id = unique_tags[i][p].split(',')[0];
						var tag_type = unique_tags[i][p].split(',')[1];
						


						if(tag_filter && tag_filter.length){
							if(filter_type == "type"){
								if(tag_filter.join(',').indexOf("tag_") !== -1){
								console.log('_____________SHOW FILTERED TAGS UNDER TYPE');
									if(taglist.join(',').indexOf('type_'+tag_type) !== -1 && taglist.join(',').indexOf('tag_'+tag_name) !== -1){
										countelem++;
										drawdraw.push({
											id: tag_id,
											//type: tag_type,
											tag: tag_name,
											color: tag_color
										});
										$(".circletext.front .mainid_"+tag_id).show();
									}
								}else{
								//console.log('_____________SHOW ALL TAGS UNDER TYPE');
									if(taglist.join(',').indexOf('type_'+tag_type) !== -1){
										countelem++;
										drawdraw.push({
											id: tag_id,
											//type: tag_type,
											tag: tag_name,
											color: tag_color
										});
										console.log(tag_name);

										$(".circletext.front .mainid_"+tag_id).show();
									}
								}
							}
							//else if(filter_type == "id"){
							//	console.log('_____________SHOW ID, SINGLE');
							//}
							else{
								console.log('_____________SHOW FILTERED TAGS, NO TYPE');
									if(taglist.join(',').indexOf('tag_'+tag_name) !== -1){
										countelem++;
										drawdraw.push({
											id: tag_id,
											//type: tag_type,
											tag: tag_name,
											color: tag_color
										});
										$(".circletext.front .mainid_"+tag_id).show();
									}
							}
						}else{
							console.log('_____________SHOW ALL TAGS');
								//	if(tag_type == "reading" && tag_name == "2015"){
								countelem++;
								drawdraw.push({
									id: tag_id,
									//type: tag_type,
									tag: tag_name,
									color: tag_color
								});
								$(".circletext.front .mainid_"+tag_id).show();
								//}
						}






						
					}
		        }
		}



var origArr = [
    {food: 'apple', type: 'fruit'},
    {food: 'potato', type: 'vegetable'},
    {food: 'banana', type: 'fruit'}
];

/*[
    {type: 'fruit', foods: ['apple', 'banana']},
    {type: 'vegetable', foods: ['potato']}
]*/

function transformArr(orig) {
    var newArr = [],
        types = {},
        newItem, i, j, cur;
    for (i = 0, j = orig.length; i < j; i++) {
        cur = orig[i];
        if (!(cur.tag in types)) {
            types[cur.tag] = {type: cur.tag,color: cur.color, foods: []};
            newArr.push(types[cur.tag]);
        }
        types[cur.tag].foods.push(cur.id);
    }
    return newArr;
}
var order_drawdraw = transformArr(drawdraw);







		
		//FOR EACH TAG!!! THAT"S THE WIERD LINE PROBLEM (IT"S TRYING TO CONNECT TAGS)
		for(var x in order_drawdraw){
		for (var j=0; j <= order_drawdraw[x].foods.length - 2; j++){
		    for (var k=j+1; k <= order_drawdraw[x].foods.length - 1; k++){

				var refids_tag1 = GetObjectKeyIndex(all_obj, order_drawdraw[x].foods[j]); //get index of ref objects
		        var refids_tag2 = GetObjectKeyIndex(all_obj, order_drawdraw[x].foods[k]); //get index of ref objects
				var x1 = (initialvar*0.9)*Math.cos((refids_tag1*n) * Math.PI/180)+centerx;
				var y1 = (initialvar*0.9)*Math.sin((refids_tag1*n) * Math.PI/180)+centery;
				var x2 = (initialvar*0.9)*Math.cos((refids_tag2*n) * Math.PI/180)+centerx;
				var y2 = (initialvar*0.9)*Math.sin((refids_tag2*n) * Math.PI/180)+centery;
				var val_opacity = 1;

				var g_alpha = 0.5;
				var g_thick = 1;

				ctx.beginPath();
				ctx.moveTo(x1,y1);
				ctx.bezierCurveTo(x1,y1,centerx,centery,x2,y2);
				ctx.strokeStyle = order_drawdraw[x].color;			
				ctx.globalAlpha = g_alpha;
				ctx.lineWidth = g_thick;
				ctx.stroke();
		    }
		}//end for for
		}

	


	}//end tag filter function
	//console.log(unique_tags);
	

	$('#svg_micro').html(insidesvg);




$('.CONTENT').on('mouseover', '.gselect', function() {
	var d_tags = $(this).attr('class').split(' ');
	var d_id = d_tags[0];
	var d_idback = d_id.replace('id_','idback_');
	var d_idb = d_id.replace('id_','idb_');
	for(var i in d_tags){
		if(d_tags[i].toLowerCase().indexOf("tag_") >= 0){
			$("."+d_tags[i]).find('line').attr({'opacity':'0','cursor':'pointer'});
		}
	}
	$("."+d_idback).find('line').attr({'stroke':'red'});
	//tagfilter(d_tags);
	$('#canvaslayer').stop().fadeOut(100);
	$("#canvaslayer2").show().fadeIn(fadespeed);
	if(d_tags.indexOf("tag_") !== -1){
		//$('.thelist').html('no tags');
	}

	$('g').find('path').attr({'opacity':'0','visibility':'visible'});
	$('g').find('line').attr({'opacity':'1'});
	$(".circletext.front").hide();
	//$(".circletext.back").show();
	//console.log(d_id);
	$(".hl"+d_id).find('path').attr({'opacity':'1'});
	$(".main"+d_id).find('line').attr({'opacity':'0'});
	$("."+d_idb).find('line').attr({'stroke':'transparent'});
	$(".circletext.back ."+d_id).show().fadeIn(fadespeed);
	//console.log("test123: "+d_tags);
	
});

$('.CONTENT').on('mouseout', '.gselect', function() {
	$("g").find('line').attr({'opacity':'1'});
	$(".backline").find('line').attr({'stroke':'white'});
	$('#canvaslayer').stop().fadeIn(fadespeed);
	$('.circletext.front').stop().fadeIn(fadespeed);
	$('.circletext.back .vizlabels').hide();
	$('g').find('path').attr({'opacity':'0','visibility':'visible'});
	$("#canvaslayer2").hide();
	if(taglist.length){
	if(taglist.join(',').indexOf("id_") >= 0){
		default_view();
	}	
	}
});


	var key_tags = [];
	for(var i in taglist){
	   	var strip = taglist[i].replace('tag_','');
	   	key_tags.push(strip);
	}

default_view();
function default_view(){
	console.log('DEFAULT VIEW');
	if(taglist.length){//yes filters
		if(taglist.join(',').indexOf("id_") >= 0){
			$("."+taglist.join('').replace('id_','idback_')).find('line').attr({'stroke':'red'});
			$('g').find('path').attr({'opacity':'0','visibility':'visible'});
			$('g').find('line').attr({'opacity':'1'});
			$(".hl"+taglist).find('path').attr({'opacity':'1'});
			$(".main"+taglist).find('line').attr({'opacity':'0'});
			$("."+taglist.join('').replace('id_','idb_')).find('line').attr({'stroke':'transparent'});
			$(".circletext.front ."+taglist).show().fadeIn(fadespeed);
			$("#canvaslayer2").show().fadeIn(fadespeed);
		}else{
			tagfilter(taglist);
		}
	}	
	else{
		tagfilter();//show all
	}
}




}

}

