(function(){
	Parse.initialize("RmleLSMnkCyiCdVpqfWJ562fmhf8vEl4h4NeQKuL","09pdjU4X0sosunvxliKBYV8JLGhEni7F8QLHWBMP");

	var templates = {};
	["indexView","indexView_2","indexView_3","eventView","EventPage","EventDetailView","shareTable","shareTabledetail","ngoView","ngoDetail","NGOPage","aboutView","event_category"/*,"administration_event","artist_event","environment_event","education_event","care_event","activity_event","camp_event","other_event"*/].forEach(function(t){
		var dom = document.getElementById(t);
		templates[t] = doT.template(dom.text);
	});
	var volunteer={
		indexView:function(){
			window.scrollTo(0,0); 
			//document.getElementById("content").innerHTML=templates.indexView();//volunteer;
			var limit = 12; 
			var skip = 0; 

			var Event = Parse.Object.extend("event"); 
			var query = new Parse.Query(Event); 
			// query.limit(limit); 
			// query.skip(skip);
			query.descending("updateAt"); 
			query.find({success: function(results){
				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById('content').innerHTML = templates.indexView(objList);
				query.limit(0);


				var query2 = new Parse.Query(Event);
				query2.descending("count"); 
				query2.find({success: function(results){
					var objList = results.map(function(e){ return e.toJSON() });
					console.log(objList); 
					document.getElementById('content').innerHTML += templates.indexView_2(objList);
					query2.limit(0);


					var query3 = new Parse.Query(Event);
					query3.descending("share_count"); 
					query3.find({success: function(results){
						var objList = results.map(function(e){ return e.toJSON() });
						console.log(objList); 
						document.getElementById('content').innerHTML += templates.indexView_3(objList);
						query3.limit(0);
					}});
				}});
			}});


			

		},
		eventView:function(page){
			//document.getElementById("content").innerHTML=templates.eventView();//volunteer;
			window.scrollTo(0,0); 
			var limit = 12; 
			var skip = (page-1) * limit; 

			var Event = Parse.Object.extend("event"); 
			var query = new Parse.Query(Event); 
			query.limit(limit); 
			query.skip(skip);

			query.find({success: function(results){

				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById('content').innerHTML = templates.eventView(objList);
				query.limit(0);
				query.skip(0);
				var option = {};
				query.count({success: function(count){
					var totalPage = Math.ceil(count / limit);
					var currentPage = parseInt(page); 
					option = {
						'previous': (currentPage === 1) ? 1 : currentPage-1,
						'next': (currentPage === totalPage) ? currentPage : currentPage+1, 
						'current': currentPage,
						'last': totalPage,
					};
					document.getElementById('Event_pagination').innerHTML = templates.EventPage(option);  
				}, error: function(err){}
				});

				$(function(){
					var w = $("#mwt_mwt_slider_scroll").width();
					console.log(w);
					$('#mwt_slider_content').css('height', ($(window).height() - 20) + 'px' ); //將區塊自動撐滿畫面高度
 
					$("#mwt_fb_tab").mouseover(function(){ //滑鼠滑入時
						if ($("#mwt_mwt_slider_scroll").css('right') == '-'+w+'px')
						{
							console.log("jjjjjj");
							$("#mwt_mwt_slider_scroll").animate({ right:'20px' }, 600 ,'swing');
						}
					});
 
 
					$("#mwt_slider_content").mouseleave(function(){　//滑鼠離開後
						$("#mwt_mwt_slider_scroll").animate( { right:'-'+w+'px' },600 ,'swing');	
					});	
				});

				$('#addNewEventBox').click(function(){
					$(this).fancybox({
						'autoScale': true,
						'transitionIn': 'elastic',
						'transitionOut': 'elastic',
						'speedIn': 500,
						'speedOut': 300,
						'autoDimensions': true,
						'centerOnScroll': true,
						'content': $('#inline').html(),
					});
				});
				$('#send').click(function(){
					console.log("new_event");
				/*	new_event = new Event();
            		new_event.set('name', name);
            		new_event.set('time', time);
           		 	new_event.set('location', location);
            		new_event.set('amount', amount);
            		new_event.set('ngo', ngo);
            		new_event.set('contact', contact);
            		new_event.set('phone', phone);
            		new_event.save(null, {
            	 		success: function(new_event){
            	   			console.log("new_event");
            			}
            		});*/
				});
				//query.skip(0); 
				//var option = {};
				/*
				query.count({success: function(count){
					var totalPage = Math.ceil(count / limit);  
					var currentPage = parseInt(page); 
					option = {

						'previous': (currentPage === 1) ? 1 : currentPage-1,
						'next': (currentPage === totalPage) ? currentPage : currentPage+1, 
						'current': currentPage,
						'last': totalPage,
					};
					document.getElementById('pagination').innerHTML = templates.catalogPaginationTemplate(option);  
				}, error: function(err){}  
			});*/


			}});

		},
		EventDetailView:function(eventdetail_id){
			console.log("detail");
			window.scrollTo(0,0); 
			if(eventdetail_id){
				var Event = Parse.Object.extend("event"); 
				var query = new Parse.Query(Event); 
				query.get(eventdetail_id, { 
					success: function(eventdetail){
						document.getElementById('content').innerHTML = templates.EventDetailView(eventdetail.toJSON());

					}, error: function(object, error){
					}
				});
			} else {
				window.location.hash = '';
			}
		},
		shareTable:function(){
			//document.getElementById("content").innerHTML=templates.shareTable();//volunteer;
			window.scrollTo(0,0); 
			var limit = 12; 
			var skip = 0; 

			var Share = Parse.Object.extend("event"); 
			var query = new Parse.Query(Share); 
			// query.limit(limit); 
			// query.skip(skip);
			// query.descending("time"); 

			query.find({success: function(results){

				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById('content').innerHTML = templates.shareTable(objList);
				query.limit(0);
			}});

		},
		shareTabledetail:function(shareTabledetail_id){
			window.scrollTo(0,0); 
			if(shareTabledetail_id){
				var Event = Parse.Object.extend("event"); 
				var query = new Parse.Query(Event); 
				query.get(shareTabledetail_id, { 
					success: function(shareTabledetail){
						document.getElementById('content').innerHTML = templates.shareTabledetail(shareTabledetail.toJSON());

					}, error: function(object, error){
					}
				});
			} else {
				window.location.hash = '';
			}

		},
		ngoView:function(page){
			window.scrollTo(0,0); 
			//document.getElementById("content").innerHTML=templates.ngoView();//volunteer;
			var limit = 12; 
			var skip = (page-1) * limit;

			var Share = Parse.Object.extend("event"); 
			var query = new Parse.Query(Share); 
			query.limit(limit); 
			query.skip(skip);

			query.find({success: function(results){
				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById('content').innerHTML = templates.ngoView(objList);
				query.limit(0);
				query.skip(0);
				var option = {};
				query.count({success: function(count){
					var totalPage = Math.ceil(count / limit);
					var currentPage = parseInt(page); 
					option = {
						'previous': (currentPage === 1) ? 1 : currentPage-1,
						'next': (currentPage === totalPage) ? currentPage : currentPage+1, 
						'current': currentPage,
						'last': totalPage,
					};
					document.getElementById('NGO_pagination').innerHTML = templates.NGOPage(option);  
				}, error: function(err){}
				});
			}});
		},
		ngoDetail:function(ngodetail_id){
			console.log("ngo detail");
			window.scrollTo(0,0); 
			if(ngodetail_id){
				var NGO = Parse.Object.extend("event"); 
				var query = new Parse.Query(NGO); 
				query.get(ngodetail_id, { 
					success: function(ngoDetail){
						document.getElementById('content').innerHTML = templates.ngoDetail(ngoDetail.toJSON());

					}, error: function(object, error){
					}
				});
			} else {
				window.location.hash = '';
			}

		},
		aboutView:function(){
			window.scrollTo(0,0); 
			document.getElementById("content").innerHTML=templates.aboutView();//volunteer;
		},
		event_category:function(category_id){
			window.scrollTo(0,0);
			console.log(category_id);
			if(category_id){
				var Category = Parse.Object.extend("event"); 
				var query = new Parse.Query(Category); 
							console.log("GG");
				if(query.equalTo('tag_type',category_id)){

							console.log("GGQQ");
				
				}


			} else {
				window.location.hash = '';
			}
			$(function(){
				var w = $("#mwt_mwt_slider_scroll").width();
				console.log(w);
				$('#mwt_slider_content').css('height', ($(window).height() - 20) + 'px' ); //將區塊自動撐滿畫面高度
 
				$("#mwt_fb_tab").mouseover(function(){ //滑鼠滑入時
					if ($("#mwt_mwt_slider_scroll").css('right') == '-'+w+'px')
					{
						$("#mwt_mwt_slider_scroll").animate({ right:'20px' }, 600 ,'swing');
					}
				}); 
				$("#mwt_slider_content").mouseleave(function(){　//滑鼠離開後
					$("#mwt_mwt_slider_scroll").animate( { right:'-'+w+'px' },600 ,'swing');	
				});	
			});

			$('#addNewEventBox').click(function(){
				$(this).fancybox({
					'autoScale': true,
					'transitionIn': 'elastic',
					'transitionOut': 'elastic',
					'speedIn': 500,
					'speedOut': 300,
					'autoDimensions': true,
					'centerOnScroll': true,
					'content': $('#inline').html(),
				});
			});
			$('#send').click(function(){
				console.log("new_event");
				/*	new_event = new Event();
		        new_event.set('name', name);
           		new_event.set('time', time);
       			new_event.set('location', location);
       			new_event.set('amount', amount);
            	new_event.set('ngo', ngo);
            	new_event.set('contact', contact);
            	new_event.set('phone', phone);
		        new_event.save(null, {
      		 		success: function(new_event){
        				console.log("new_event");
   					}
            	});*/
			});
			


		},
		/*
		administration_event:function(){
			
			var Administration = Parse.Object.extend("event"); 
			var query = new Parse.Query(Administration); 


			query.find({success: function(results){

				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById("content").innerHTML = templates.administration_event(objList);
				query.limit(0);
			}});

		},
		artist_event:function(){
			
			var Artist = Parse.Object.extend("event"); 
			var query = new Parse.Query(Artist); 


			query.find({success: function(results){

				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById("content").innerHTML = templates.artist_event(objList);
				query.limit(0);
			}});

		},
		environment_event:function(){
			
			var Environment = Parse.Object.extend("event"); 
			var query = new Parse.Query(Environment); 


			query.find({success: function(results){

				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById("content").innerHTML = templates.environment_event(objList);
				query.limit(0);
			}});

		},
		education_event:function(){
			
			var Education = Parse.Object.extend("event"); 
			var query = new Parse.Query(Education); 


			query.find({success: function(results){

				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById("content").innerHTML = templates.education_event(objList);
				query.limit(0);
			}});

		},
		care_event:function(){
			
			var Care = Parse.Object.extend("event"); 
			var query = new Parse.Query(Care); 


			query.find({success: function(results){

				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById("content").innerHTML = templates.care_event(objList);
				query.limit(0);
			}});

		},
		activity_event:function(){
			
			var Activity = Parse.Object.extend("event"); 
			var query = new Parse.Query(Activity); 


			query.find({success: function(results){

				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById("content").innerHTML = templates.activity_event(objList);
				query.limit(0);
			}});

		},
		camp_event:function(){
			
			var Camp = Parse.Object.extend("event"); 
			var query = new Parse.Query(Camp); 


			query.find({success: function(results){

				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById("content").innerHTML = templates.camp_event(objList);
				query.limit(0);
			}});

		},
		other_event:function(){
			
			var Other = Parse.Object.extend("event"); 
			var query = new Parse.Query(Other); 


			query.find({success: function(results){

				var objList = results.map(function(e){ return e.toJSON() });
				console.log(objList); 
				document.getElementById("content").innerHTML = templates.other_event(objList);
				query.limit(0);
			}});

		}*/
	};

	var r=Parse.Router.extend({
		routes:{
			"": 			"indexView",
			"event": 		"tmp_eventView",
			"event/:page/": "eventView",
			"sharetable": 	"shareTable",
			"ngo": 			"tmp_ngoView",
			"ngo/:page/":	"ngoView",
			"eventdetail/:eventdetail_id/": 			"EventDetailView",
			"shareTabledetail/:shareTabledetail_id/": 	"shareTabledetail",
			"ngodetail/:ngodetail_id/": 				"ngoDetail",
			"about": 		"aboutView",
			"category/:category_id": 	"event_category", 
			/*"administration": "administration_event", 
			"artist": 		"artist_event", 
			"environment": 	"environment_event", 
			"education": 	"education_event", 
			"care": 		"care_event", 
			"activity": 	"activity_event", 
			"camp": 		"camp_event", 
			"other": 		"other_event" */
		},
		indexView: 		volunteer.indexView,
		tmp_eventView: function(){
    		return volunteer.eventView(1);
    	},
		eventView: 		volunteer.eventView,
		shareTable: 	volunteer.shareTable,
		tmp_ngoView: function(){
    		return volunteer.ngoView(1);
    	},
		ngoView: 		volunteer.ngoView,
		EventDetailView:volunteer.EventDetailView,
		shareTabledetail:volunteer.shareTabledetail,
		ngoDetail: 		volunteer.ngoDetail,
		aboutView: 		volunteer.aboutView,
		event_category: volunteer.event_category,
		/*administration_event: volunteer.administration_event, 
		artist_event: 	volunteer.artist_event, 
		environment_event: volunteer.environment_event, 
		education_event: volunteer.education_event, 
		care_event: 	volunteer.care_event, 
		activity_event: volunteer.activity_event, 
		camp_event: 	volunteer.camp_event, 
		other_event: 	volunteer.other_event*/
	});

	// Initialize the App
	this.Router=new r;
	Parse.history.start();
})();

//For FB login


window.fbAsyncInit = function () {
	FB.init({
		appId: '299735220203958', 
		xfbml: true,
		version: 'v2.0'
	});


	FB.getLoginStatus(function (response) {
		if (response.status === 'connected') {

			var uid = response.authResponse.userID;
			var accessToken = response.authResponse.accessToken;
			//change_word(name,response.name);
			console.log(response);
			FB.api("/me",function(e){
				console.log(e);
				document.getElementById('name').innerHTML = e.name + "您好^^";	
			});
			FB.api('/me/picture?type=square', function(response) {  // normal/large/squere
				$('#profile').attr("src",response.data.url);
			});

		}else if (response.status === 'not_authorized') {
					
		}else {
					
				}
			});
        }; //<<<<<<<<<<<<<<<init end

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function FacebookLogin(){
	if(document.getElementById('name').innerHTML=="登入"){
		FB.login(function(e){
			if(e.authResponse){
				FB.api("/me",function(e){
					window.authToken=e.authResponse.accessToken
				});
				setTimeout(function(){
				window.location.reload()
				},1e3)
			}
		},{scope:"user_likes,user_photos,publish_actions"})
	}
}
