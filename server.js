import express from "express";
import router from "./router/address.js";

const app = express();
const port = 3000;
const baseUrl = `http://localhost:${port}`;

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/', router)


app.listen(port, () => {
    console.log("Serveur lancé sur : ", baseUrl);
})