
// Connecting to Firebase
var config = {
    apiKey: "AIzaSyDyO8BtSzWyOqhNioEvD0QqSFOfaCnmCQQ",
    authDomain: "reservation-site-15a0c.firebaseapp.com",
    databaseURL: "https://reservation-site-15a0c.firebaseio.com",
    projectId: "reservation-site-15a0c",
    storageBucket: "reservation-site-15a0c.appspot.com",
    messagingSenderId: "604497794972"
  };
  firebase.initializeApp(config);
  var database = firebase.database();

//Top Image Slideshow
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1} 
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none"; 
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block"; 
  dots[slideIndex-1].className += " active";
}

//Create an Object for Reservation Data
	var reservationData = {};

	$('#dropdown-content li').on('click', function() {
	  reservationData.day = $(this).text();
});
$('.reservation-form').on('submit', function(event) {
  event.preventDefault();

  reservationData.name = $('.reservation-name').val();
	
  var reservationsReference = database.ref('reservations');
  reservationsReference.push(reservationData);

});
function getReservations() {

  database.ref('reservations').on('value', function(results) {

      var allReservations = results.val();

      $('.reservations').empty();

    for (var reservation in allReservations) {
      var context = {
        name: allReservations[reservation].name,
        day: allReservations[reservation].day,
        reservationId: reservation
      };
	var source = $("#reservation-template").html();

  var template = Handlebars.compile(source);

  var reservationListItem = template(context);

  $('.reservations').append(reservationListItem);

    }
  });
}

//GOOGlE Map

function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 41.8846582, lng: -87.64766680000002},
    zoom: 10,
    scrollwheel: false
  });
  var marker = new google.maps.Marker({
    position: {lat: 41.8846582, lng: -87.64766680000002},
    map: map,
    title: 'Au Cheval'
  });
}
initMap();