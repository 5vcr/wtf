$(document).ready(function() {

    /* Check the location of each desired element */
    $('#hex4').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        $(this).animate({'opacity':'1'},2000);

    });



    $('#hex7').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        $(this).animate({'opacity':'1'},2500);

    });


    $('#hex6').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        $(this).animate({'opacity':'1'},1500);

    });

    $('#hex5').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        $(this).animate({'opacity':'1'},3000);

    });

    $('#hex3').each( function(i){

        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).scrollTop() + $(window).height();

        $(this).animate({'opacity':'1'},1000);

    });

});

$('.hexagon-in2').mouseover(function() {
    $('.graph-title').removeClass('hidden-title');
});
