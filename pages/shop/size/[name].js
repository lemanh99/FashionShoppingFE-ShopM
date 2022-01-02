import { useRouter } from "next/router";
import Layout from "../../../src/layout/Layout";
import PageBanner from "../../../src/layout/PageBanner";
import ShopLayout from "../../../src/layout/ShopLayout";
import withoutAuthNotPath from "../../../src/HOC/withoutAuthNotPath";

const Shop = () => {
  const router = useRouter();
  const { name } = router.query;
  let name_ = name && name.split("-").join(" ");

  return (
    <Layout>
      <PageBanner title={name_} pageName="Shop" />
      <ShopLayout keyValueForQurey="sizes" value={name_} active_={0} />
    </Layout>
  );
};

export default withoutAuthNotPath(Shop);
