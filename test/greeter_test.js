const GreeterContract=artifacts.require("Greeter");

contract("Greeter", ()=>{
    it("has been deployed successfully", async()=>{
        const greeter = await GreeterContract.deployed();
        assert (greeter, "Contract was not deployed");
    });
});

describe("greet()",()=>{
    it("returns 'Hello World !' ", async()=>{
        const greeter = await GreeterContract.deployed();
        const expected = "Hello World!";
        const actual = await greeter.greet();

        assert.equal(actual, expected, "greeted with 'Hello World!' ");
    });
});

contract("Greeter: update greeting", (accounts) => {
  describe("setGreeting(string)", () => {

    describe("when message is sent by the owner", () => {
      it("sets greeting to passed in string", async () => {
        const greeter = await GreeterContract.deployed();
        const expected = "The owner changed the message";

        await greeter.setGreeting(expected, { from: accounts[0] });
        const actual = await greeter.greet();

        assert.equal(actual, expected, "greeting was not updated");
      });
    });

    describe("when message is sent by another account", () => {
      it("does not set the greeting", async () => {
        const greeter = await GreeterContract.deployed();
        const original = await greeter.greet();

        try {
          await greeter.setGreeting("Not the owner", { from: accounts[1] });
        } catch (err) {
          assert.equal(err.reason, "Not owner", "wrong revert reason");
          return;
        }

        assert(false, "greeting should not be updated");
      });
    });

  });
});

contract("Greeter", ()=>{
    it("has been deployed successfully", async()=>{
        const greeter = await GreeterContract.deployed();
        assert (greeter, "Contract was not deployed");
    });

describe("greet()",()=>{
    it("returns 'Hello World !' ", async()=>{
        const greeter = await GreeterContract.deployed();
        const expected = "Hello World!";
        const actual = await greeter.greet();

        assert.equal(actual, expected, "greeted with 'Hello World!' ");
    });
});
describe("owner()",()=>{
    it("retruns the address of the owner", async()=>{
        const greeter= await GreeterContract.deployed();
        const owner= await greeter.owner();

        await(owner, "the current owner");
    });
    it("matches the address that originally deployed contract", async()=>{
        const greeter= await GreeterContract.deployed();
        const owner = await greeter.owner();
        const expected = accounts[0];

        assert.equal(owner, expected, "matches address used to deploy contract");
    });
});
});