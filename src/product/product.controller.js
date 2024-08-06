const express = require('express');
const prisma = require("../db");
const { getAllProducts, getProductById, createProduct, deleteProductById, patchProductById, editProductById } = require('./product.service');

const router = express.Router();

router.get("/:id", async (req,res) => {
    try {
        const id = req.params.id;
        const product = await getProductById(id);
    
        res.send(product);
        
    } catch (error) {
        res.status(400).send(error.message);
    }

});

router.get("/", async(req, res) => {
    const products = await getAllProducts();

    res.send(products);
});

router.post("/", async (req, res) => {
    try {
        const newProductData = req.body;
    
        const product = await createProduct(newProductData);
    
        res.send({
            data: product,
            message: "Create Success"
        });
        
    } catch (error) {
        res.status(400).send(error.message)
    };

});

router.delete("/:id", async(req, res) => {
    try {
        const id = req.params.id
         await deleteProductById(id);
        
    } catch (error) {
        res.status(400).send(error.message);
    }
});

router.put("/:id", async(req, res) => {
    try {
        const id = req.params.id
        const productData = req.body;
    
        if (!(productData.image && productData.description && productData.name && productData.price)){
            return res.status(400).send("Some fields are missing");
            
        }
    
        const product = await editProductById(id, productData);
    
        res.send({
            data: product,
            messgae:"Success"
        });
        
    } catch (error) {
        res.status(400).send(error.message);
    }

})

router.patch("/:id", async(req, res) => {
    try {
        const id = req.params.id;
        const productData = req.body;
    
        const product = await editProductById(id, productData);

        res.send({
            data: product,
            message: "Success",
        });
        
    } catch (error) {
        res.status(400).send(error.message);
    }
    
});

module.exports = router;

