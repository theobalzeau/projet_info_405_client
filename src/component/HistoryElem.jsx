import React, { useState } from "react";
import { CaretRightFill, CaretDownFill, CaretRight } from "react-bootstrap-icons";
function HistoryElem({history}){
    let array_month_fr = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    function toDate(date){
        try {
            let dateObj = new Date(date)
            return dateObj.getDate()+" "+array_month_fr[dateObj.getMonth()-1]+" "+dateObj.getFullYear();
        } catch(e){
            return ""
        }
    }
    const [visi, updateVisi] = useState(false);
    function openDesc(){
        updateVisi(!visi);
    }
    return (
        <div class="d-flex justify-content-between pb-2 border-top separator pt-2 ps-3 pe-2">
            <div class="d-flex flex-column">
                <h5>{history.role}</h5>
                <div className="mb-2">
                    <span className="me-1" onClick={openDesc}>
                        {visi?
                        <CaretDownFill className="me-1"></CaretDownFill>:
                        <CaretRightFill className="me-1"></CaretRightFill>}
                        {history.name}
                    </span> - {toDate(history.start) + " / " + toDate(history.end)} - {history.heure+"h"} - {history.price+"€"}
                </div>
                <p className={visi?"d-block":"d-none"}>{history.descriptionProject}</p>
                <p>{history.description}</p>
            </div>
        </div>
    )
}
export default HistoryElem;