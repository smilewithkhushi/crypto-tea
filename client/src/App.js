import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import abi from "./contract/chai.json";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
//creating a template for the future dapps
function App() {
  //this object will store the states for all these variables
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });

  const [account, setAccount] = useState("");

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x4f96fe3b7a6cf9725f59d353f723c1bdb64ca6aa";
      //add the address of the deployed smart contract above

      const contractAbi = abi.abi;
      try {
        const { etherium } = window;

        //metamask wallet injects etherium (connects metamask wallet)
        if (etherium) {
          const account = await etherium.request({
            method: "eth_requestAccounts",
          });

          window.etherium.on("chainChanged", () => {
            window.location.reload();
          })

          window.etherium.on("accountChanged", () => {
            window.location.reload();
          })

          //getting values for the provider, signer and contract variables
          const provider = new ethers.providers.Web3Provider(etherium);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractAbi,
            signer
          );

          setState(provider, signer, contract);
          setAccount(account);
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };
    connectWallet();
  }, []);

  console.log(state);

  return (
    <div className="App">

      <h1>Buy me a chai </h1>
      <p>Connected Account - {account}</p>
      <Buy state={state} />
      <Memos state={state} />
    </div>
  );
}

export default App;
