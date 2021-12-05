import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import withAuth from "../../../src/HOC/withAuth";
import Layout from "../../../src/layout/Layout";
import ShopLayout from "../../../src/layout/ShopLayout";

const Shop = () => {


  return (
    <Layout>
      {/* <PageBanner title={name_} pageName="Shop" /> */}
      <ShopLayout keyValueForQurey="catagory" value={name} active_={0} />
    </Layout>
  );
};

export default withAuth(Shop);
