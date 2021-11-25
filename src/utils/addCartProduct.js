export const productCart = (product, sizeSelected) => {
    if(!sizeSelected) return product;

    var product_id = null;
    const size_product = product.sizes.find((size) => size.select == sizeSelected)
    if (size_product) {
        product_id = size_product.product_id
    }
    return { ...product, product_id: product_id, sizeSelected: sizeSelected }
}
