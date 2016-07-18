$(document).ready(function(){
    var mapContent = new MapContent();
    mapContent.initMap();
    $("button#add").click(function(){
        mapContent.toggleMarkerListener();
    });
    $("button#delete").click(function(){
        mapContent.deletePolygon();
    });
    $("button#deleteAll").click(function(){
        mapContent.deleteAllPolygons();
    })
});
