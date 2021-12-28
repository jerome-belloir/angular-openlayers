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

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  name = 'Angular ' + VERSION.major;
  map: Map;

  constructor() {
    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: [174.76, -37.18],
        zoom: 7, //Initial Zoom Level
      }),
    });
  }

  ngAfterViewInit() {
    this.map.setTarget('map');
    this.map.addLayer.Point.Marker([0, 0]);
  }
}
