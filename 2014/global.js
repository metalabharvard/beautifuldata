function load_prob_coll(indexname,taglist,data,cmd){	
	//console.log(indexname+':'+taglist+':'+cmd);

	///on page LOAD
	if(cmd == "cmd_load"){

		$('.CONTENT').html('<div id="masonry-grid">GRID</div>');
		console.log('cmd_load');
		var all_obj = [];
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
		//shuffle ids
		shuffle(all_obj);
		//var all_obj = [];
prob_coll('all_nofilter');
	///PROB_COLLECTION START////////////////////////////////////////////////////////////////////////////////////
	// This bit sets up jQuery Masonry

		//start masonry without filters
		
	}
	var $container = $('#masonry-grid');
	$container.masonry({
		columnWidth: '.grid-sizer',
		//"gutter": '.gutter-sizer',
		itemSelector: '.grid-item'
		
		//percentPosition: true
	});
	function prob_coll(filter){
		$('#masonry-grid').html('<div class="if_empty">EMPTY TEST</div>');

		
		for(var i in all_obj){///start all_obj array


			function load_obj(){///start load_obj
				//$('#masonry-grid').append('<div class="object_hldr '+all_obj[i].id+'"></div>');

				$('#masonry-grid').append('<div class="grid-sizer"></div><div class="grid-item id_'+all_obj[i].id+' type_'+all_obj[i].type+'"><div class="grid_item_inner"></div></div>');
				for(m in all_obj[i].tags){
					var tag_removespace = all_obj[i].tags[m].replace(/ /g,"-");
					$('.id_'+all_obj[i].id).addClass("tag_"+tag_removespace);
				}
				$('.id_'+all_obj[i].id).addClass("type_"+all_obj[i].type);
				var thumb = "test";
				var card_id_class = 'card_id_push';
				//HAS NO IMAGES
				if(all_obj[i].type === 'question'){
					thumb = "<div class='object_desc obj_title_question obj_id' id='id_"+all_obj[i].id+"'>"+all_obj[i].title+"</div>";
				}
				else if(all_obj[i].type === 'collection'){
					thumb = "<div class='object_desc obj_title_collection obj_id' id='id_"+all_obj[i].id+"'>"+all_obj[i].title+"</div>";
				}
				else if(all_obj[i].type === 'precedent'){
					thumb = "<div class='object_desc obj_title_precedent obj_id' id='id_"+all_obj[i].id+"'>"+all_obj[i].title+"</div>";
				}
				else if(all_obj[i].type === 'prototype'){
					thumb = "<div class='object_desc obj_title_prototype obj_id' id='id_"+all_obj[i].id+"'>"+all_obj[i].title+"</div>";
				}
				else if(all_obj[i].type === 'tool'){
					thumb = "<div class='object_desc obj_title_tool obj_id' id='id_"+all_obj[i].id+"'>"+all_obj[i].title+"</div>";
					//thumb += "</br>< TOOL LOGO >";
				}
				else if(all_obj[i].type === 'insight'){
					thumb = "<div class='object_desc obj_title_insight obj_id' id='id_"+all_obj[i].id+"'>"+all_obj[i].title+"</div>";
				}
				else if(all_obj[i].type === 'reading'){
					thumb = "<div class='object_desc obj_title_reading obj_id' id='id_"+all_obj[i].id+"'>"+all_obj[i].title+"</div>";
				}



				//HAS IMAGES
				else if(all_obj[i].type === 'person'){
					//thumb = "<span class='object_desc'>Hello "+all_obj[i].first_name+"!</span>";

						card_id_class = 'card_id';

						var thumb = "<img class='object_media obj_id' id='id_"+all_obj[i].id+"' src='img/nametags/"+all_obj[i].nametag+".jpg'/>"	
					    if(all_obj[i].nametag.length > 0){
					    }else{
					    	if(all_obj[i].media.length){
								thumb = "<img class='object_media obj_id' id='id_"+all_obj[i].id+"' src='"+all_obj[i].media[0]+"'/>";
							}else{
								thumb = "<img class='object_media obj_id' id='id_"+all_obj[i].id+"' src='"+all_obj[i].media+"'/>";
							}
					    }
					   // console.log(img.height);



				}
				else if(all_obj[i].type === 'collection'){
					card_id_class = 'card_id';
					if(all_obj[i].media.length){
						thumb = "<img class='object_media obj_id' id='id_"+all_obj[i].id+"' src='"+all_obj[i].media[0]+"'>";	
					}else{
						thumb = "<div class='object_desc obj_title_collection obj_id' id='id_"+all_obj[i].id+"'>"+all_obj[i].title+"</div>";
					}
				}
				else if (all_obj[i].type === 'activity'){
					if(all_obj[i].media.length){
						thumb = "<img class='object_media obj_id' id='id_"+all_obj[i].id+"' src='"+all_obj[i].media[0]+"'>";	
						card_id_class = 'card_id';
					}else{
						thumb = "<div class='object_desc obj_title_activity obj_id' id='id_"+all_obj[i].id+"'>"+all_obj[i].title+"</div>";
					}
				}


				var id;//"<a class='obj_id' href='#id_"+all_obj[i].id+"'>id: "+all_obj[i].id+"</a>";
				var title = "title: <a class='obj_id' id='#id_"+all_obj[i].id+"'>"+all_obj[i].title+"</a>";
				var type = "</br>type: <a class='obj_type' id='#type_"+all_obj[i].type+"'>"+all_obj[i].type+"</a>";
				var tags = "</br>tags: none";
				var related_questions = "";
				var related_prototypes = "";
				var related_tools = "";
				var related_activities = "";
				var people = "";
				var contact = "";
				var media = "";
				var url = "";
				var ref_pro = [];

				if(all_obj[i].tags){if(all_obj[i].tags.length){
					var arr_tags = [];
					for(m in all_obj[i].tags){
						var tag_removespace = all_obj[i].tags[m].replace(/ /g,"-");
						arr_tags.push("<a class='obj_tag t_tag_"+tag_removespace+"' id='#tag_"+tag_removespace+"'>"+all_obj[i].tags[m]+"</a>");
					}
					tags = "</br>tags: "+arr_tags.join(", ");
				}}
				if(all_obj[i].related_questions){if(all_obj[i].related_questions.length){
					var arr_ques = [];
					for(m in all_obj[i].related_questions){
						arr_ques.push("<a class='obj_tag t_ref_"+all_obj[i].related_questions[m]+"' id='#id_"+all_obj[i].related_questions[m]+"'>"+all_obj[i].related_questions[m]+"</a>");
						ref_pro.push("ref_"+all_obj[i].related_questions[m]);
					}
					related_questions = "</br>related questions: "+arr_ques.join(", ");
				}}
				if(all_obj[i].related_prototypes){if(all_obj[i].related_prototypes.length){
					var arr_pro = [];
					for(m in all_obj[i].related_prototypes){
						arr_pro.push("<a class='obj_tag t_ref_"+all_obj[i].related_prototypes[m]+"' id='#id_"+all_obj[i].related_prototypes[m]+"'>"+all_obj[i].related_prototypes[m]+"</a>");
						ref_pro.push("ref_"+all_obj[i].related_prototypes[m]);
					}
					related_prototypes = "</br>related prototypes: "+arr_pro.join(", ");
				}}
				if(all_obj[i].related_tools){if(all_obj[i].related_tools.length){
					var arr_too = [];
					for(m in all_obj[i].related_tools){
						arr_too.push("<a class='obj_tag t_ref_"+all_obj[i].related_tools[m]+"' id='#id_"+all_obj[i].related_tools[m]+"'>"+all_obj[i].related_tools[m]+"</a>");
						ref_pro.push("ref_"+all_obj[i].related_tools[m]);					
					}
					related_tools = "</br>related tools: "+arr_too.join(", ");
				}}
				if(all_obj[i].related_activities){if(all_obj[i].related_activities.length){
					var arr_act = [];
					for(m in all_obj[i].related_activities){
						arr_act.push("<a class='obj_tag t_ref_"+all_obj[i].related_activities[m]+"' id='#id_"+all_obj[i].related_activities[m]+"'>"+all_obj[i].related_activities[m]+"</a>");
						ref_pro.push("ref_"+all_obj[i].related_activities[m]);					
					}
					related_activities = "</br>related activities: "+arr_act.join(", ");
				}}
				if(all_obj[i].people){if(all_obj[i].people.length){
					var arr_peo = [];
					for(m in all_obj[i].people){
						arr_peo.push("<a class='obj_tag t_ref_"+all_obj[i].people[m]+"' id='#id_"+all_obj[i].people[m]+"'>"+all_obj[i].people[m]+"</a>");
						ref_pro.push("ref_"+all_obj[i].people[m]);					
					}
					people = "</br>people: "+arr_peo.join(", ");
				}}
				if(all_obj[i].contact){//if(all_obj[i].contact.length){
					var arr_con = [];
					for(var z in all_obj[i].contact){
						if(all_obj[i].contact[z]){
							if(z == "email"){
								//console.log("email: "+all_obj[i].contact[z]);
								arr_con.push("(email) <a href='mailto:"+all_obj[i].contact[z]+"'>"+all_obj[i].contact[z]+"</a>");
							}
							else if(z == "twitter"){
								//console.log("twitter: "+all_obj[i].contact[z]);
								arr_con.push("(twitter) <a target='_blank' href='http://twitter.com/"+all_obj[i].contact[z]+"'>"+all_obj[i].contact[z]+"</a>");							
							}
							else if(z == "instagram"){
								//console.log("instagram: "+all_obj[i].contact[z]);
								arr_con.push("(instagram) <a target='_blank' href='http://instagram.com/"+all_obj[i].contact[z]+"'>"+all_obj[i].contact[z]+"</a>");							
							}
							else if(z == "linkedin"){
								//console.log("linkedin: "+all_obj[i].contact[z]);
								arr_con.push("(linkedin) <a target='_blank' href='"+all_obj[i].contact[z]+"'>"+all_obj[i].contact[z]+"</a>");							
							}
							else if(z == "website"){
								//console.log("website: "+all_obj[i].contact[z]);
								arr_con.push("(website) <a target='_blank' href='"+all_obj[i].contact[z]+"'>"+all_obj[i].contact[z]+"</a>");							
							}
						}
					}
					if(arr_con.length > 0){
					contact = "</br>contact: "+arr_con.join(", ");
					}
					/*var arr_con = [];
					//for(m in all_obj[i].contact){
						arr_con.push("<a class='image_popup' id='"+all_obj[i].contact[m]+"'>image_"+(parseFloat(m)+1)+"</a>");
						ref_pro.push("ref_"+all_obj[i].contact[m]);					
					//}
					contact = "fsdfsf";*/
				}//}
				if(all_obj[i].media){if(all_obj[i].media.length){
					var arr_med = [];
					for(m in all_obj[i].media){
						arr_med.push("<a class='image_popup' id='"+all_obj[i].media[m]+"'>image_"+(parseFloat(m)+1)+"</a>");
						//arr_med.push("<a class='image_popup' id='"+all_obj[i].media[m]+"'>"+all_obj[i].media[m]+"</a>");
						ref_pro.push("ref_"+all_obj[i].media[m]);					
					}
					media = "</br>media: "+arr_med.join(", ");
				}}
				if(all_obj[i].url){if(all_obj[i].url.length){
					//var arr_url = [];					
					//for(m in all_obj[i].url){
						//arr_url.push("<a class='image_popup' id='"+all_obj[i].url[m]+"'>pdf_"+(parseFloat(m)+1)+"</a>");
						//ref_pro.push("ref_"+all_obj[i].url[m]);			
						console.log(all_obj[i].id+" "+all_obj[i].url[m]);
					//}
					var arr_url = all_obj[i].url.split('/');
					url = "</br>url: <a href='"+all_obj[i].url+"' target='_blank'>"+arr_url[arr_url.length - 1]+"</a>";
					
				}}

				//$('#masonry-grid').append('<div class="object_hldr '+all_obj[i].id+'">'+thumb+id+type+tags+'</div>');
				$('.id_'+all_obj[i].id+' .grid_item_inner').append("<div id='id_"+all_obj[i].id+"' class='obj_id "+card_id_class+"'>id: "+all_obj[i].id+"</div><div class='card_img'>"+thumb+"</div><div class='card_desc'>"+title+type+tags+related_questions+related_prototypes+related_tools+related_activities+people+contact+media+url+"</div>");
				$('.id_'+all_obj[i].id).addClass(ref_pro.join(' '))

			}///end load_obj

			if (filter == 'all_nofilter') {
				load_obj();
			}
			else if (all_obj[i].type && all_obj[i].type.indexOf(filter) > -1) {
				load_obj();
			}
			else if (all_obj[i].tags && all_obj[i].tags.indexOf(filter) > -1) {
				load_obj();
			}

		}///end all_obj array


        var loaded = 0;
		var numImages = $("#masonry-grid").find("img").length;
		
        $("#masonry-grid").find("img").load( function() {
			++loaded;
			$('.loading_ani').html('loading '+loaded+'/'+numImages+' objects');
			/// WHEN ALL IMAGES ARE LOADED, RUN
			if (loaded === numImages) {
				//console.log("NUM OF IMAGES: "+numImages);
				$container.masonry(); //prevents accumulation of space
				console.log('LOADEDDDDDDD');
				$('.loading_ani').html('done!');
				$('.loading_ani').fadeOut(100);
				$('#masonry-grid').css({'visibility':'visible'});
			};
		});

	}

/*
$('.CONTENT').on('click', '#masonry-grid .object_media,#masonry-grid .object_desc', function() {
	var get_id = $(this).parent().parent().parent().attr('class').split(' ');
	for(var i in get_id){
		if(get_id[i].toLowerCase().indexOf("id_") >= 0){
			console.log(get_id[i]);
		}
	}
});*/




	the_filter();

	function the_filter(){
		$('.grid-item .grid_item_inner').css({'background':'white','border':'0px solid red'});
		if(taglist){
			var classnames_all = "."+taglist.join(",.");
			var classnames_narrow = "."+taglist.join(".");
			//console.log(classnames_all);
 			$(".grid-item").hide();
			//$(classnames_narrow).show();
			var the_type = [];
			var the_tags = [];
			//if url includes a type, exclude all other types
			if(classnames_all.toLowerCase().indexOf("type_") >= 0){
				//console.log("HAS TYPE "+classnames_all);
				for(var i in taglist){
					if(taglist[i].toLowerCase().indexOf("type_") >= 0){
						//console.log("THE TYPE "+taglist[i]);
						the_type[0] = taglist[i];
					}else{
						//console.log("THE TYPE TEST"+the_type);
						the_tags.push("."+taglist[i]);
					}
				}
				$("."+the_type).show();
				if(the_tags.length){
					$("."+the_type).not(the_tags.join(",")).hide();
				}
			}
			//if url includes id, show related references
			else if(classnames_all.toLowerCase().indexOf("id_") >= 0){
				console.log('has ID: '+classnames_all);
				


				for(var i in data){
					//console.log('2_TESSTTETSTETET');
					for(var k in data[i]){
						var jsonobj = data[i][k];
						if(jsonobj.id == classnames_all.replace('.id_','')){
							if(jsonobj.related_questions){
								$(".id_"+jsonobj.related_questions.join(',.id_')).show();
							}
							if(jsonobj.related_prototypes){
								$(".id_"+jsonobj.related_prototypes.join(',.id_')).show();
							}
							if(jsonobj.related_tools){
								$(".id_"+jsonobj.related_tools.join(',.id_')).show();
							}
							if(jsonobj.related_collections){
								$(".id_"+jsonobj.related_collections.join(',.id_')).show();
							}
							if(jsonobj.people){
								$(".id_"+jsonobj.people.join(',.id_')).show();
							}
						
						$(".ref_"+classnames_all.replace('.id_','')).show();

						}
					}
				}
				$(classnames_all).show();//.css({'width':($('.grid-sizer').width())*2});

				
			}
			else{
				$(classnames_all).show();
			}


			if(!$('#masonry-grid .grid-item:visible').length){
				$("."+the_type).show();
		  	}

			$(classnames_narrow+" .grid_item_inner").css({'border':'3px solid red'});
			$container.masonry('layout');



		}else {
			//console.log('test');
			$(".grid-item").show();
			$container.masonry('layout');
		}
		//PROB_COLL highlight tags
		$('.CONTENT .obj_tag,.CONTENT .obj_type').css({'background':'transparent', 'color':'red'});
		for(var i in taglist){
			$('.CONTENT .obj_tag.t_'+taglist[i]).css({'background':'red','padding': '0 3px','border-radius': '3px','color':'white'});

			//console.log('.t_'+add_val_array[i]);
		}




	}




}
