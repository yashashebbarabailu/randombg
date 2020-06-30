async function dog() {
	return new Promise((resolve, reject) => {
		console.debug("dog");
		const API = "https://random.dog/woof.json";
		axios.get(API).then(response => {
			let data = response.data;
			resolve(data.url);
		}).catch(e => {
			reject(e);
		})
	});
}
