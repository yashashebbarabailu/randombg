function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min)) + min;
}
function checkImage(url) {
	const ext = ['.jpg', '.gif', '.png', '.jpeg', '.webm'];
	let isImageExt = false;
	ext.forEach((val, i, arr) => {
		isImageExt = isImageExt || url.toLowerCase().endsWith(val);
	});
	return isImageExt;
}
function loadImage(url) {
	$(".progress-div").show();
	$('<img/>').on('load', () => {
		$(".progress-div").hide();
		console.debug("image loaded");
		$(this).remove();
		$(".bg").css("background-image", `url(${url})`);
	}).on('error', () => {
		console.debug("image loading error");
		$(this).remove();
		loadImage(url);
	}).attr('src', url);
}

async function getImage(url) {
	return new Promise((resolve, reject) => {
		fetch(url, {
			method: "GET",
			mode: "cors"
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				resolve(data);
			})
			.catch(e => {
				reject(e);
			});
	});
}
async function dogBG() {
	return new Promise((resolve, reject) => {
		console.debug("dogBG");
		const API = "https://random.dog/woof.json";
		getImage(API).then(async result => {
			if (checkImage(result.url)) {
				console.debug("is image");
				resolve(result.url);
			} else {
				console.debug("is not image");
				let url = await dogBG();
				resolve(url);
			}
		}).catch(async e => {
			console.debug("fetch failed", e);
			let url = await dogBG();
			resolve(url);
		})
	});
}
async function randomBG() {
	console.debug("bg change");
	const APIs = [dogBG]
	const url = await APIs[getRandomInt(0, APIs.length)]();
	console.debug(url);
	loadImage(url);
}
randomBG();

let timer = setInterval(randomBG, 60000);
function restartInterval() {
	console.debug("timeout change");
	clearInterval(timer);
	timer = setInterval(randomBG, Number($("#timeout").val()) * 1000);
}
$("#timeout").val(60000 / 1000);
$("#timeout").on("change", () => {
	if (isNaN($("#timeout").val())) {
		$("#timeout").addClass("is-danger");
	} else {
		$("#timeout").removeClass("is-danger");
		restartInterval();
	}
});


$("#reload-image").on("click", () => {
	randomBG();
	restartInterval();
});

$(".bg").on("drag", (e) => {
	console.debug(e, "test");
});