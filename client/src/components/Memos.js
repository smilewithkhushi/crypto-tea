import React from "react";
import { useState, useEffect } from "react";

const Memos = (state) => {
  const [memos, setMems] = useState([]);
  const { contract } = state;

  useEffect(() => {
    const memosMessage = async () => {
      const memos = await contract.getMemos();
      setMems(memos);
    };
    contract && memosMessage();
  }, [contract]);

  return (
    <div>
      <h1>Messages</h1>
      {
        memos.map((memo, index) => {
            return (
                <table key={Math.random()}>
                    <tbody>
                <td>{memo.name}</td>
                <td>{memo.message}</td>
                <td>{new Date(memo.timestamp*1000).toLocaleString()}</td>
                <td>{memo.from}</td>
                </tbody>
                </table>
            );
      })}
      
      </div>
  );
};

export default Memos;
