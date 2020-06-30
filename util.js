function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
function isImage(url) {
	const ext = ['.jpg', '.gif', '.png', '.jpeg', '.webm'];
	let isImageExt = false;
	ext.forEach((val, i, arr) => {
		isImageExt = isImageExt || url.toLowerCase().endsWith(val);
	});
	return isImageExt;
}