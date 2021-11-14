import { Toaster } from "react-hot-toast";

const AllToaster = () => {
  return (
    <Toaster
      position="top-left"
      toastOptions={{
        duration: 5000,
        // style: {
        //   background: "#363636",
        //   color: "#fff",
        // },
        // error: {},
      }}
    />
  );
};

export default AllToaster;
