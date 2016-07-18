function MapContent(){
    var _this = this;
    _this.map;
    _this.infoWindow;
    _this.polygonsContainer = new PolygonsContainer();

    var markerEventListener = null;

    _this.initMap = function(){
        this.map = new google.maps.Map($("#map")[0], {
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
            _this.polygonsContainer.createPolygon(_this.map);
        }
    };
    var addMarkerEventListener = function(){
        markerEventListener = google.maps.event.addListener(_this.map, 'click', function(event) {
            _this.polygonsContainer.addMarker(event.latLng, _this.map);
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
