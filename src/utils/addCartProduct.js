export const productCart = (product, sizeSelected) => {
    if(!sizeSelected) return product;

    var product_sku_id = null;
    const size_product = product.sizes.find((size) => size.select == sizeSelected)
    if (size_product) {
        product_sku_id = size_product.product_sku_id
    }
    return { ...product, product_sku_id: product_sku_id, sizeSelected: sizeSelected }
}
