const prisma = require("../db");

const findProducts = async () => {
    const products = await prisma.product.findMany();

    return products;
};

const findProductsById = async (id) => {
    const product = await prisma.product.findUnique({
        where:{
            id: id,
        },
    });

    return product;
};

const findProductByName = async (name) => {
    const product = await prisma.product.findFirst({
        where:{
            name: name,
        },
    });

    return product;
}

const insertProduct = async(newProductData) => {
    const product = await prisma.product.create({
        data:{
           name: newProductData.name,
           description: newProductData.description,
           image: newProductData.image,
           price: newProductData.price,    
        },
    });

    return product;
}

const deleteProduct = async (id) => {
    await prisma.product.delete({
        where: {
             id,
        },
    });
}

const editProduct = async (id, productData) => {
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
    return product;
}

module.exports ={
    findProducts,
    findProductsById,
    insertProduct,
    findProductByName,
    deleteProduct,
    editProduct,
};