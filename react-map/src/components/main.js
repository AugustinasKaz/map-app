import React from 'react';
import mapboxgl from 'mapbox-gl';
import '../static/main_map.css'
import bars from '../static/media/abc.jpg';
import Odometer from "react-odometerjs";
import "odometer/themes/odometer-theme-train-station.css";
import Navigation from './nav-menu'
import CitiesContext from './context'
import { GoogleNews } from './APIfunction'

mapboxgl.accessToken = 'pk.eyJ1IjoidGhlcnZhIiwiYSI6ImNrNWgzdTFxYzBkZHQzbnBlZTU5Z2llZW4ifQ.b83IAFYfoxLuLhXtrIUOhg';

class Main_map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: 0,
      lat: 0,
      zoom: 2,
      navig_open: false,
      articles: [],
      cities: this.props.cities,
      setCity: this.cityFinder,
      loading: false,
    };
  }


  create_map = () => {
    const data = this.props.cities;
    const articles = this.state.articles;

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/therva/ck5y2mbes1r701inp9asjpdaa',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom,
      maxZoom: 7,
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });
    data.forEach(function (marker) {
      let f_city = articles.filter(function (el) {
        return marker.city_name === el.city
      });
      var el = document.createElement('div');
      el.className = 'marker';
      let info = f_city[0]

      if (info.title_url.length === 6) {
        new mapboxgl.Marker(el)
          .setLngLat(marker.coordinates).setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h5>' + info.city + '</h5><li><a class="popup-text" href=' + info.title_url[1] + '>' + info.title_url[0] + '</li><li><a class="popup-text" href=' + info.title_url[3] + '>' + info.title_url[2] + '</li><li><a class="popup-text" href=' + info.title_url[4] + '>' + info.title_url[5] + '</li>'))
          .addTo(map)
      }
      else if (f_city[0].title_url.length === 4) {
        new mapboxgl.Marker(el)
          .setLngLat(marker.coordinates).setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h5>' + info.city + '</h5><li><a class="popup-text" href=' + info.title_url[1] + '>' + info.title_url[0] + '</li><li><a class="popup-text" href=' + info.title_url[3] + '>' + info.title_url[2] + '</li>'))
          .addTo(map)
      }
      else if (f_city[0].title_url.length === 2) {
        new mapboxgl.Marker(el)
          .setLngLat(marker.coordinates).setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h5>' + info.city + '</h5><li><a class="popup-text" href=' + info.title_url[1] + '>' + info.title_url[0] + '</li>')).addTo(map)
      }
      else {
        new mapboxgl.Marker(el)
          .setLngLat(marker.coordinates).setPopup(new mapboxgl.Popup({ offset: 25 })
            .setHTML('<h5>' + info.city + '</h5><h6>No related articles found</h6>')).addTo(map)
      }
    });

  }




  async componentDidMount() {
    this.setState({ loading: true });
    let tmp_arr = await GoogleNews(this.props.cities)

    this.setState({ articles: tmp_arr }, () => {
      this.setState({ loading: false });
      this.create_map();
    });
  }

  barsClick = () => {
    this.setState({ navig_open: !this.state.navig_open })
  }
  cityFinder = (coors) => {
    this.barsClick()
    this.setState({ lat: coors[1], lng: coors[0], zoom: 6 }, () => {
      this.create_map();
    })
  }

  render() {
    if (this.state.navig_open === false) {
      if (this.state.loading === false) {
        return (
          <div className="main">
            <div className='sidebarStyle'>
              <div className='corrs_div'>
                <span className="corrs_name">Langitude: </span>
                <Odometer value={this.state.lng} duration='3000' format="(.ddd)" />
                <span className="corrs_name">Latitude: </span>
                <Odometer value={this.state.lat} format="(.ddd)" duration='5' />
                <span className="corrs_name">Zoom: </span>
                <Odometer value={this.state.zoom} format="(.ddd)" duration={3000} />
              </div>
              <div className="bars_div"><img alt="bars-logo" onClick={this.barsClick} className="bar_img" src={bars} /></div>
            </div>
            <div className="map_div">
              <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
          </div>
        )
      }
      else {
        return (
          <div className="main">
            <div className='sidebarStyle'>
              <h1 style={{ position: "absolute", left: "47%", top: "4%" }}>Loading...</h1>
              <h5 className="head_info">Fetching Google news data</h5><br />
            </div>
            <div className="map_div">
              <div ref={el => this.mapContainer = el} className='mapContainer' />
            </div>
          </div>
        )
      }
    }
    else {
      const class1 = `map_div inactive`
      const class2 = `sidebarStyle inactive`
      return (
        <div className="main">
          <div className={class2} onMouseDown={this.barsClick}>
            <div className='corrs_div'>
              <span className="corrs_name">Langitude: </span>
              <Odometer value={this.state.lng} duration='3000' format="(.ddd)" />
              <span className="corrs_name">Latitude: </span>
              <Odometer value={this.state.lat} format="(.ddd)" duration='5' />
              <span className="corrs_name">Zoom: </span>
              <Odometer value={this.state.zoom} format="(.ddd)" duration={3000} />
            </div>
          </div>
          <div className={class1} onMouseDown={this.barsClick}>
            <div ref={el => this.mapContainer = el} className='mapContainer' />
          </div>
          <CitiesContext.Provider value={this.state}>
            <Navigation bars_handler={this.barsClick} />
          </CitiesContext.Provider>
        </div>
      )
    }
  }
}

export default Main_map;