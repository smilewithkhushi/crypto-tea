import { ethers } from "hardhat";
import React from "react";

const Buy = (state) => {
  const buyChai = async (event) => {
    const { contract } = state;
    const name = document.querySelector("name").value;
    const message = document.querySelector("message").value;
    const amount = {value:ethers.utils.parseEther("0.00001")}

    const transaction = await contract.buyChai(name, message, amount);

    await transaction.wait();
    console.log("Transaction mined");
  };
  return (
    <div>
      <form onSubmit={buyChai}>
        <label>Name</label>
        <input type="text" id="name" placeholder="Enter your name" />
        <label>Message</label>
        <input type="text" id="message" placeholder="Enter your message" />
        <button type="submit" disabled={!state.contract}>Pay</button>
      </form>
    </div>
  );
};

export default Buy;
