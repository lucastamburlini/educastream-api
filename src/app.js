const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const morgan = require("morgan");
// const routes = require("./routes/index.js");
const courseRoutes = require("./routes/courseRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const categoryRoutes = require("./routes/categoryRoutes.js");
const ratingRoutes = require("./routes/ratingRoutes.js");
const onSaleRoutes = require("./routes/onSaleRoutes.js");
const lessonRoutes = require("./routes/lessonRoutes.js");
const stripeRoutes = require("./routes/StripeRoutes.js");
//const routes = require("./routes/index.js");

require("./db.js");

const server = express();
server.use(express.json());
server.name = "API";

server.use(bodyParser.urlencoded({ extended: true, limit: "50mb" }));
server.use(bodyParser.json({ limit: "50mb" }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Credentials", "true");
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
	res.setHeader(
		'Access-Control-Allow-Headers',
		'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
	)
	next();
});
// server.use("/courses", courseRoutes);
// server.use("/", routes);
server.use("/onSale", onSaleRoutes);
server.use("/users", userRoutes);
server.use("/courses", courseRoutes);
server.use("/categories", categoryRoutes);
server.use("/rating", ratingRoutes);
server.use("/lessons", lessonRoutes);
server.use("/payment", stripeRoutes);


// Error catching endware.
server.use((err, req, res, next) => {
	// eslint-disable-line no-unused-vars
	const status = err.status || 500;
	const message = err.message || err;
	console.error(err);
	res.status(status).send(message);
});

module.exports = server;
