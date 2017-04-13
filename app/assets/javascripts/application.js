
//= require jquery
//= require jquery_ujs
//= require bootstrap-sprockets
//= require bootstrap-material-design
//= require d3.v4.min
//= require dimple.v2.3.0.min
//= require bubble-matrix
//= require topojson
//= require map
//= require hexagons
//= require tree_graph

// re: ActiveAdmin:
// In your application.js, require_tree will also ActiveAdmin JS for your entire website.
// Switch to using specifics require for each file.

$('#category-select .checkbox label').on('click', function(){
	$('#summary-category').text("");
	$('#category-select .checkbox label').each(function(i, item) {
		if ($('input', item).is(":checked")) {
			$('#summary-category').append('<li>' + $(this).text() + '</li>')
		}
	});
})

$('#country-select .checkbox label').on('click', function(){
	$('#summary-country').text("");
	$('#country-select .checkbox label').each(function(i, item) {
		if ($('input', item).is(":checked")) {
			$('#summary-country').append('<li>' + $(this).text() + '</li>')
		}
	});
})

$(document).ready(function(){
	$('.dimple-bubble').css('opacity', 1);
  $('#map').css('opacity', 1);
  $('#map').css('filter', 'none');
})
