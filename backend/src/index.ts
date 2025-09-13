import express from "express";
import { json } from "body-parser";
import { handlePayment } from "./payments/process";

const app = express();
app.use(json());

// Mount handlePayment directly as the route handler
// It handles sending the response itself
app.post("/processPayment", handlePayment);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
