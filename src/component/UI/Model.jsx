import React from "react";
import { ImCross } from "react-icons/im";

const Modal = (props) => {
  const { openModal,toggle } = props;
  if (openModal === true)
    return (
      <div className="top-0 bottom-0 left-0 right-0 w-full z-[9999] fixed p-4 overflow-x-hidden overflow-y-auto bg-red-100 opacity-100">
        <div className="relative w-full md:max-w-[1200px] h-full  md:h-auto m-auto" onClick={toggle}>
          <div className="bg-white w-full rounded-lg shadow dark:bg-gray-700 mt-10">
            {props.children}
          </div>
        </div>
      </div>
    );
};

export const ModalHeader = (props) => {
  const { toggle } = props;
  return (
    <div className="flex items-start items-center justify-between py-4 px-9 border-b rounded-t ">
      <h3 className="text-gray-700 text-xl font-semibold dark:text-white opacity-100">
        {props.children}
      </h3>
      <button onClick={toggle}>
        <ImCross className="text-gray-600" />
      </button>
    </div>
  );
};

export const ModalBody = (props) => {
  return <div className="p-5">{props.children}</div>;
};

export default Modal;
