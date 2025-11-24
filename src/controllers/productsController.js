export const getProducts = (productsService) => async(req, res) => {
    const { limit, page, sortPrice } = req.query;

    const { payload } = await productsService.getProducts({
        limit: limit ? parseInt(limit) : 10,
        page: page ? parseInt(page) : 1,
        sortPrice: sortPrice,
    });

    if (!payload?.length) {
        res.status(404).json({});
    }

    res.status(200).json(payload); 
};

export const getProductById = (productsService) => async(req, res) => {
    const { id } = req.params;

    const product = await productsService.getProductsBy({ _id: id });
    
    if (!product) {
        res.status(404).send("Not found");
    }

    res.status(200).json(product); 
};

export const createProduct = (productsService) => async(req, res) => {
    const product = req.body;

    const { title, description, price, stock } = product;

    if (!title || !description || !price || !stock ) {
        return res.status(400).send('faltan datos');
    }

    await productsService.createProduct(product);
    res.status(201).json({ message: "Product added successfully", product });
};

export const updateProduct = (productsService) => async(req, res) => {
    const { id } = req.params;

    const product = req.body;

    await productsService.updateProduct(id, product);
    res.status(201).json({ message: "Product added successfully", product });
};

export const deleteProduct = (productsService) => async(req, res) => {
    const { id } = req.params;

        await productsService.deleteProduct(id);
        res.status(204).json({ message: "Product deleted successfully" });
};