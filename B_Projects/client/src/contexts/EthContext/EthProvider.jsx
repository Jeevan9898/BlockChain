import React, { useReducer, useCallback, useEffect } from "react";
import Web3 from "web3";
import EthContext from "./EthContext";
import { reducer, actions, initialState } from "./state";

function EthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Initialize Web3 + Contract
  const init = useCallback(async (artifact) => {
    if (!artifact) return;

    const web3Instance = new Web3(
      Web3.givenProvider || "http://127.0.0.1:9545"
    );

    const accounts = await web3Instance.eth.requestAccounts();
    const networkID = await web3Instance.eth.net.getId();
    const { abi, networks } = artifact;

    let contract = null;

    try {
      const address = networks[networkID].address;
      contract = new web3Instance.eth.Contract(abi, address);
    } catch (error) {
      console.error("Contract not deployed on this network:", error);
    }

    dispatch({
      type: actions.init,
      data: {
        artifact,
        web3: web3Instance,
        accounts,
        networkID,
        contract
      }
    });
  }, []);

  // Load contract artifact
  useEffect(() => {
    const loadArtifact = async () => {
      try {
        const artifact = require("../../contracts/Factory.json");
        init(artifact);
      } catch (error) {
        console.error("Failed to load contract artifact:", error);
      }
    };

    loadArtifact();
  }, [init]);

  // Reload on account or network change
  useEffect(() => {
    if (!window.ethereum) return;

    const handleChange = () => {
      init(state.artifact);
    };

    window.ethereum.on("accountsChanged", handleChange);
    window.ethereum.on("chainChanged", handleChange);

    return () => {
      window.ethereum.removeListener("accountsChanged", handleChange);
      window.ethereum.removeListener("chainChanged", handleChange);
    };
  }, [init, state.artifact]);

  return (
    <EthContext.Provider value={{ state, dispatch }}>
      {children}
    </EthContext.Provider>
  );
}

export default EthProvider;
