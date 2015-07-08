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
    fetch('/youtube/'+oldTitle.innerHTML, {
  		method: 'get'
  	}).then(function(response) {
          if (response.status === 200) {
            return  response;
          } else {
            var err = new Error(response.statusText);
            error.response = response;
            throw error;
          }
    }).then(function(response){
      return response.json();
    }).then(function(data){
      console.log(data);
      oldTitle.innerHTML = '<a class="pure-button" href="'+data.link+'">'+data.title+'</a>';
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
