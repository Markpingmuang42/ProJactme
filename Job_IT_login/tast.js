var service, map, pos, infoWindow, google, directionsService, directionsDisplay, routeLine;


/* create google map & add styling */
function initMap() {

    clicked = null;
    
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer({
    		map: map,
        suppressMarkers: true,
        suppressPolylines: false,
        suppressBicyclingLayer: true,
        polylineOptions: {
            strokeColor: '#0000FF',
            strokeWeight: 3
            }
    });
    directionsDisplay.setMap(map);

    var styledMapType = new google.maps.StyledMapType([{"featureType": "all", "elementType": "geometry.fill", "stylers": [{"weight": "2.00"}]}, {"featureType": "all", "elementType": "geometry.stroke", "stylers": [{"color": "#9c9c9c"}]}, {"featureType": "all", "elementType": "labels.text", "stylers": [{"visibility": "on"}]}, {"featureType": "administrative.locality", "elementType": "labels.text.fill", "stylers": [{"color": "#ac8d93"}]}, {"featureType": "landscape", "elementType": "all", "stylers": [{"color": "#f2f2f2"}]}, {"featureType": "landscape", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}]}, {"featureType": "landscape.man_made", "elementType": "geometry.fill", "stylers": [{"color": "#ffffff"}]}, {"featureType": "poi", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "road", "elementType": "all", "stylers": [{"saturation": -100}, {"lightness": 45}]}, {"featureType": "road", "elementType": "geometry.fill", "stylers": [{"color": "#eeeeee"}]}, {"featureType": "road", "elementType": "labels.text.fill", "stylers": [{"color": "#7b7b7b"}]}, {"featureType": "road", "elementType": "labels.text.stroke", "stylers": [{"color": "#ffffff"}]}, {"featureType": "road.highway", "elementType": "all", "stylers": [{"visibility": "simplified"}]}, {"featureType": "road.arterial", "elementType": "labels.icon", "stylers": [{"visibility": "off"}]}, {"featureType": "transit", "elementType": "all", "stylers": [{"visibility": "off"}]}, {"featureType": "water", "elementType": "all", "stylers": [{"color": "#46bcec"}, {"visibility": "on"}]}, {"featureType": "water", "elementType": "geometry.fill", "stylers": [{"color": "#c8d7d4"}]}, {"featureType": "water", "elementType": "labels.text.fill", "stylers": [{"color": "#070707"}]}, {"featureType": "water", "elementType": "labels.text.stroke", "stylers": [{"color": "#ffffff"}]}],
            {name: 'Styled Map'});
    var chch = {lat: -43.530, lng: 172.646};
    pos = chch;
    
    map = new google.maps.Map(document.getElementById('map'), {
        center: chch,
        zoom: 13,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
        }
    });
    //map.mapTypes.set('styledMapTypestyled_map', styledMapType);
    //map.setMapTypeId('styled_map');

    

    infoWindow = new google.maps.InfoWindow({map: map});

    service = new google.maps.places.PlacesService(map);
    service.nearbySearch({
        location: chch,
        openNow: true && false,
        radius: 5000,
        type: ['cafe']
    }, function (results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
            for (var i = 0; i < results.length; i++) {
                createMarker(results[i]);
            }
        }
    });

    geolocate();
    initAutocomplete();
    
}


function createMarker(place) {
    var marker = new google.maps.Marker({
        map: map,
        icon: '//maps.google.com/mapfiles/ms/micons/green.png',
        position: place.geometry.location
    });
    var request = {
        reference: place.reference
    };

    service.getDetails(request, function (place, status) {
        var open = "";

        if (!place.hasOwnProperty('opening_hours')) {
            open += "No open times provided";
            marker.setIcon('img/greymarker.svg');
        } else if (place.opening_hours.open_now === true) {
            open += "We are Open";
        } else {
            open += "We are Closed";
            marker.setIcon('//maps.google.com/mapfiles/ms/micons/red.png');
        };

        if (status === google.maps.places.PlacesServiceStatus.OK) {
            var contentStr = '<h5>' + place.name + '</h5><p>' + place.formatted_address;
            if (!!place)
                contentStr += '<br>' + open;

            if (!!place.formatted_phone_number)
                contentStr += '<br>' + place.formatted_phone_number;
            if (!!place.website)
                contentStr += '<br><a target="_blank" href="' + place.website + '">' + place.website + '</a></p>';
        } else {
            var contentStr = "<h5>No Result, status=" + status + "</h5>";
        }
        setupInfowindow(marker, infoWindow, contentStr);

    });

    function setupInfowindow(marker, infoWindow, contentStr) {
        marker.addListener('click', function () {
            infoWindow.setContent(contentStr);
            infoWindow.open(map, this);
        });
    }
    
    google.maps.event.addListener(marker, 'click', function () {
        clicked = marker.getPosition();
       calculateAndDisplayRoute(directionsService, directionsDisplay, pos, clicked);
        console.log(clicked);
        
//        clicked = {
//            lat: this.position.lat(),
//            lng: this.position.lng()
//        };
    });
}


function geolocate() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {

            pos = {
//            lat: this.position.lat(),
//            lng: this.position.lng()
                lat: -43.530263,
                lng: 172.640236
            };
            
            
            new google.maps.Marker({
                map: map,
                icon: '//maps.google.com/mapfiles/ms/micons/blue.png',
                position: pos
            });

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
     
            map.setCenter(pos);
            map.setZoom(14);
        }, function () {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
     
    }
     
}



function initAutocomplete() {

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    //map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length === 0) {
            return;
        }

        // Clear out the old markers.
        markers.forEach(function (marker) {
            marker.setMap(null);
        });
        markers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }

            var searched = {
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng()
            };

            infoWindow.setPosition(searched);
            infoWindow.setContent('Location found.');
            map.setCenter(searched);
            map.setZoom(14);

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
                title: place.name,
                position: place.geometry.location
            }));


            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
    });
}


function calculateAndDisplayRoute(directionsService, directionsDisplay, pos, clicked) {
console.log(pos, clicked);
    directionsService.route({
        origin: pos,
        destination: clicked,
        travelMode: google.maps.TravelMode.BICYCLING
    }, function (response, status) {
    		console.log(response, status);
        if (status === google.maps.DirectionsStatus.OK) {

		 			if (routeLine) {
          	// remove old line
          	routeLine.setMap(null);
          }
          
          routeLine = new google.maps.Polyline({
            path: [],
            strokeColor: '#0000FF',
            strokeWeight: 3
          });
          
          var bounds = new google.maps.LatLngBounds();


          var legs = response.routes[0].legs;
          for (i = 0; i < legs.length; i++) {
            var steps = legs[i].steps;
            for (j = 0; j < steps.length; j++) {
              var nextSegment = steps[j].path;
              for (k = 0; k < nextSegment.length; k++) {
                routeLine.getPath().push(nextSegment[k]);
                bounds.extend(nextSegment[k]);
              }
            }
          }

          routeLine.setMap(map);
           // directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}

//if browser doesn't have geolocation then search box shows
function handleLocationError() {
  //  $(".input__wrapper").show();
    
    
     pos = new google.maps.LatLng(-43.530263, 172.640236);
            
            
            new google.maps.Marker({
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/micons/blue.png',
                position: pos
            });

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
     
            map.setCenter(pos);
            map.setZoom(14);
    
}




