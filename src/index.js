const express = require('express')
const dotenv = require('dotenv');
const {PrismaClient} = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use(express.json())

app.get('/api', (req, res) => {
    res.send("Hello World");
});

app.get("/products", async(req, res) => {
    const products = await prisma.product.findMany()

    res.send(products);
});

app.post("/products", async (req, res) => {
    const newProductData = req.body;

    const product = await prisma.product.create({
        data:{
           name: newProductData.name,
           description: newProductData.description,
           image: newProductData.image,
           price: newProductData.price,    
        },
    });

    res.send({
        data: product,
        message: "Create Success"
    })
});

app.delete("/products/:id", async(req, res) => {
    const id = req.params.id
     await prisma.product.delete({
        where: {
            id: id
        },
    });
    res.send("Product Delete")
});

app.put("/products/:id", async(req, res) => {
    const id = req.params.id
    const productData = req.body;

    if (!(productData.image && productData.description && productData.name && productData.price)){
        return res.status(400).send("Some fieds are missing");
        
    }

    const product = await prisma.product.update({
        where:{
            id: id
        },
        data:{
            description:productData.description,
            image:productData.image,
            name:productData.name,
            price:productData.price,
        },
    });
    res.send({
        data:product,
        messgae:"Success"
    })

})

app.patch("/products/:id", async(req, res) => {
    const id = req.params.id
    const productData = req.body;

    const product = await prisma.product.update({
        where:{
            id: id
        },
        data:{
            description:productData.description,
            image:productData.image,
            name:productData.name,
            price:productData.price,
        },
    });
    res.send({
        data:product,
        messgae:"Success"
    })
});

app.listen(PORT, () => {
    console.log("Express API runningin port: " + PORT);
});