mapInit = function(mapId){
    var mymap = L.map(mapId).setView([45.3254, 14.4499], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(mymap);

    $.each(markerLocations.locations, function(i, location) {
        marker = markerLocations.markers.filter(m => m.id === location.markerId)[0];
        const fontAwesomeIcon = L.divIcon({
            html: '<i class="fa fa-' + marker.icon + ' fa-2x" style="color: ' + marker.color + '"></i>',
            iconSize: [26, 26],
            iconAnchor: [18, 0],
            className: 'myDivIcon'
        });

        L.marker([location.lat, location.lng], { icon:  fontAwesomeIcon})
            .addTo(mymap)
            .bindPopup(location.caption)
    });
}

if (typeof markerLocations !== 'undefined') {
    //mapInit("maplargeid");
    mapInit("mapid");
}