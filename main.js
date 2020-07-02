function loadImage(url, tries) {
	if (tries == undefined) {
		tries = 0;
		clearInterval(timer);
	}
	if (tries == 3)
		throw "Image loading retry failed"

	$(".progress-div").show();

	$('<img/>')
		.on('load', () => {
			$(".progress-div").hide();
			console.debug("Image loaded");
			$(this).remove();
			$(".bg").css("background-image", `url(${url})`);
			timer = startInterval();
		})
		.on('error', () => {
			$(this).remove();
			try {
				loadImage(url, tries + 1);
			} catch (e) {
				console.debug(e);
				throw e;
			}
		})
		.attr('src', url);
}
async function randomBG(tries) {
	if (tries == undefined)
		tries = 0;
	if (tries == 3)
		throw "Fetch retry failed"

	console.debug("bg change");
	const APIs = [dog]
	try {
		const imageURL = await APIs[getRandomInt(0, APIs.length)]();
		if (!isImage(imageURL)) {
			console.debug(imageURL, "is not image");
			randomBG();
		} else {
			console.debug("random image", imageURL);
			loadImage(imageURL);
		}
	} catch (e) {
		console.error(e);
		try {
			randomBG(tries);
		} catch (error) {
			console.error(error);
		}
	}
}
let timer;
function restartInterval(handle) {
	console.debug("timeout change");
	clearInterval(handle);
	return startInterval();
}
function startInterval() {
	return setInterval(randomBG, Number($("#timeout").val()) * 1000);
}
$(window).on("load", () => {
	console.debug("Started");
	randomBG();

	timer = setInterval(randomBG, 60000);

	$("#timeout").val(60000 / 1000);

	$("#timeout").on("change", () => {
		console.debug("Timeout changed");
		if (isNaN($("#timeout").val())) {
			$("#timeout").addClass("is-danger");
		} else {
			$("#timeout").removeClass("is-danger");
			timer = restartInterval(timer);
		}
	});

	$("#reload-image").on("click", () => {
		console.debug("Click refresh triggered");
		randomBG();
		timer = restartInterval(timer);
	});
});

