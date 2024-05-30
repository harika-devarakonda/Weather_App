import React, { useRef, useEffect } from 'react';
import 'ol/ol.css';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector.js';
import Feature from 'ol/Feature.js';
import { Point } from 'ol/geom';
import VectorLayer from 'ol/layer/Vector.js';
import { Style, Icon } from 'ol/style';
import { Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import logo from '../images/1-Phase.png';
import TileJSON from 'ol/source/TileJSON.js';
import { Overlay } from 'ol';
// import { fromLonLat } from 'ol/proj';


function OpenLayersMap({weather}) {
 
  const mapRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
            source:new TileJSON({
                url:'https://api.maptiler.com/maps/ch-swisstopo-lbm-dark/tiles.json?key=NgDuSzwhlUcPa9Nvw38L'
               }),
        }),
      ],
      view: new View({
        center: [0, 0],
        zoom: 2,
        projection:'EPSG:4326'
      }),
    });
    const popupOverlay = new Overlay({
        element: popupRef.current,
        positioning: 'bottom-center',
        stopEvent: false,
      });
      initialMap.addOverlay(popupOverlay);
    if(weather){

    let lat=weather.lat;
    let lon=weather.lon;
    const coordinates = [lon, lat];

initialMap.getView().setCenter(coordinates);
initialMap.getView().setZoom(10);
    let newFeature=new Feature({
        geometry:new Point(coordinates)
      })

      const iconStyle = new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: logo,
          alt:'logo', // Replace with the path to your icon
        }),
      });
      newFeature.setStyle(iconStyle);
      let vectoLayer=new VectorLayer({
        source:new VectorSource({
          features: [newFeature],
        }),
 
      })
      vectoLayer.setZIndex(10);
      initialMap.addLayer(vectoLayer)
      initialMap.on('click', function (evt) {
        const feature = initialMap.forEachFeatureAtPixel(evt.pixel, function (feature) {
          return feature;
        });

        if (feature) {
          const coordinates = feature.getGeometry().getCoordinates();
          const name = weather.name;
          const temperature = weather.temp;
          popupRef.current.innerHTML = `<p>${name}</p><p>${temperature.toFixed()} °</p>`;
          popupOverlay.setPosition(coordinates);
        } else {
          popupOverlay.setPosition(undefined);
        }
      });
    

    }
    // Cleanup function to remove the map on unmounting
    return () => initialMap.setTarget(undefined);
  }, [weather]);

  return (<div>
    <div ref={mapRef} style={{ width: '100%', height: '400px' }}>
    <div ref={popupRef} className="popup"></div>
    </div>
    {/* <div>
      <Link to='HomeApp' element={<HomeApp />}>Heirachy</Link>
    </div> */}
    </div>
);
}

export default OpenLayersMap;