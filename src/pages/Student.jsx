import { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import LeftSideBar from "../component/LeftSideBar";
import abi from "../contracts/MarkSheetContract.json";
import { ethers } from "ethers";
import * as providers from "@ethersproject/providers";
import MarkSheet from "./Marksheet";

const University = (props) => {
  const { setNavbarType, isOpenLeftSidebar } = props;
  const [state, setState] = useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [marksheets, setMarksheets] = useState([]);
  const [letNavBar, setLeftNavBar] = useState([]);
  const [marksheet, setMarkSheet] = useState(null);
  const [loader, setLoader] = useState(false);
  const params = useParams();
  setNavbarType("university");

  useEffect(() => {
    const connectWallet = async () => {
      // const contractAddress = "0x868Ac5912dA59c1E618033De8167c608aBf14010";
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
          console.log(provider, signer, contract);
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
    const getMarksheets = async () => {
      const contract = state.contract;
      const marksheet =
        contract && (await contract.getMarksheetByRollNo(params.roll_number));
      if(!marksheet)
       return;

      if (marksheet.length > 0) {
        const {
          subjects,
          year,
          semester,
          result,
          grade,
          hashes,
          student,
          timestamp,
        } = marksheet;
        const newMarksheets = [];
        const letNavBars = [];

        for (let i = 0; i < year.length; i++) {
          let temp = {
            subjects: subjects[i],
            year: year[i],
            semester: semester[i],
            result: result[i],
            grade: grade[i],
            hashes: hashes[i],
            student: student,
            timestamp: timestamp[i],
          };
          newMarksheets.push(temp);
          letNavBars.push({
            type: "btn",
            name: "1 Semester"
          });
        }
        console.log(newMarksheets);
        setLeftNavBar(letNavBars);
        setMarksheets(newMarksheets);
      }
    };
    getMarksheets();
  }, [state.contract]);

  const onClick = (data) => {
    console.log(marksheets);
    if (marksheets !== null && marksheets.length > 0) {
      setMarkSheet(marksheets[data]);
      console.log(marksheets[data]);
    }
  };

  console.log(marksheets);

  return (
    <div className="flex">
          <LeftSideBar
            isOpenLeftSidebar={isOpenLeftSidebar}
            navBar={letNavBar}
            onClick={onClick}
          />
          <div className="fixed xl:relative  m-10 mx-20">
            <MarkSheet data={marksheet} />
          </div>
    </div>
  );
};

export default University;
