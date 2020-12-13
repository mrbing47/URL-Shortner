const longUrl = document.getElementById("long-url");
const shortUrl = document.getElementById("short-url");
const longErr = document.getElementById("long-err");
const shortErr = document.getElementById("short-err");
const submit = document.getElementById("submit");

submit.addEventListener("click", () => {
	if (longUrl.value && shortUrl.value) {
		shortErr.classList.remove("error-visible");
		longErr.classList.remove("error-visible");
		longErr.value = shortErr.value = "";

		fetch("/", {
			method: "post",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				shortUrl: shortUrl.value,
				longUrl: longUrl.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);

				if (data.done) {
					shortUrl.value = longUrl.value = "";
					return;
				}
				if (data.err) {
					if (data.err["long-err"]) {
						console.log(data.err["long-err"]);
						longErr.innerHTML = data.err["long-err"];
						longErr.classList.add("error-visible");
						return;
					}
					if (data.err["short-err"]) {
						console.log(data.err["short-err"]);
						shortErr.innerHTML = data.err["short-err"];
						shortErr.classList.add("error-visible");
						return;
					}
				}
			});
	}
});
