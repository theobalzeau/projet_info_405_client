import { useState } from "react";
import { Button } from "react-bootstrap";
import Field from "../component/Field";
import PageEnum from "../enum/PageEnum";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ErrorEats from "../object/base/ErrorEats";
import ListEats from "../object/base/ListEats";
import Data from "../utils/Data";
import Response from "../utils/Response";

function Search({back, user, updatePage}){
    const [name, updateName] = useState("");
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));

    list.update = function(){
        updateList(Eats.fakeUpdate(list))
    }
    function chercherEvent(e){
        updateName(e.target.value);
        chercher();
    }
    function chercher(){
        list.reset();
        list.makeRequest(
            '/search/element', 
            {
                name: name,
            },
            function(error){
                console.log(error)
            },
            function(response){
                console.log(response)
                console.log(list)
                /*if(Response.isSuccessResponse(response)){
                    //back();
                }
                else {
                    updateError(new ErrorEats(
                        Response.error(response)
                    ));
                }*/
            }
        )
    }
    /*
    <SkillBlock></SkillBlock>
    */
    return <div>
        <Button variant="primary" onClick={back}>Home</Button>
        <Field name={"name"} label="Nom" val={name} changeValue={chercherEvent}></Field>
        <Button variant="primary" onClick={chercher}>Chercher</Button>
        {
            list.map(function(object, index) {
                return <div key={index}>
                    <p>{object.name == undefined ? object.firstname : object.name}</p>
                </div>
            })
        }
    </div>
}
export default Search;