import Constant from "../utils/Constant";
import React from "react";
import User from "../object/User";

function ImgProfile({elem}){
    let profil;
    if(elem.profile){
        profil = <img src={Constant.IMAGE_URL+elem.profile} className="center-crop" alt=""/>
    }
    else if(elem instanceof User){
        profil = <img src="profile_empty.png" className="center-crop w-100 h-100" alt=""/>
    }
    else {
        profil = <img src="project_empty.png" className="center-crop w-100 h-100" alt=""/>
    }
    return profil;
}
export default ImgProfile;