
import React, { useState, useEffect } from "react";
import jsqr from "jsqr";
import abi from "../contracts/MarkSheetContract.json";
import { ethers } from "ethers";
import * as providers from "@ethersproject/providers";
import Marksheet from "./Marksheet";
import Modal from "../component/UI/Model";
import { ModalBody, ModalHeader } from "../component/UI/Model";

const Scanner = () => {
  const [qrCodeData, setQRCodeData] = useState("");
  const [loader,setLoader] = useState(false)
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [marksheet, setMarkSheet] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const connectWallet = async () => {
      const contractAddress = "0x101A478bC268550937A722C73FEdEffC27E5FC1f";
      const contractABI = abi.abi;
      try {
        const { ethereum } = window;
        if (ethereum) {
          const accounts = await ethereum.request({
            method: "eth_requestAccounts",
          });
          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });
          window.ethereum.on("accountChanged", () => {
            window.location.reload();
          });
          const provider = new providers.Web3Provider(ethereum);
          const signer = provider.getSigner();
          const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
          );

          setState({ provider, signer, contract });
        } else {
          alert("Please install metamask");
        }
      } catch (error) {
        console.log(error);
      }
    };

    connectWallet();
  }, []);

  useEffect(() => {
    const verify = async () => {
      try {
        const contract = state.contract;
        const result = contract && (await contract.verifyMarksheet(qrCodeData));
        setMarkSheet(result);
        setLoader(false);
      } catch (error) {
        console.log(error);
      }
     
    };
    if (qrCodeData === "No QR code found.") {
      setLoader(false);
      return;
    }
    verify();
  }, [qrCodeData]);

  const handleDecode = (event) => {
    setLoader(true);
    setOpenModal(true);
    const file = event.target.files[0];
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, img.width, img.height);
      const imageData = ctx.getImageData(0, 0, img.width, img.height);
      const code = jsqr(imageData.data, imageData.width, imageData.height);

      if (code) {
        setQRCodeData(code.data);
      } else {
        setQRCodeData("No QR code found.");
      }
    };
    img.src = URL.createObjectURL(file);
  };

  const toggleModal = () => {setOpenModal(false); setMarkSheet(null); setQRCodeData(""); document.getElementById('file').value =""};

  return (
    <div className="flex justify-center">
      <div className="m-auto my-10">
        <input
          id="file"
          type="file"
          accept="image/*"
          capture="camera"
          onChange={handleDecode}
        />
      </div>
      <Modal openModal={openModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}></ModalHeader>
        <ModalBody>
          {loader && <div className="m-auto text-center">Validating ...</div>}
          {!loader && marksheet  && <><div className="m-auto text-center mb-3">Marksheet Verified</div><Marksheet data={marksheet} hideBtn={true} /></>}
          {!loader && !marksheet  && <div className="m-auto text-center">Not valid Marksheet</div>}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Scanner;
