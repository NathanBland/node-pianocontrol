nunjucks.configure('/views', { autoescape: true });

var socket = io();
socket.on('usergetstations', function(data){
  //console.log(data);
  var res = nunjucks.render('stations.html',{data});
  var container = document.querySelector('#station-list');
  container.innerHTML = res;
  //socket.emit('nt', { my: 'data' });
});
socket.on('songstart', function(data){
  var res = nunjucks.render('song.html',{data});
  var container = document.querySelector('#songs');
  var songHistory = document.querySelector('#songHistory');
  if (container.firstChild != null) {
    var old = container.firstChild.cloneNode(true);
    old.className += '-old';
    var oldProgress = old.querySelector('.progress');

    old.removeChild(oldProgress); //really need to offload this to a function
    var oldTitle = old.querySelector('h2');
    var result = fetch('/youtube/'+oldTitle.innerHTML, {
  		method: 'get'
  	});
    result.then(function(response) {
          if (response.status === 200) {
              console.log("submitted successfully");
              console.log(response);
              console.log('end');
          }
          oldTitle.innerHTML = '<a href="'+response.link+'">'+response.title+'</a>';

          songHistory.insertBefore(old, history.firstChild);
    });
  }
  container.innerHTML = res;
  var lineId = data.startTime.toString();
  var line = new ProgressBar.Line('#a'+lineId, {
      color: '#FCB03C',
      strokeWidth: 3,
      duration: parseInt(data.duration)*1000
  });
  line.set((data.currentTime-data.startTime)/parseInt(data.duration));
  line.animate(1);
});
socket.on('stationchange', function(data){
  var container = document.querySelector('#now');
  container.innerHTML = data.name;
});
