(function( $ ){
    $.fn.initGoogleMap = function() {
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
            var buttonImport = $("<button class='import'>Import</button>").click(function() {
                mapContent.importPolygons();
            });
            var buttonExport = $("<button class='export'>Export</button>").click(function() {
                mapContent.exportToJSON();
            });
            var $textarea = $("<textarea class='polygons'></textarea>");
            $(this).append($nav.append(buttonAdd,buttonDelete,buttonDeleteAll,buttonImport,buttonExport,$textarea));
        });
        return this;
    };
})( jQuery );

$(document).ready(function(){
    $('div').initGoogleMap();
});
