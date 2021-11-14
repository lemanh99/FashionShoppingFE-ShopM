import { useEffect } from "react";
import { connect } from "react-redux";
import Layout from "../../src/layout/Layout";
import PageBanner from "../../src/layout/PageBanner";
import ShopLayout from "../../src/layout/ShopLayout";
import { getProducts } from "../../src/redux/action/product";
import { getProductByFilter } from "../../src/utils/filterProduct";
import { hideFromArr } from "../../src/utils/utils";

const Shop = ({ getProducts, products }) => {
  useEffect(() => {
    getProducts();
  }, []);
  return (
    <Layout>
      {/* <PageBanner title="Our Shop" pageName="Shop" /> */}
      <ShopLayout />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
  products: hideFromArr(
    getProductByFilter(state.product.products, state.filter)
  ),
});

export default connect(mapStateToProps, { getProducts })(Shop);
