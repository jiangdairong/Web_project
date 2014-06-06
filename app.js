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
		eventView:function(){
			document.getElementById("content").innerHTML=templates.eventView();//volunteer;
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
			"":"indexView",
			"event":"eventView",
			"sharetable":"shareTable",
			"ngo":"ngoView"
		},
		indexView:volunteer.indexView,
		eventView:volunteer.eventView,
		shareTable:volunteer.shareTable,
		ngoView:volunteer.ngoView
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
			FB.api('/me', function (response) {
                        console.log(response);
                        // $("body").append('My links is' + response.link);
                        // $("body").append('My Username is' + response.username); document.getElementsByTagName('body').innerHTML = ""
                        // $("body").append('My ID is' + response.id);
                    });


					FB.api('/me/picture?type=normal', function(response) { // normal/large/squere 
						var str="<img src="+ response.data.url +">";
						$('body').append(str);
					});
					
					

				} else if (response.status === 'not_authorized') {
					console.log("this user is not authorizied your apps");
					FB.login(function (response) {
                        // FB.api('/me/feed', 'post', {message: 'I\'m started using FB API'});
                        if (response.authResponse) { // if user login to your apps right after handle an event
                        	window.location.reload();
                        };
                    }, {
                    	scope: 'user_about_me,email,user_location,user_photos,publish_actions,user_birthday,user_likes'
                    });
				} else {
					console.log("this isn't logged in to Facebook.");
					FB.login(function (response) {
						if (response.authResponse) {
							window.location.reload();
						} else {
                            //alertify.alert('An Error has Occurs,Please Reload your Pages');
                        }
                    });
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




