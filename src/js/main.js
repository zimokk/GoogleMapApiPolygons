$(document).ready(function(){
    var mapContent = new MapContent();
    mapContent.initMap();
    $("button#add").click(function(){
        mapContent.toggleMarkerListener();
    });
});
