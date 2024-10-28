// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract chai {

    //creating a structure to store the name and messag by the sender, along with its wallet address and timestamp
    struct Memo {
        string name;
        string message;
        uint256 timestamp;
        address from;
    }
    Memo[] memos;
    //a list of memos will be here
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

 
    function buyChai(string memory name, string memory message) public payable {
        require(msg.value > 0, "Please pay greater than 0 ether");
        owner.transfer(msg.value);
        memos.push(Memo(name, message, block.timestamp, msg.sender));
    }

    //only returns the data, doesnt require any edits or changes
    function getMemos() public view returns (Memo[] memory) {
        return memos;
    }
}
