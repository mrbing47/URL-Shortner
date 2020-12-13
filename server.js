const path = require("path");
const express = require("express");
const app = express();
const morgan = require("morgan");
const validUrl = require("valid-url");

const urls = {
	google: "https://google.com",
};

app.use(morgan("short"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
	res.sendFile(__dirname + "/public/index/index.html");
});

app.post("/", (req, res) => {
	const longUrl = req.body.longUrl;
	const shortUrl = req.body.shortUrl;

	console.log(req.body);

	if (validUrl.isUri(longUrl)) {
		if (!urls[shortUrl]) {
			urls[shortUrl] = longUrl;

			res.json({
				done: true,
			});
			return;
		} else {
			res.json({
				err: {
					"short-err": "This path is not available.",
				},
			});

			return;
		}
	} else {
		res.json({
			err: {
				"long-err": "Not a valid URL",
			},
		});

		return;
	}
});

app.get("/urls/all", (req, res) => {
	res.json(urls);
});

app.get("/:url", (req, res) => {
	const url = req.params.url;

	console.log("Requested URL =>", url);

	if (urls[url]) {
		console.log("eh");
		res.redirect(urls[url]);
		return;
	}

	res.sendFile(__dirname + "/public/404error/404error.html");
});

const PORT = process.env.PORT || 4769;
app.listen(PORT, () => {
	console.log("Listening to PORT =>", PORT);
});
