import { Router } from "express";
import db from "./db.mjs";

const router = Router();

// weight=<,5
router.get("/products", async (req, res) => {
    const { weight } = req.query;

    let query = db.select(["id", "name", "price", "weight"]).from("products");

    if (weight) {
        const [operator, value] = weight.split(",");

        query = query.where("weight", operator, value);
    }

    const products = await query;

    res.json(products);
});

router.get("/products/:id", async (req, res) => {
    const { id } = req.params;

    const [product] = await db.select(["id", "name", "price", "weight"]).from("products").where({ id })

    res.send(product);
});


// entrada dessa rota:
/*
{
    "name": ...,
    "price" ...,
    "weight": ...,
}
*/
router.post("/products", async (req, res) => {
    const { name, price, weight } = req.body;

    if (isNaN(parseFloat(price))) {
        return res.status(400).json({ msg: "price não era número" });
    }

    if (isNaN(parseFloat(weight))) {
        return res.status(400).json({ msg: "weight não era número" });
    }

    const id = await db.insert({ name, price, weight }).into("products").returning("id");

    res.status(201).json({ id, name, price, weight });
});

export default router;
