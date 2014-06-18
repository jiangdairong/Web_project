(function(){
	Parse.initialize("RmleLSMnkCyiCdVpqfWJ562fmhf8vEl4h4NeQKuL","09pdjU4X0sosunvxliKBYV8JLGhEni7F8QLHWBMP");

	var templates = {};
	["indexView","indexView_2","indexView_3","eventView","EventPage","EventDetailView","shareTable","shareTabledetail","ngoView","ngoDetail","NGOPage","aboutView","event_category"].forEach(function(t){
		var dom = document.getElementById(t);
		templates[t] = doT.template(dom.text);
	});
	var volunteer={
		indexView:function(){
			window.scrollTo(0,0); 
			var limit = 12; 
			var skip = 0; 

			var Event = Parse.Object.extend("event"); 
			var query = new Parse.Query(Event); 
		
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
						//var url="//www.facebook.com/plugins/like.php?href=https%3A%2F%2Fdevelopers.facebook.com%2Fdocs%2Fplugins%2F&amp;width&amp;layout=button_count&amp;action=like&amp;show_faces=true&amp;share=true&amp;height=21&amp;appId=299735220203958";
						var url = window.location.href;//'http://www.google.com.tw/';
						var encode_url = encodeURIComponent(url);
						$('#fb_likes').attr("src","//www.facebook.com/plugins/like.php?href="+encode_url+"width&amp;layout=button_count&amp;action=like&amp;show_faces=false&amp;share=true&amp;height=21&amp;appId=299735220203958");
					
					}, error: function(object, error){
					}
				});
			} else {
				window.location.hash = '';
			}
		},
		shareTable:function(){
			window.scrollTo(0,0); 
			var limit = 12; 
			var skip = 0; 

			var Share = Parse.Object.extend("event"); 
			var query = new Parse.Query(Share); 
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
				query.equalTo('tag_type',category_id);
				query.find({
					success:function(res){
							//console.log(res);
							var query2 = res.map(function(e){return e.toJSON()});
							console.log(query2);
							document.getElementById("content").innerHTML=templates.event_category(query2);
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
	
					},
					error:function(err){
							console.log(err);
					}
				})
			} else {
				window.location.hash = '';
			}
	


		}
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

 

$(document).on('click', '#send', function(){
	console.log("fancybox");
	var Event = Parse.Object.extend("event"); 
	new_event = new Event();
	var date = new Date($('div#fancybox-content input#activity_time').val());
	new_event.set('name', $('div#fancybox-content input#activity_name').val());
	new_event.set('time', date);
	new_event.set('location',$('div#fancybox-content input#activity_location').val());
	new_event.set('amount', $('div#fancybox-content input#activity_amount').val());
	new_event.set('ngo',$('div#fancybox-content input#activity_ngo').val());
	new_event.set('contact',$('div#fancybox-content input#activity_contact').val());
	new_event.set('phone',$('div#fancybox-content input#activity_phone').val());
	new_event.set('imageURL',$('div#fancybox-content input#activity_imageurl').val());
	new_event.set('ngoURL',$('div#fancybox-content input#activity_ngourl').val());
	new_event.set('ngoimgURL',$('div#fancybox-content input#activity_ngoimgurl').val());
	new_event.set('ngodetail',$('div#fancybox-content input#activity_ngodetail').val());
	new_event.set('tag_type',$('div#fancybox-content select#activity_tag_type').val());
	new_event.set('tag_area',$('div#fancybox-content select#activity_tag_area').val());
	new_event.set('detail',$('div#fancybox-content input#activity_detail').val());
	new_event.save(null, {
		success: function(new_event){
			console.log(new_event);
			$.fancybox.close();
		},
		error : function(new_event,error){
			console.log(error.description,name,location,"QQ");

		} 
	});
});	






