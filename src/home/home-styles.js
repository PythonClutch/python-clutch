$(function () {
	console.log('test');

	$('.home-category-tab').on('click', function () {
		console.log('hey')
		console.log($('#tab-category'))
		$('#tab-category').attr('checked', true);
	});
});