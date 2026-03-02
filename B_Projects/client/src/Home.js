import React, { useEffect, useState, useContext } from "react";
import EthContext from "./contexts/EthContext/EthContext"
import FundraiserCard from "./FundraiserCard";

const Home = () => {
  const { state } = useContext(EthContext);
  const { contract } = state;

  const [fundraisers, setFundraisers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFundraisers = async () => {
      if (!contract) return;

      const list = await contract.methods.getFundraisers().call();
      setFundraisers(list);
      setLoading(false);
    };

    loadFundraisers();
  }, [contract]);

  return (
    <div>
      <h2>Current Fundraisers</h2>

      {loading && <p>Loading...</p>}

      {!loading && fundraisers.length === 0 && (
        <p>No fundraisers yet.</p>
      )}

      {fundraisers.map((address, index) => (
        <FundraiserCard key={index} address={address} />
      ))}
    </div>
  );
};

export default Home;
