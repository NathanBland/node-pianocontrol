var play = document.querySelector("#button-play");
var pause = document.querySelector("#button-pause");
var skip = document.querySelector("#button-skip");
var up = document.querySelector("#button-up");
var down = document.querySelector("#button-down");
var power = document.querySelector("#button-power");
var details = document.querySelector("#button-details");
var stations = document.querySelector("#button-stations");
var getList = document.querySelector("#button-getList");
var btnHistory = document.querySelector("#button-history");

function toggle_visibility(id) {
   var e = document.getElementById(id);
   if(e.style.display == 'none')
      e.style.display = 'block';
   else
      e.style.display = 'none';
}

play.addEventListener("click", function(ev){

	ev.preventDefault();
	var result = fetch('/play', {
		method: 'get'
	});
	result.then(function(response) {
        if (response.status === 200) {
					var line = document.querySelector('#progress')
					//line.animate(1);
        }
        console.log(response);
    });
});
pause.addEventListener("click", function(ev){

	ev.preventDefault();
	var result = fetch('/pause', {
		method: 'get'
	});
	result.then(function(response) {
        if (response.status === 200) {
						var line = document.querySelector('#progress')
						//line.stop();
        }
        console.log(response);
    });
});
skip.addEventListener("click", function(ev){

	ev.preventDefault();
	var result = fetch('/skip', {
		method: 'get'
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
		method: 'get'
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
		method: 'get'
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
	var cmd = {};
	var action = '';
	console.log(power.className.indexOf("on"));
	if (power.className.indexOf("power") < 0){
		cmd = {action: 'on', button: 'Off'};
		action = 'power'
	} else {
		cmd = {action: 'off', button: 'On'};

	}

	var result = fetch('/power/'+cmd.action, {
		method: 'get',
		type: 'json'
	});
	result.then(function(response) {
        if (response.status === 200) {
            console.log("submitted successfully");
						power.className = "pure-button " +action;
						power.innerHTML = '<i class="fa fa-power-off"></i> Turn '+cmd.button;
        }
        console.log(response);
    });
});
getList.addEventListener("click", function(ev){
	ev.preventDefault();
	var oldClass = getList.firstChild.className;
	getList.firstChild.className += ' fa-spin';
	var result = fetch('/getStations/', {
		method: 'get',
		type: 'json'
	});
	result.then(function(response) {
        if (response.status === 200) {
        	setTimeout(function(){
        		getList.firstChild.className = oldClass;
        	}, 2000);
        }
    });
});

details.addEventListener("click", function(ev){
	ev.preventDefault();
	toggle_visibility('control-details');
});
stations.addEventListener("click", function(ev){
	ev.preventDefault();
	toggle_visibility('station-list');
});
btnHistory.addEventListener("click", function(ev){
	ev.preventDefault();
	toggle_visibility('songHistory');
});