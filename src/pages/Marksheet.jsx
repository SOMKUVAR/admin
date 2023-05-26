import React from "react";
import QRCode from "qrcode.react";
import { toBlob } from "html-to-image";
import { saveAs } from "file-saver";
import { useRef } from "react";

const Marksheet = ({ data ,hideBtn}) => {
  const markSheetRef = useRef(null);
  console.log(data);
  if (!data) return <div></div>;
  const { student, subjects, result, grade, hashes, year } = data;

  const handleDownloadImage = () => {
    toBlob(markSheetRef.current, {
      quality: 1,
      pixelRatio: 2,
      height: 600,
    }).then((blob) => {
      saveAs(blob, "page.png");
    });
  };

  return ( 
    <>
    <div className="flex justify-end">
     { !hideBtn &&  <button
        className="bg-red-800 rounded-md py-1.5 hover:bg-red-900 font-bold text-md px-10 text-white"
        onClick={handleDownloadImage}
      >
        Save
      </button>
}
      </div>
      <div ref={markSheetRef}>
        <div className="shadow p-4 bg-white my-5 mx-auto md:min-w-[1000px]">
          <div className="flex flex-row justify-between mb-3">
            <h3 className="text-center text-red-900 grow-[2]">
              {student.universityName}
            </h3>
            <QRCode value={hashes} size={50} />
          </div>
          <hr className="border-1 border-red-900 mb-3" />
          <div className="text-xs text-slate-600">
            <div className="flex flex-row justify-between">
              <div>Roll No. : {student.rollno}</div>
              <div>
                {student.degree},{student.branch}
              </div>
            </div>
            <div className="flex flex-row justify-between">
              <div>
                Name : {student.name} S/D/O {student.fatherName}
              </div>
              <div>Semester : {parseInt(year._hex)}</div>
            </div>
            <div className="flex flex-row justify-between">
              <div>Institute Name : {student.collegeName}</div>
              <div>Status : {student.status}</div>
            </div>
            <hr className="border-1 border-red-900 mt-3" />
            <div className="flex flex-row justify-between text-xs text-slate-600 mx-3">
              <div className="mt-3">
                <div className="text-red-900 font-semibold">Code</div>
                {subjects.map((subject) => (
                  <div className="mt-2 flex flex-row">
                    {subject.code}
                    <p className="text-red-500 ml-1">
                      {subject.result === "Pass" ? "" : "*"}{" "}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className=" text-red-900 font-semibold">Subject Name</div>
                {subjects.map((subject) => (
                  <div className="mt-2">
                    {subject.name} [{subject.examType.charAt(0)}]{" "}
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className=" text-red-900 font-semibold">Grade</div>
                {subjects.map((subject) => (
                  <div className="mt-2">{subject.grade} </div>
                ))}
              </div>
            </div>
            <hr className="border-1 border-red-900 my-3" />
            <div className="flex flex-row justify-between">
              <p>Result : {result}</p>
              <p>SGPA : {parseFloat(parseFloat(grade) / 10).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Marksheet;
