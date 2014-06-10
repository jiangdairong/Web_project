(function(){
	Parse.initialize("HVZ68Vw5dKVbUCVQ7Sajw0zLsNC5PXQomFEB6Pik","IhuKmbx9FQe2k8U8rye3P6H7ZVlpj5yWxrnKU3Cu");

	var templates = {};
	["indexView","eventView","shareTable","ngoView"].forEach(function(t){
		var dom = document.getElementById(t);
		templates[t] = doT.template(dom.text);
	});
	var volunteer={
		indexView:function(){
			document.getElementById("content").innerHTML=templates.indexView();//volunteer;
			},
		eventView:function(page){
			//document.getElementById("content").innerHTML=templates.eventView();//volunteer;
			window.scrollTo(0,0); 
			var limit = 12; 
			var skip = (page-1) * limit; 

			var Event = Parse.Object.extend("Event"); 
			var query = new Parse.Query(Event); 
			query.limit(limit); 
			query.skip(skip);
			query.descending("time"); 

			query.find({success: function(results){

				var objList = results.map(function(e){ return e.toJSON() }); 
				document.getElementById('content').innerHTML = templates.eventView();
				query.limit(0);
				query.skip(0); 
				var option = {};
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
		shareTable:function(){
			document.getElementById("content").innerHTML=templates.shareTable();//volunteer;
			},
		ngoView:function(){
			document.getElementById("content").innerHTML=templates.ngoView();//volunteer;
			}
	};

	var r=Parse.Router.extend({
		routes:{
			"": 			"indexView",
			"event/:page/": "eventView",
			"sharetable": 	"shareTable",
			"ngo": 			"ngoView"
		},
		indexView: 		volunteer.indexView,
		eventView: 		volunteer.eventView,
		shareTable: 	volunteer.shareTable,
		ngoView: 		volunteer.ngoView
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
			document.getElementById('name').innerHTML = e.name ;	
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
function arise(){
	  $( "#dialog-form" ).dialog({
      autoOpen: false,
      height: 300,
      width: 350,
      modal: true,
      buttons: {
        "Create an account": function() {
          var bValid = true;
          allFields.removeClass( "ui-state-error" );
 
          bValid = bValid && checkLength( name, "username", 3, 16 );
          bValid = bValid && checkLength( email, "email", 6, 80 );
          bValid = bValid && checkLength( password, "password", 5, 16 );
 
          bValid = bValid && checkRegexp( name, /^[a-z]([0-9a-z_])+$/i, "Username may consist of a-z, 0-9, underscores, begin with a letter." );
          // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
          bValid = bValid && checkRegexp( email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com" );
          bValid = bValid && checkRegexp( password, /^([0-9a-zA-Z])+$/, "Password field only allow : a-z 0-9" );
 
          if ( bValid ) {
            $( "#users tbody" ).append( "<tr>" +
              "<td>" + name.val() + "</td>" +
              "<td>" + email.val() + "</td>" +
              "<td>" + password.val() + "</td>" +
            "</tr>" );
            $( this ).dialog( "close" );
          }
        },
        Cancel: function() {
          $( this ).dialog( "close" );
        }
      },
      close: function() {
        allFields.val( "" ).removeClass( "ui-state-error" );
      }
    });
 
    $( "#arise_event" )
      .button()
      .click(function() {
        $( "#dialog-form" ).dialog( "open" );
      });
}

$(function(){
	var w = $("#mwt_slider_content").width();
	$('#mwt_slider_content').css('height', ($(window).height() - 20) + 'px' ); //將區塊自動撐滿畫面高度

	$("#mwt_fb_tab").mouseover(function(){ //滑鼠滑入時
		if ($("#mwt_mwt_slider_scroll").css('right') == '-'+w+'px')
		{
			$("#mwt_mwt_slider_scroll").animate({ right:'0px' }, 600 ,'swing');
		}
	});


	$("#mwt_slider_content").mouseleave(function(){　//滑鼠離開後
		$("#mwt_mwt_slider_scroll").animate( { right:'-'+w+'px' }, 600 ,'swing');	
	});	
});



