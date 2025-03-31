import React from "react";
import { BulbOutlined } from "@ant-design/icons";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";

function RecoverAccount({ setWallet, setSeedPhrase }) {
  const { TextArea } = Input;
  const navigate = useNavigate();
  const [typedSeed, setTypedSeed] = useState("");
  const [nonValid, setNonValid] = useState(false);

  function ChageSeed(e) {
    setNonValid(false);
    setTypedSeed(e.target.value);
  }

  function RecoverWallet() {
    let RecoveredWallet;
    try {
      RecoverWallet = ethers.Wallet.fromPhrase(typedSeed);
    } catch (error) {
      setNonValid(true);
      return;
    }
    setWallet(RecoverWallet.address);
    setSeedPhrase(typedSeed);
    navigate("/yourwallet");
    return;
  }
  return (
    <>
      <div className="content">
        {" "}
        <div className="mnemonic">
          <BulbOutlined style={{ fontSize: "20px" }} />
          <div>
            Type your seed phrase in the field below to recover your wallet (it
            should include 12 words seperated with spaces)
          </div>
        </div>
        <TextArea
          value={typedSeed}
          onChange={ChageSeed}
          rows={4}
          className="seedPhraseContainer"
          placeholder="Type your seed phrase here..."
        />
        <Button
          disabled={
            typedSeed.split(" ").length !== 12 || typedSeed.slice(-1) === " "
          }
          onClick={RecoverWallet}
          className="frontPageButton"
          type="primary"
        >
          Recover Wallet
        </Button>
        {nonValid && <p style={{ color: "red" }}> Invalid Seed Phrase</p>}
        <p className="frontPageBottom" onClick={() => navigate("/")}>
          <span>Back Home</span>
        </p>
      </div>
    </>
  );
}

export default RecoverAccount;
