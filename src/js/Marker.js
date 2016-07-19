function Marker(point){
    var _this = this;
    _this.lat = point.lat();
    _this.lng = point.lng();
    _this.toString = function() {
        var resultString = '{"lat":' + _this.lat + ', "lng": ' + _this.lng + '}';
        return resultString;
    }
}
