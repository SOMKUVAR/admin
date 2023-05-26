import { AiFillHome ,AiOutlineBranches} from "react-icons/ai";
import { FaUniversity } from "react-icons/fa";
import {MdCastForEducation} from "react-icons/md";
import {RiMiniProgramFill} from "react-icons/ri";
import {BiTime} from 'react-icons/bi';

const LINKS = [
    {
        to:"/dashboard",
        Icon:AiFillHome,
        name:"DASHBOARD"
    },
    {
        to:"/university",
        Icon:FaUniversity,
        name:"UNIVERSITY"
    },
    {
      title:"COLLEGE",
      subLinks:[
        {
            to:"/colleges",
            Icon:FaUniversity,
            name:"COLLEGES"
        },
        {
            to:"/college-program",
            Icon:MdCastForEducation,
            name:"COLLEGE PROGRAM"
        },
        {
            to:"/college-program-branch",
            Icon:AiOutlineBranches,
            name:"COLLEGE BRANCH"
        },
      ]
    },
    {
        title:"MASTER",
        subLinks:[{
         to:"/master/program-type",
         Icon:MdCastForEducation,
         name:"PROGRAM TYPE"
        },
        {
            to:"/master/program",
            Icon:RiMiniProgramFill,
            name:"PROGRAM"
        },
        {
            to:"/master/branch",
            Icon:AiOutlineBranches,
            name:"BRANCH"
        },
        {
            to:"/master/semester",
            Icon:BiTime,
            name:"SEMESTER"
        },
    ]
    }
]

export default LINKS;