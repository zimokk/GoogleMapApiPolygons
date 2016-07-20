function MapContent(mapContainer){
    var _this = this;
    var mapContainer = mapContainer;
    _this.map;
    _this.infoWindow;
    var polygonsContainer = new PolygonsContainer();
    var markerEventListener = null;
    _this.initMap = function(){
        this.map = new google.maps.Map(mapContainer, {
            center: {lat: -34.397, lng: 150.644},
            zoom: 10
        });
        this.infoWindow = new google.maps.InfoWindow({map: _this.map});
        setCurrentPosition();
    };
    _this.toggleMarkerListener = function(){
        if(markerEventListener == null){
            addMarkerEventListener();
        }
        else{
            removeMarkerEventListener();
            polygonsContainer.setPolygon(_this.map);
        }
    };
    _this.deletePolygon = function(){
        polygonsContainer.deleteActivePolygon();
    };
    _this.deleteAllPolygons = function(){
        polygonsContainer.deleteAllPolygons();
    };
    _this.exportToJSON = function(){
        var polygonsMarkers = polygonsContainer.export();
        var polygonsJson = JSON.stringify(polygonsMarkers);
        $(mapContainer).children("nav").children("textarea.polygons").val(JSON.stringify(polygonsMarkers));
    };
    _this.importPolygons = function(){
        _this.deleteAllPolygons();
        var inputJSON = $(mapContainer).children("nav").children("textarea.polygons").val();
        var polygonsMarkersArray = JSON.parse(inputJSON);
        if(polygonsMarkersArray.length > 0){
            polygonsContainer.import(polygonsMarkersArray, _this.map);
        }
    };
    var addMarkerEventListener = function(){
        markerEventListener = google.maps.event.addListener(_this.map, 'click', function(event) {
            polygonsContainer.addMarker(event.latLng, _this.map);
        });
    };
    var removeMarkerEventListener = function(){
        markerEventListener.remove();
        markerEventListener = null;
    };
    var setCurrentPosition = function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                _this.infoWindow.setPosition(pos);
                _this.infoWindow.setContent('You are here.');
                _this.map.setCenter(pos);
            }, function() {
                handleLocationError(true, _this.infoWindow, _this.map.getCenter());
            });
        } else {
            handleLocationError(false, _this.infoWindow, _this.map.getCenter());
        }
    };
}
