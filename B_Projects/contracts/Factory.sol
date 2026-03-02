// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Fundraiser.sol";

contract Factory {
    Fundraiser[] public fundraisers;

    function createFundraiser(
        string memory name,
        string memory url,
        string memory imageurl,
        string memory description,
        address payable beneficiary
    ) public {
        Fundraiser fundraiser = new Fundraiser(
            name,
            url,
            imageurl,
            description,
            beneficiary,
            msg.sender
        );

        fundraisers.push(fundraiser);
    }

    function getFundraisers() public view returns (Fundraiser[] memory) {
        return fundraisers;
    }
}
