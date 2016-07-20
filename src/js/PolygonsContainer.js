function PolygonsContainer(){
    var _this = this;
    _this.all = [];
    _this.markers = [];
    _this.active = null;
    _this.addMarker = function(location, map){
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        _this.markers.push(marker);
    };
    _this.setPolygon = function(map){
        var coords = buildCoordsArray(_this.markers);
        var polygon = createPolygon(coords,map);
        if(polygon){
            _this.all.push(polygon);
        }
    };
    _this.deleteActivePolygon = function(){
        if(_this.active){
            var index = _this.all.indexOf(_this.active);
            if (index > -1) {
                _this.all.splice(index, 1);
            }
            _this.active.setMap(null);
            _this.active = null;
        }
    };
    _this.deleteAllPolygons = function(){
        _this.all.forEach(function(polygon, number, polygons){
            polygon.setMap(null);
        });
        _this.all = [];
        _this.active = null;
    };
    _this.export = function(){
        var allMarkers = [];
        _this.all.forEach(function(polygon,number,polygons){
            var polygonMarkers = [];
            polygon.getPaths().getArray()[0].getArray().forEach(function(point, number, points){
                polygonMarkers.push(point);
            });
            allMarkers.push(polygonMarkers);
        });
        return allMarkers;
    };
    _this.import = function(polygonsMarkersArray, map){
        polygonsMarkersArray.forEach(function(markersArray, number, polygons){
            var polygon = createPolygon(markersArray,map);
            if(polygon){
                _this.all.push(polygon);
            }
        });
    };
    var createPolygon = function(markersArray,map){
        if(markersArray.length >= 3) {
            markersArray = buildConvexHull(markersArray);
            var polygon = new google.maps.Polygon({
                paths: markersArray,
                strokeColor: 'limegreen',
                strokeOpacity: 0.8,
                strokeWeight: 3,
                fillColor: 'greenyellow',
                fillOpacity: 0.35,
                draggable: true,
                geodesic: true
            });
            polygon.addListener('click', toggleActivity);
            polygon.setMap(map);
            return polygon;
        }
    };
    var toggleActivity = function(){
        var unsetActive = function(){
            if(_this.active){
                _this.active.fillOpacity = 0.35;
                _this.active.setVisible(false);
                _this.active.setVisible(true);
                _this.active = null;
            }
        };
        var setAvtive = function(polygon){
            _this.active = polygon;
            _this.active.fillOpacity = 0.8;
            _this.active.setVisible(false);
            _this.active.setVisible(true);
        };
        if(_this.active == this){
            unsetActive();
        }
        else{
            unsetActive();
            setAvtive(this);
        }
    };
    var removeMarkers = function(){
        _this.markers.forEach(function(marker, number, markers){
            marker.setMap(null);
        });
        _this.markers = [];
    };
    var buildCoordsArray = function(pointsArray){
        var coords = [];
        if(pointsArray.length >= 3){
            pointsArray.forEach(function(point, number, markers){
                coords.push({
                    lat:point.internalPosition.lat(),
                    lng:point.internalPosition.lng()
                });
            });
            coords = buildConvexHull(coords);
            removeMarkers();
        }
        return coords;
    };
    var buildConvexHull = function(pointsArray){
        var convexHull = new ConvexHullGrahamScan();
        var hullPoints;
        var coords = [];
        pointsArray.forEach(function(point, number, markers){
            convexHull.addPoint(point.lat, point.lng);
        });
        hullPoints = convexHull.getHull();
        hullPoints.forEach(function(point, number, markers){
            coords.push({
                lat:point.x,
                lng:point.y
            });
        });
        return coords;
    }
}
