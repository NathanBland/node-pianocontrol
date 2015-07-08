nunjucks.configure('/views', { autoescape: true });

var socket = io();
socket.on('usergetstations', function(data){
  console.log("get stations");
  var res = nunjucks.render('stations.html',{data});
  var container = document.querySelector('#station-list');
  container.innerHTML = res;
  //socket.emit('nt', { my: 'data' });
});
socket.on('songstart', function(data){
  var res = nunjucks.render('song.html',{data});
  var container = document.querySelector('#songs');
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
socket.on('songfinish', function(data){
  var songHistory = document.querySelector('#songHistory');
  var res = nunjucks.render('past.html', {data});
  var item = document.createTextNode(res);
  songHistory.insertBefore(item, songHistory.firstChild);
})
socket.on('stationchange', function(data){
  var container = document.querySelector('#now');
  container.innerHTML = data.name;
});
