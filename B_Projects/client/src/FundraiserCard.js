import React, { useState, useEffect, useContext } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@mui/material";

import { EthContext } from "./contexts/EthContext";
import FundraiserArtifact from "./contracts/Fundraiser.json";
import { useNavigate } from "react-router-dom";

const FundraiserCard = ({ address }) => {
  const { state } = useContext(EthContext);
  const { web3, accounts } = state;

  const navigate = useNavigate();

  const [contract, setContract] = useState(null);
  const [open, setOpen] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [totalDonations, setTotalDonations] = useState("0");

  const [donationAmount, setDonationAmount] = useState("");
  const [userDonations, setUserDonations] = useState([]);

  const [isOwner, setIsOwner] = useState(false);
  const [beneficiary, setBeneficiary] = useState("");

  // ===========================
  // LOAD CONTRACT DATA
  // ===========================
  useEffect(() => {
    const init = async () => {
      if (!web3 || !accounts || accounts.length === 0) return;

      const instance = new web3.eth.Contract(
        FundraiserArtifact.abi,
        address
      );

      setContract(instance);

      // Basic Info
      setName(await instance.methods.name().call());
      setDescription(await instance.methods.description().call());
      setImageURL(await instance.methods.imageurl().call());

      const total = await instance.methods.totalDonations().call();
      setTotalDonations(web3.utils.fromWei(total, "ether"));

      // Owner check
      const owner = await instance.methods.owner().call();
      if (owner.toLowerCase() === accounts[0].toLowerCase()) {
        setIsOwner(true);
      }

      // My donations
      const donations = await instance.methods
        .myDonations()
        .call({ from: accounts[0] });

      const formatted = donations[0].map((value, i) => ({
        value: web3.utils.fromWei(value, "ether"),
        date: new Date(donations[1][i] * 1000).toLocaleString()
      }));

      setUserDonations(formatted);
    };

    init();
  }, [web3, accounts, address]);

  // ===========================
  // DONATE
  // ===========================
  const donate = async () => {
    try {
      if (!web3 || !contract) return;

      if (!donationAmount || donationAmount <= 0) {
        alert("Enter valid amount");
        return;
      }

      const weiAmount = web3.utils.toWei(
        donationAmount.toString(),
        "ether"
      );

      await contract.methods.donate().send({
        from: accounts[0],
        value: weiAmount
      });

      alert("Donation Successful!");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // ===========================
  // WITHDRAW
  // ===========================
  const withdraw = async () => {
    try {
      await contract.methods.withdraw().send({
        from: accounts[0]
      });

      alert("Funds Withdrawn!");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  // ===========================
  // SET BENEFICIARY
  // ===========================
  const changeBeneficiary = async () => {
    try {
      if (!beneficiary) {
        alert("Enter valid address");
        return;
      }

      await contract.methods.setBeneficiary(beneficiary).send({
        from: accounts[0]
      });

      alert("Beneficiary Updated!");
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Card style={{ marginBottom: "20px" }}>
        {imageURL && (
          <CardMedia
            component="img"
            height="200"
            image={imageURL}
            alt="Fund"
          />
        )}

        <CardContent>
          <Typography variant="h5">{name}</Typography>
          <Typography>{description}</Typography>
          <Typography>
            Total Donations: {totalDonations} ETH
          </Typography>

          <Button
            variant="contained"
            style={{ marginTop: "10px" }}
            onClick={() => setOpen(true)}
          >
            View More
          </Button>
        </CardContent>
      </Card>

      {/* ================= MODAL ================= */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>Donate to {name}</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            label="Enter Donation (ETH)"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            margin="normal"
          />

          <Typography variant="h6" style={{ marginTop: 20 }}>
            My Donations:
          </Typography>

          {userDonations.length === 0 && (
            <Typography>No donations yet</Typography>
          )}

          {userDonations.map((d, i) => (
            <Typography key={i}>
              {d.value} ETH — {d.date}
            </Typography>
          ))}

          {/* RECEIPT BUTTON */}
          {userDonations.length > 0 && (
            <Button
              variant="outlined"
              size="small"
              style={{ marginTop: 10 }}
              onClick={() => {
                const lastDonation =
                  userDonations[userDonations.length - 1];

                navigate("/receipts", {
                  state: {
                    donation: lastDonation.value,
                    date: lastDonation.date,
                    fundName: name
                  }
                });
              }}
            >
              Request Receipt
            </Button>
          )}

          {/* OWNER CONTROLS */}
          {isOwner && (
            <>
              <TextField
                fullWidth
                label="New Beneficiary Address"
                value={beneficiary}
                onChange={(e) => setBeneficiary(e.target.value)}
                margin="normal"
              />

              <Button
                variant="contained"
                color="secondary"
                onClick={changeBeneficiary}
                style={{ marginTop: 10 }}
              >
                Set Beneficiary
              </Button>
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>
            Cancel
          </Button>

          <Button variant="contained" onClick={donate}>
            Donate
          </Button>

          {isOwner && (
            <Button variant="contained" onClick={withdraw}>
              Withdraw
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default FundraiserCard;
