$(document).ready(function() {
if ($(window).width() > 786) {
$('.alert').hide().delay(750).slideDown(400);
}
$('.close_btn').click(function() {
$('.close_btn').fadeOut(200);
$('.alert').slideUp(400);
});
});
