import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";

function Home() {
  return (
    <>
      <Helmet>
        <title>MetroShelter | Home</title>
      </Helmet>
      <Banner />
    </>
  );
}

export default Home;
