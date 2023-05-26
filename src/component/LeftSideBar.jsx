import React from "react";

const LeftSideBar = (props) => {
  const { isOpenLeftSidebar,navBar,onClick } = props;
  return (
    <div className={`z-[1000] ${!isOpenLeftSidebar && 'ml-[-190px]'} w-[180px] transition-[0.3s] min-h-[calc(100vh-70px)] top-0 bg-red-800 font-bold text-white  p-10`}>
      
      <ul>
        {
          navBar.map((item,index) => {
             if(item.type === "btn")
              return  <li className="cursor-pointer" onClick={()=>onClick(index)} key={item.name}>
                  {item.name}
              </li>
          })
        }
       
      </ul>
    </div>
  );
};

export default LeftSideBar;
