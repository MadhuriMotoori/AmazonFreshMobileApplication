geocoder = new google.maps.Geocoder();

function getCoordinates(address, callback){
    geocoder.geocode({address: address}, function(results, status){
        var location = results[0].geometry.location;
        var coordinates = [location.lat(), location.lng()];
        callback (coordinates, status);
    })
};