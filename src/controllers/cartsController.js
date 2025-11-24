export const getCartById = (cartsService) => async(req, res) => {
    const { id } = req.params;

    const cart = await cartsService.getCartsBy({ _id: id });
    res.status(200).json(cart);
};

export const saveCart = (cartsService) => async(req, res) => {
    await cartsService.saveCart();
    res.status(201).json({ message: "Carrito creado con exito" });
};

export const updateCart = (cartsService) => async(req, res) => {
    const { id } = req.params;

    const { pid } = req.body;

    if (!pid) {
        return res.status(404).json({ message: "Could not find product" });;
    }

    const response = await cartsService.updateCart(id, pid);

    res.status(201).json({ 
        message: "Producto anadido al carrito correctamente", 
        response 
    });
};
