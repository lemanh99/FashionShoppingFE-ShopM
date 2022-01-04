import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Layout from "../../src/layout/Layout";
import PageBanner from "../../src/layout/PageBanner";
import ShopLayout from "../../src/layout/ShopLayout";
import { getProducts } from "../../src/redux/action/product";
import { getProductByFilter } from "../../src/utils/filterProduct";
import { hideFromArr } from "../../src/utils/utils";

const Shop = ({ }) => {
  const router = useRouter();
  const [query, setQuery] = useState(null);
 

  useEffect(() => {
    if(router.isReady){
      const { search_keyword, category,category_parent, price_min, price_max, tag, category_name, size_name } = router.query;
      let query_state = "?";
    
      if (search_keyword) {
        query_state += "search_keyword=" + search_keyword + "&"
      }
      if (category_parent) {
        query_state += "category_parent=" + category_parent + "&"
      }
      if (category) {
        query_state += "categories=" + category + "&"
      }
      if (category_name) {
        query_state += "category_name=" + category_name + "&"
      }
      if (size_name) {
        query_state += "size_name=" + size_name + "&"
      }
      if (price_min) {
        query_state += "price_min=" + price_min + "&"
      }
      if (price_max) {
        query_state += "price_max=" + price_max + "&"
      }
      if (tag) {
        query_state += "tag=" + tag + "&"
      }
      query_state = query_state.slice(0, query_state.length - 1)
      setQuery(query_state)
    }
  }, [router.query])
  
  // console.log(categories,price );

  return (
    <Layout>
      {/* <PageBanner title="Our Shop" pageName="Shop" /> */}
      <ShopLayout query={query} />
    </Layout>
  );
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps, { })(Shop);
