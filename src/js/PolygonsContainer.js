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
    _this.createPolygon = function(map){
        if(_this.markers.length >= 3){
            var coords = buildCoordsArray();
            var polygon = new google.maps.Polygon({
                paths: coords,
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
            debugger
        }
    };
    _this.deleteAllPolygons = function(){
        _this.all.forEach(function(polygon, number, polygons){
            polygon.setMap(null);
        });
        _this.all = null;
        _this.active = null;
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
    var buildCoordsArray = function(){
        var coords = [];
        _this.markers.forEach(function(marker, number, markers){
            coords.push({
               lat:marker.internalPosition.lat(),
               lng:marker.internalPosition.lng()
            });
        });
        removeMarkers();
        return coords;
    };
}
