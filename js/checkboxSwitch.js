$(".chb").change(function() {
    $(".chb").not(this).prop('checked', false);
});