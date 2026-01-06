const GreeterContract=artifacts.require("Greeter");

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
        const owner= await greeter.contract();

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