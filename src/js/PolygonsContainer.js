function PolygonsContainer(){
    var _this = this;
    _this.all = [];
    _this.markers = [];
    _this.addMarker = function(location, map){
        var marker = new google.maps.Marker({
            position: location,
            map: map
        });
        _this.markers.push(marker);
    }
}
