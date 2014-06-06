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
			//change_word(name,response.name);
			console.log(response);
			document.getElementById('name').innerHTML = response.name;	

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
function change_word(id,new_text){
	document.getElementById(id).innerHTML = new_text;
}



