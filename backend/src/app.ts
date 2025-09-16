import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import routes from "@routes/index";

const app = express();

const allowedOrigins = [
    "http://localhost:5000", // Frontend origin
    "http://192.168.0.105:5000", // Frontend origin
]


// Allow requests from your frontend origin
app.use(cors({
	origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (!allowedOrigins.includes(origin)) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }   
        return callback(null, true);
    },

	credentials: true
}));

app.use(bodyParser.json());

// Mount all API routes
app.use("/api/v1", routes);

export default app;
