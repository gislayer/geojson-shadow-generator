

mapboxgl.accessToken = 'pk.eyJ1Ijoid2l6aW9sb25kb25sdGQiLCJhIjoiY205ZDFmZWFwMDZmYTJtc2FkaDh5MmpscCJ9.egxDG7ouai0N3T4ivdFCrg';

var d = new Date();
var t = d.getHours() + d.getMinutes()/60;
if(t<8 || t>18){
  t = 14.5;
}

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [27.0945, 38.4567],
    zoom: 17,
    pitch: 60
});

map.on('load', () => {
  map.addSource('shadows', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: []
    }
  });

  map.addLayer({
    'id': 'shadows',
    'source': 'shadows',
    'type': 'fill',
    'paint': {
      'fill-color': '#000000',
      'fill-opacity': 0.5
    }
  });
    map.addSource('izmir-buildings', {
        type: 'geojson',
        data: geojson
    });

    map.addLayer({
        'id': '3d-buildings',
        'source': 'izmir-buildings',
        'type': 'fill-extrusion',
        'paint': {
            'fill-extrusion-color': '#8bc34a',
            'fill-extrusion-height': ['get', 'elevation'],
            'fill-extrusion-base': 0,
            'fill-extrusion-opacity': 1
        }
    });
    run();

});

const updateShadows = () => {
  var dateValue = date.value;
  var timeValue = time.value;
  var generator = new GeoJSONShadowGenerator(geojson,'elevation');
  const shadows2 = generator.getShadowGeometries({
    type: 'datetime',
    date: dateValue + 'T' + String(Math.floor(timeValue)).padStart(2, '0') + ':' + String(Math.floor((timeValue % 1) * 60)).padStart(2, '0')
  });
  var source = map.getSource('shadows');
  source.setData(shadows2);
}

const timeUpdate = (e) => {
  var dateValue = date.value;
  var timeValue = e.target.value;
  var dateTime = new Date(dateValue);
  var day = dateTime.getDate();
  var month = dateTime.toLocaleString('tr-TR', { month: 'short' });
  var year = dateTime.getFullYear();
  timeDisplay.textContent = `${day} ${month} ${year} ${String(Math.floor(timeValue)).padStart(2, '0')}:${String(Math.floor((timeValue % 1) * 60)).padStart(2, '0')}`;
  updateShadows();
}

const run = () => {
  var date = document.getElementById('date');
  date.value = d.toISOString().split('T')[0];
  var time = document.getElementById('time');
  time.value = t;
  date.addEventListener('change', (e) => {
      console.log(e.target.value);
  });
  time.addEventListener('input', (e) => {  
    timeUpdate(e);
  });
  timeUpdate({target: {value: time.value}});
}


