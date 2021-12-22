import { useRouter } from "next/router";
import withoutAuthPublic from "../../../src/HOC/withoutAuthPublic";
import Layout from "../../../src/layout/Layout";
import PageBanner from "../../../src/layout/PageBanner";
import ShopLayout from "../../../src/layout/ShopLayout";

const Shop = () => {
  const router = useRouter();
  const { name } = router.query;
  let name_ = name && name.split("-").join(" ");

  return (
    <Layout>
      {/* <PageBanner title={name_} pageName="Shop" /> */}
      <ShopLayout keyValueForQurey="colors" value={name_} active_={0} />
    </Layout>
  );
};

export default withoutAuthPublic(Shop);
