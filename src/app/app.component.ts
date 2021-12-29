import { Component, VERSION, AfterViewInit } from '@angular/core';
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import VectorLayer from 'ol/layer/Vector';
import Geometry from 'ol/geom/Geometry';
import Feature from 'ol/Feature';
import Projection from 'ol/proj/Projection';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';
import Point from 'ol/geom/Point';
import VectorSource from 'ol/source/Vector';
import { fromLonLat } from 'ol/proj';
import { toLonLat } from 'ol/proj';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  name = 'Angular ' + VERSION.major;
  map: Map;

  constructor() {
    // Points
      const paris = new Feature({
        geometry: new Point(fromLonLat([2.353, 48.8566])),
        name: 'Null Island',
      });

      const rennes = new Feature({
        geometry: new Point(fromLonLat([-1.675,48.11])),
        name: 'Null Island',
      });

    // Style 
      paris.setStyle(
        new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/latest/examples/data/bigdot.png',
            scale: 0.1,
          }),
        })
      );

      rennes.setStyle(
        new Style({
          image: new Icon({
            src: 'https://openlayers.org/en/latest/examples/data/bigdot.png',
            scale: 0.1,
          }),
        })
      );

    const vectorSource = new VectorSource({ features: [paris, rennes] });
    const vectorLayer = new VectorLayer({ source: vectorSource });

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([2.353, 48.8566]),
        zoom: 5, //Initial Zoom Level
      }),
    });
  }

  ngAfterViewInit() {
    this.map.setTarget('map');

    this.map.on('singleclick', function (evt) {
      window.alert(toLonLat(evt.coordinate));
    });
  }
}