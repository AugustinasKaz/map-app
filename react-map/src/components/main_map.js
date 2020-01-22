import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../static/main_map.css'
import bars from '../static/media/abc.jpg';
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-train-station.css";
import Navigation from './navigation_bar'


mapboxgl.accessToken = 'pk.eyJ1IjoidGhlcnZhIiwiYSI6ImNrNWgzdTFxYzBkZHQzbnBlZTU5Z2llZW4ifQ.b83IAFYfoxLuLhXtrIUOhg';

class Main_map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 0,
      lat: 0,
      zoom: 2,
      navig_open: false
    };
    this.barsClick = this.barsClick.bind(this);
    this.props_handler = this.props_handler.bind(this);
    this.add_markers = this.add_markers.bind(this);

  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,

    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    var geojson = {
      cities: [
        { city_id: 1, city_name: 'Vilnius', coordinates: ["25.279652", "54.687157"]},
        { city_id: 2, city_name: 'Kaunas', coordinates: ["23.892429", "54.896870"]}
      ]
    }
    geojson.cities.forEach(function (marker) {

      // create a HTML element for each feature
      var el = document.createElement('div');
      el.className = 'marker';

      // make a marker for each feature and add to the map
      new mapboxgl.Marker(el)
        .setLngLat(marker.coordinates)
        .addTo(map);
    });

  }



  barsClick() {
    this.setState({ navig_open: !this.state.navig_open })
  }

  props_handler() {
    this.setState({ navig_open: !this.state.navig_open })
  }

  add_markers(data){
    console.log('sent', data);
  }

  render() {
    console.log(this.props.cities);
    if (this.state.navig_open === false) {
      return (
        <div className="main">
          <div className='sidebarStyle'>
            <div className="corrs_div">
              <span className="corrs_name">Longitude: </span>
              <Odometer animation="count" format=".ddd,dd" duration={5} value={this.state.lng} />
              <span className="corrs_name">Latitude: </span>
              <Odometer animation="count" format=".ddd,dd" duration={5} value={this.state.lat} />
              <span className="corrs_name">Zoom: </span>
              <Odometer animation="count" format=".ddd,dd" duration={10} value={this.state.zoom} />
            </div>
            <div className="bars_div"><img onClick={this.barsClick} className="bar_img" src={bars} /></div>
          </div>

          <div ref={el => this.mapContainer = el} className='mapContainer' />
        </div>
      )
    }
    else {
      const class1 = `mapContainer inactive`
      const class2 = `sidebarStyle inactive`
      return (
        <div className="main">
          <div className={class2}>
            <div className="corrs_div">
              <span className="corrs_name">Longitude: </span>
              <Odometer animation="count" format=".ddd,dd" duration={5} value={this.state.lng} />
              <span className="corrs_name" >Latitude: </span>
              <Odometer animation="count" format=".ddd,dd" duration={5} value={this.state.lat} />
              <span className="corrs_name">Zoom: </span>
              <Odometer animation="count" format=".ddd,dd" duration={10} value={this.state.zoom} />
            </div>
            <div className="bars_div"><img onClick={this.barsClick} className="bar_img" src={bars} /></div>
          </div>

          <div ref={el => this.mapContainer = el} className={class1} />
          <Navigation handler={this.props_handler} />
        </div>
      )
    }
  }
}

export default Main_map;