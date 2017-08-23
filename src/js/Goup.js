const $ = require("jquery");

$(document).ready(function() {
// Show or hide the sticky footer button
$(window).scroll(function() {
    if ($(this).scrollTop() > 200) {
        $('.goup').fadeIn(200);
    } else {
        $('.goup').fadeOut(200);
    }
});
// Animate the scroll to top
$('.goup').click(function(event) {
    event.preventDefault();
    $('html, body').animate({scrollTop: 0}, 300);
})
});
    