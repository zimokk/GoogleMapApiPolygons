(function( $ ){
    $.fn.initMap = function() {
        this.each(function(){
            var mapContent = new MapContent(this);
            mapContent.initMap();
            var $nav = $("<nav></nav>");
            var buttonAdd = $("<button class='add'>Add polygon</button>").click(function() {
                mapContent.toggleMarkerListener();
            });
            var buttonDelete = $("<button class='delete'>Delete polygon</button>").click(function() {
                mapContent.deletePolygon();
            });
            var buttonDeleteAll = $("<button class='deleteAll'>Delete all</button>").click(function() {
                mapContent.deleteAllPolygons();
            });
            $(this).append($nav.append(buttonAdd,buttonDelete,buttonDeleteAll));
        });
        return this;
    };
})( jQuery );
$(document).ready(function(){
    $('div.map').initMap();
});
