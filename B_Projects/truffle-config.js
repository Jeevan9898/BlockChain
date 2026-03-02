module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 9545,
      network_id: "1337"
    }
  },

  contracts_build_directory: "./client/src/contracts",

  compilers: {
    solc: {
      version: "0.8.20",
       settings: {
      evmVersion: "paris"
    }
    }
  }
};
