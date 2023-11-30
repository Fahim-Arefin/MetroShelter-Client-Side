import { Helmet } from "react-helmet-async";
import Banner from "../components/Banner";
import LatestReview from "../components/LatestReview";
import Advertisement from "../components/Advertisement";
import Poster from "../components/Poster";
import SwiperCard from "../components/SwiperCard";
import { useEffect, useState } from "react";

function Home() {
  const [imgData, setImgData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/img.json");
      const data = await res.json();
      setImgData(data);
    };
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>MetroShelter | Home</title>
      </Helmet>
      <Banner />
      <Poster />
      <Advertisement />
      <LatestReview />
      <div className="uppercase text-center mt-24 text-[#f87060] font-semibold">
        Meet Our Team
      </div>
      <SwiperCard imgData={imgData} className="mb-12" />
    </>
  );
}

export default Home;
