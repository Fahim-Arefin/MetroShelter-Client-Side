import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import LatestReview from "../components/LatestReview";
import Advertisement from "../components/Advertisement";
import Poster from "../components/Poster";

function Home() {
  return (
    <>
      <Helmet>
        <title>MetroShelter | Home</title>
      </Helmet>
      <Banner />
      <Poster />
      <Advertisement />
      <LatestReview />
    </>
  );
}

export default Home;
