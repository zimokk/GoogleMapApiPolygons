function MapContent(){
    this.map;
    this.infoWindow;
    var _this = this;
    var setCurrentPosition = function(){
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                _this.infoWindow.setPosition(pos);
                _this.infoWindow.setContent('Location found.');
                _this.map.setCenter(pos);
            }, function() {
                handleLocationError(true, _this.infoWindow, _this.map.getCenter());
            });
        } else {
            // Browser doesn't support Geolocation
            handleLocationError(false, _this.infoWindow, _this.map.getCenter());
        }
    };
    this.initMap = function(){
        this.map = new google.maps.Map($("#map")[0], {
            center: {lat: -34.397, lng: 150.644},
            zoom: 10
        });
        this.infoWindow = new google.maps.InfoWindow({map: _this.map});
        setCurrentPosition();
    };
}
