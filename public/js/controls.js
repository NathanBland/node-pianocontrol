var play = document.querySelector("#button-play");
var pause = document.querySelector("#button-pause");
var skip = document.querySelector("#button-skip");
var up = document.querySelector("#button-up");
var down = document.querySelector("#button-down");
var power = document.querySelector("#button-power");

play.addEventListener("click", function(ev){
	
	ev.preventDefault();
	var result = fetch('/play', {
		method: 'get',
		body: {"Command":'play'}
	});
	result.then(function(response) {
        if (response.status === 200) {
            console.log("submitted successfully");
        }
        console.log(response);
    });
});
pause.addEventListener("click", function(ev){
	
	ev.preventDefault();
	var result = fetch('/pause', {
		method: 'get',
		body: {"Command":'pause'}
	});
	result.then(function(response) {
        if (response.status === 200) {
            console.log("submitted successfully");
        }
        console.log(response);
    });
});
skip.addEventListener("click", function(ev){
	
	ev.preventDefault();
	var result = fetch('/skip', {
		method: 'get',
		body: {"Command":'skip'}
	});
	result.then(function(response) {
        if (response.status === 200) {
            console.log("submitted successfully");
        }
        console.log(response);
    });
});
up.addEventListener("click", function(ev){
	
	ev.preventDefault();
	var result = fetch('/up', {
		method: 'get',
		body: {"Command":'up'}
	});
	result.then(function(response) {
        if (response.status === 200) {
            console.log("submitted successfully");
        }
        console.log(response);
    });
});
down.addEventListener("click", function(ev){
	
	ev.preventDefault();
	var result = fetch('/down', {
		method: 'get',
		body: {"Command":'down'}
	});
	result.then(function(response) {
        if (response.status === 200) {
            console.log("submitted successfully");
        }
        console.log(response);
    });
});

power.addEventListener("click", function(ev){
	
	ev.preventDefault();
	var cmd = '';
	if (power.className.indexOf("on") != -1){
		cmd = 'on'
	} else {
		cmd = 'off';
	}
	var result = fetch('/power', {
		method: 'post',
		type: 'json',
		body: JSON.stringify({"Command":cmd})
	});
	result.then(function(response) {
        if (response.status === 200) {
            console.log("submitted successfully");
        }
        console.log(response);
    });
});