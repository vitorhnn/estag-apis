import { Router } from "express";
import db from "./db.mjs";

const router = Router();

router.get("/products", (req, res) => {
    res.send("Hi!");
});

export default router;
