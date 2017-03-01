function load_visible_coll(indexname,taglist,data,cmd,get_colors,reject_tags){		
	console.log(indexname+':'+taglist);
	$('.CONTENT').html('<div class="adjust_outer"><div id="json-grid"></div><div id="svg_connections"></div><div id="svg_connections2"></div></div>');
	var collect_y = [];
	var thetypeurl;
	if(taglist){
		for(var i in taglist){
			if(taglist[i].indexOf("type_") !== -1){
				thetypeurl = taglist[i];
			}
		}
	}
	//for each group:
	var tags_under_type = [];

	var all_types = Object.keys(data);
	$('#json-grid').html('<div class="gutter-sizer"></div>');
	for(var i in all_types){
		//make query array		
		//populate JSON html
		var all_objintypes = data[all_types[i]];
		var insert_A ='';
		for(k in all_objintypes){
			if(taglist && taglist.length){
				if(taglist.join(',').indexOf("type_") !== -1){
					if(all_objintypes[k].type == thetypeurl.replace('type_','')){
						for(var p in all_objintypes[k].tags){
							tags_under_type.push(all_objintypes[k].tags[p]);
						}	
					}	
				}
			}			
			var b_obj = all_objintypes[k];
			var c_name = Object.keys(b_obj);
		
			var insert_B = '';
			var insert_B2 = '';
			var arraytest = [];
			var arraytest2 = [];
			for(var m in c_name){
				
				var c_content = b_obj[c_name[m]];
		
				//if array
				if(c_content instanceof Array){
					var tag_arr = [];
					var c_content_arr = []
					for(var n in c_content){
						//if link
						if(c_content[n] && c_content[n].length && c_content[n].indexOf('http') > -1){
							if(n == 0){
								c_content_arr.push('<span class="image_popup url_pop_desc s_'+c_name[m]+'" id="'+c_content[n]+'">"'+c_content[n]+'"</span>');
							}else{
								c_content_arr.push('</br><span class="image_popup url_pop_desc s_'+c_name[m]+'" id="'+c_content[n]+'">"'+c_content[n]+'"</span>');
							}
						}
						else if(c_name[m] == 'tags'){
							c_content_arr.push('<span class="visible_color_1 obj_tag filtype_'+b_obj.type+' tag_'+c_content[n].replace(/ /g,"-")+'" id="tag_'+c_content[n].replace(/ /g,"-")+'">"'+c_content[n]+'"</span>');
							tag_arr.push('tag_'+c_content[n].replace(/ /g,"-")); 
						}						
						else{
							if(c_content[n] === parseInt(c_content[n], 10) || c_content[n] === null){
								if(c_content[n] > 99){
									c_content_arr.push('<span id="id_'+c_content[n]+'" class="id_'+c_content[n]+' visible_color_2 obj_id">'+c_content[n]+'</span>');
								}else{
									c_content_arr.push('<span class="visible_color_2">'+c_content[n]+'</span>');
								}
							}else{
								c_content_arr.push('<span class="visible_color_1">"'+c_content[n]+'"</span>');
							}
						}
					}
					var tag_arr_join = tag_arr.join(' ');
					if(c_content[n] && c_content[n].length && c_content[n].indexOf('http') > -1){
					arraytest.push('<div>'+c_name[m]+': [<div class="visible_shift">'+c_content_arr.join(', ')+'</div>],</div>');
					}else{
					arraytest.push('<div>'+c_name[m]+': ['+c_content_arr.join(', ')+'],</div>');	
					}
					arraytest2.push('<span class="'+tag_arr_join+'" id="'+tag_arr_join+'">'+c_name[m]+'</span>');
				}		
				//if object
				else if(c_content instanceof Object){
					var c_content_arr = []

					for(var n in c_content){
						if(c_content[n]){
							if(n == "email"){
								c_content_arr.push('<span>'+n+': "<a class="url_pop_desc" href="mailto:'+c_content[n]+'">'+c_content[n]+'</a>"</span>');
							}
							else if(n == "twitter"){
								c_content_arr.push('<span>'+n+': "<a target="_blank" class="url_pop_desc" href="http://twitter.com/'+c_content[n]+'">'+c_content[n]+'</a>"</span>');
							}
							else if(n == "instagram"){
								c_content_arr.push('<span>'+n+': "<a target="_blank" class="url_pop_desc" href="http://instagram.com/'+c_content[n]+'">'+c_content[n]+'</a>"</span>');
							}
							else if(n == "linkedin"){
								c_content_arr.push('<span>'+n+': "<a target="_blank" class="url_pop_desc" href="'+c_content[n]+'">'+c_content[n]+'</a>"</span>');
							}
							else if(n == "website"){
								c_content_arr.push('<span>'+n+': "<a target="_blank" class="url_pop_desc" href="'+c_content[n]+'">'+c_content[n]+'</a>"</span>');
							}
						}
					}
					arraytest.push('<div>"'+c_name[m]+'": {'+c_content_arr.join(', ')+'}</div>');	

				}		
				//if not array
				else{
					if(c_content && c_content.length && c_content.indexOf('http') > -1){
						arraytest.push('<div>'+c_name[m]+': <a class="visible_color_1 class="s_'+c_name[m]+'" href="'+c_content+'" target="_blank">"'+c_content+'"</a>,</div>');
					}
					else if(c_name[m] == 'tags'){
						arraytest.push('<div>'+c_name[m]+': <span class="visible_color_1 filtype_'+b_obj.type+' obj_tag tag_'+c_content.replace(/ /g,"-")+'" id="tag_'+c_content.replace(/ /g,"-")+'">"'+c_content+'"</span>,</div>');
					}	
					else{
						if(c_content === parseInt(c_content, 10) || c_content === null){
							//c_content_arr.push('<span class="visible_color_2">'+c_content[n]+'</span>');
							if(c_content > 99){
								arraytest.push('<div>'+c_name[m]+': <span id="id_'+c_content+'" class="visible_color_2 obj_id id_'+c_content+'">'+c_content+'</span>,</div>');
							}else{
								arraytest.push('<div>'+c_name[m]+': <span class="visible_color_2">'+c_content+'</span>,</div>');
							}
							
						}else{
							//c_content_arr.push('<span class="visible_color_1">"'+c_content[n]+'"</span>');
							
							if(c_name[m] == "type"){
								arraytest.push('<div>'+c_name[m]+': <span id="#type_'+c_content+'" class="visible_color_1 obj_type">"'+c_content+'"</span>,</div>');
							}else{
								arraytest.push('<div>'+c_name[m]+': <span class="visible_color_1">"'+c_content+'"</span>,</div>');
							}
						}
						
					}
					arraytest2.push('<span class="obj_tag tag_'+c_content+'" id="tag_'+c_content+'">"'+c_name[m]+'"</span>');
				}
				
			}
			insert_B = arraytest.join('');
			insert_B2 = arraytest2.join(', ');
			insert_A += '<div class="divc c_'+k+' grid-json-item type_'+all_objintypes[k].type+'"><div class="visible_cover1">{</div><div class="divc2">'+insert_B+'</div><div class="visible_cover1">},</div></div>';
			//insert_A += '<div class="divc c_'+k+'">{'+insert_B2+'},</div>';
		}
		//insert_A += '<span class="divc2">object object</span>';
		//create a divs
	/*	if(i >= 0 && i < 5){
			console.log(all_types[i]+" a");
			$('#json-grida').append('<span class="diva a_'+all_types[i]+'">"'+all_types[i]+'": [<span class="divb b_'+all_types[i]+'">'+insert_A+'],</span></span></br>');
		}
		else{
			console.log(all_types[i]+" b");
			$('#json-gridb').append('<span class="diva a_'+all_types[i]+'">"'+all_types[i]+'": [<span class="divb b_'+all_types[i]+'">'+insert_A+'],</span></span></br>');

		}*/


		$('#json-grid').append('<span class="visible_cover2 diva type_'+all_types[i]+'">"<span style="font-weight: normal" class="obj_type" id="#type_'+all_objintypes[k].type+'">'+all_types[i]+'</span>": [<span class="divb b_'+all_types[i]+'">'+insert_A+'],</span></span></br>');
	}
	
 	
	var unique_tags = [];
	$.each(tags_under_type, function(i, el){
	    if($.inArray(el, unique_tags) === -1) unique_tags.push(el);
	});
	//console.log(unique_tags);

redraw();

var resizeId;
$(window).resize(function() {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing, 500);
});


function doneResizing(){
	divwidth = $('#visualization-box').width();
	$("svg").empty();
	redraw();
}


function redraw(){
	var svg_viz_micro2 = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg_viz_micro2.setAttribute('style', 'border: 0px solid black');
	svg_viz_micro2.setAttribute('width', '100%');
	svg_viz_micro2.setAttribute('height', '100%');
	svg_viz_micro2.setAttribute('id', 'svg_micro');
	svg_viz_micro2.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	document.getElementById('svg_connections2').appendChild(svg_viz_micro2);	

	var svgNS = "http://www.w3.org/2000/svg"; 
	var svg_viz_micro = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg_viz_micro.setAttribute('style', 'border: 0px solid black');
	svg_viz_micro.setAttribute('width', '100%');
	svg_viz_micro.setAttribute('height', '100%');
	svg_viz_micro.setAttribute('id', 'svg_micro');
	svg_viz_micro.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink");
	document.getElementById('svg_connections').appendChild(svg_viz_micro);

/*
	function getRandomColor() {
	    var letters = '0123456789ABCDEF'.split('');
	    var color = '#';
	    for (var i = 0; i < 6; i++ ) {
	        color += letters[Math.floor(Math.random() * 16)];
	    }
	    return color;
	}*/


	var thetypeurl;
	for(var i in taglist){
		if(taglist[i].indexOf("type_") !== -1){
			$('.grid-json-item').not('.'+taglist[i]).css({'display':'none'});
			thetypeurl = taglist[i];
		}
	}
	



	//GET TAGS
	if(taglist.length){

			if(taglist.join(',').indexOf("type_") !== -1 && taglist.join(',').indexOf("tag_") !== -1){
				var count_color = -1;
				var color_storage = [];
				for(var i in taglist){
					count_color++;
					var tag_color;	
					for(var j in get_colors){
						if(taglist[i].replace('tag_','') == get_colors[j].tag){
							tag_color = get_colors[j].color
						}
					}			
					if(reject_tags.indexOf(taglist[i]) < 0){//}else{
							console.log('_____________SHOW FILTERED TAGS UNDER TYPE');
							trigger_highlight(taglist[i],tag_color);
					}
				}
			}
			else if(taglist.join(',').indexOf("type_") !== -1){
				//if(reject_tags.indexOf(taglist[i]) < 0){//}else{
					//if(taglist.join(',').indexOf("tag_") !== -1){
					//	console.log('_____________SHOW FILTERED TAGS UNDER TYPE');

					//	trigger_highlight(taglist[i],tag_color);
					//}else{
					console.log('_____________SHOW ALL TAGS UNDER TYPE');
					for(var i in unique_tags){
						//console.log(unique_tags[i].replace(/ /g,"-"));
						count_color++;
						var tag_color;	
						for(var j in get_colors){
							if(unique_tags[i].replace(/ /g,"-") == get_colors[j].tag){
								tag_color = get_colors[j].color
							}
						}
						trigger_highlight('tag_'+unique_tags[i].replace(/ /g,"-"),tag_color);
						//}
					}
					//}
				//}
			}else{
				var count_color = -1;
				var color_storage = [];
				for(var i in taglist){
					count_color++;
					var tag_color;	
					for(var j in get_colors){
						if(taglist[i].replace('tag_','') == get_colors[j].tag){
							tag_color = get_colors[j].color
						}
					}	
					console.log('_____________SHOW FILTERED TAGS, NO TYPE ');
					trigger_highlight(taglist[i],tag_color);
				}
			}
		//}
	}else{
		for(var i in get_colors){
			console.log('_____________SHOW ALL TAGS');
			trigger_highlight('tag_'+get_colors[i].tag,get_colors[i].color);
		}
	}


	function trigger_highlight(class_name,color){
		if(class_name.toLowerCase().indexOf("type_") < 0){

        var coords = []

      
        	$('#json-grid .'+class_name).each(function(i,obj) {
			if ( $(this).closest('.grid-json-item').css('display') == 'none' ){}else{
            	var positionleft = $(this).position().left//+($(this).width()/2);
            	var positiontop = $(this).position().top//+($(this).height()/2);
            	coords.push({x:positionleft,y:positiontop});
			}
       		});
    



        coords.sort(function(a, b) {
		    return parseFloat(a.y) - parseFloat(b.y);
		});
        //console.log("scroll to y: "+coords[0].y);
        if(coords[0]){
	        if(coords[0].y){
	        	collect_y.push(coords[0].y);
	        }else{
	        	collect_y.push(0);
	        }
    	}
        //class_name = id_
        
        if(coords.length > 1){
        	//console.log("connections");
	        if(class_name.indexOf("id_") > -1){
	        	//console.log("id_name: "+class_name);
	        	$('#json-grid .'+class_name).css({'color':"white",'font-weight':'normal','background':"black",'border-radius':'3px'});
		        $('#json-grid .'+class_name).parent().parent().css( "opacity", "1" );
				for (var j=0; j <= coords.length - 2; j++){
		            for (var k=j+1; k <= coords.length - 1; k++){
		                var x1=coords[j].x;
		                var y1=coords[j].y;
		                var x2=coords[k].x;
		                var y2=coords[k].y;
		                //console.log("x1:"+x1+",y1:"+y1+",x2:"+x2+",y2:"+y2);
		                draw_lines(x1,y1,x2,y2,"black",1,1,'0,0');
		            }
	        	}	
	        }else{
	        	//console.log("class_name: "+class_name);
		        $('#json-grid .'+class_name).css({'color':'white','font-weight':'normal','background':color,'border-radius':'3px'});
		        $('#json-grid .'+class_name).parent().parent().css( "opacity", "1" );
				for (var j=0; j <= coords.length - 2; j++){
		            for (var k=j+1; k <= coords.length - 1; k++){
		                var x1=coords[j].x;
		                var y1=coords[j].y;
		                var x2=coords[k].x;
		                var y2=coords[k].y;
		                //console.log("x1:"+x1+",y1:"+y1+",x2:"+x2+",y2:"+y2);
		                draw_lines(x1,y1,x2,y2,color,1,1,'0,0');
		            }
	        	}	
	        }
        }else{
        	//console.log('no connections');
 			$('#json-grid .'+class_name).css({'color':"#aaa",'background':"transparent",'border':'1px solid #aaa','border-radius':'3px'});
		    $('#json-grid .'+class_name).parent().parent().css( "opacity", "1" );       	
        }


    }
    }

	draw_marklines();
	function draw_marklines(){

       /* var coords = []
        $('.'+visible_cover2).each(function(i,obj) {
            var positionleft = $(this).position().left//+($(this).width()/2);
            var positiontop = $(this).position().top//+($(this).height()/2);
            coords.push({x:positionleft,y:positiontop});
        });

        coords.sort(function(a, b) {
		    return parseFloat(a.y) - parseFloat(b.y);
		});
*/
		var mark_pos_left1 = $('.visible_cover1').position().left+5;
		var mark_pos_top1 = $('.visible_cover1').position().top;
		var mark_pos_left2 = $('.visible_cover2').position().left+5;
		var mark_pos_top2 = $('.visible_cover2').position().top;
		//console.log(mark_pos_left1);
		draw_lines2(mark_pos_left1,mark_pos_top1,mark_pos_left1,200000,"#767676",1,1,'1,2');
 		draw_lines2(mark_pos_left2,mark_pos_top2,mark_pos_left2,200000,"#767676",1,1,'1,2');
	}
 



	function draw_lines(val_x1,val_y1,val_x2,val_y2,stroke_color,stroke_weight,opacity,dash){
	    var draw_line = document.createElementNS(svgNS,'line');
	    draw_line.setAttribute('x1',val_x1);
	    draw_line.setAttribute('y1',val_y1);
	    draw_line.setAttribute('x2',val_x2);
	    draw_line.setAttribute('y2',val_y2);
	    //draw_line.setAttribute('id', 'id_you_like');
	    draw_line.setAttribute('stroke',stroke_color);
	    draw_line.setAttribute('stroke-width',stroke_weight);
		draw_line.setAttribute('stroke-opacity',opacity);
		draw_line.setAttribute('stroke-dasharray',dash);
		svg_viz_micro.appendChild(draw_line);
	}
	function draw_lines2(val_x1,val_y1,val_x2,val_y2,stroke_color,stroke_weight,opacity,dash){
	    var draw_line = document.createElementNS(svgNS,'line');
	    draw_line.setAttribute('x1',val_x1);
	    draw_line.setAttribute('y1',val_y1);
	    draw_line.setAttribute('x2',val_x2);
	    draw_line.setAttribute('y2',val_y2);
	    //draw_line.setAttribute('id', 'id_you_like');
	    draw_line.setAttribute('stroke',stroke_color);
	    draw_line.setAttribute('stroke-width',stroke_weight);
		draw_line.setAttribute('stroke-opacity',opacity);
		draw_line.setAttribute('stroke-dasharray',dash);
		svg_viz_micro2.appendChild(draw_line);
	}
    function draw_points(val_x1,val_y1,radius,fill_color,stroke_color,stroke_weight,opacity){
	    var draw_point = document.createElementNS(svgNS,'circle');
	    draw_point.setAttribute('cx',val_x1);
	    draw_point.setAttribute('cy',val_y1);
	    draw_point.setAttribute('r',radius);
	    draw_point.setAttribute('fill',fill_color);
	    draw_point.setAttribute('stroke',stroke_color);
	    draw_point.setAttribute('stroke-opacity',opacity);
	    svg_viz_micro.appendChild(draw_point);
    }

}


}


