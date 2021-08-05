import { Router } from "express";
import db from "./db.mjs";
import { v2tov1, v1tov2 } from "./convert.mjs";

const router = Router();

router.get("/v1/products", async (req, res) => {
    // weight=<,5
    const { weight } = req.query;

    let query = db.select(["id", "name", "price", "weight"]).from("products");

    if (weight) {
        const [operator, value] = weight.split(",");

        query = query.where("weight", operator, value);
    }

    let products = await query;

    products = products.map(product => ({
        ...product,
        price: v2tov1(product.price),
    }));

    res.json(products);
});

router.get("/v1/products/:id", async (req, res) => {
    const { id } = req.params;

    const [product] = await db.select(["id", "name", "price", "weight"]).from("products").where({ id })

    product.price = v2tov1(product.price);

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
router.post("/v1/products", async (req, res) => {
    const { name, price, weight } = req.body;

    const convertedPrice = v1tov2(price);

    if (isNaN(parseFloat(price))) {
        return res.status(400).json({ msg: "price não era número" });
    }

    if (isNaN(parseFloat(weight))) {
        return res.status(400).json({ msg: "weight não era número" });
    }

    const id = await db.insert({ name, price: convertedPrice, weight }).into("products").returning("id");

    res.status(201).json({ id, name, price, weight });
});

export default router;
