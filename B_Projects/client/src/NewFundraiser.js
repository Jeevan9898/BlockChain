import React, { useState, useContext } from "react";
import EthContext from "./contexts/EthContext/EthContext"

const NewFundraiser = () => {
  const { state } = useContext(EthContext);
  const { contract, accounts } = state;

  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
  try {
    await contract.methods.createFundraiser(
      name,
      website,
      "https://placekitten.com/600/350",   // imageurl
      description,
      accounts[0]                          // beneficiary
    ).send({
      from: accounts[0]
    })

    alert("Fundraiser Created!")
  } catch (err) {
    console.error(err)
  }
}

  return (
    <div>
      <h2>Create New Fundraiser</h2>

      <input
        placeholder="Name"
        onChange={(e) => setName(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Website"
        onChange={(e) => setWebsite(e.target.value)}
      />

      <br /><br />

      <input
        placeholder="Description"
        onChange={(e) => setDescription(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit}>
        Create Fundraiser
      </button>
    </div>
  );
};

export default NewFundraiser;
