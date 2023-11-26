import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
// import Advertisement from "../components/Advertisement";

function Home() {
  return (
    <>
      <Helmet>
        <title>MetroShelter | Home</title>
      </Helmet>
      <Banner />
      {/* <Advertisement /> */}
    </>
  );
}

export default Home;
