$(function () {
	console.log('test');

	$('.home-category-tab').on('click', function () {
		console.log('hey');
		console.log($('#tab-category'));
		$('#tab-category').attr('checked', true);
	});

	console.log(window.location.href);

	if (window.location.href === 'http://localhost:5000/#/home') {
		window.location.href = 'http://localhost:5000/#/home' + '/projects';
	}

});