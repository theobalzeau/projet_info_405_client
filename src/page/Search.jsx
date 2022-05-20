import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import Field from "../component/Field";
import PageEnum from "../enum/PageEnum";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ErrorEats from "../object/base/ErrorEats";
import ListEats from "../object/base/ListEats";
import Data from "../utils/Data";
import Response from "../utils/Response";
import Project from "../object/Project";
import User from "../object/User";
import React from "react"
import { useParams } from "react-router-dom";
import Constant from "../utils/Constant";
import ImgProfile from "../../src/component/ImgProfile";
import { Rating } from 'react-simple-star-rating'


function Search({navigate, rootUser}){
    let {search} = useParams();
    if(search==undefined){
        search = ""
    }
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));

    const [type, updateType] = useState("");
    const [min, updateMin] = useState("");
    const [max, updateMax] = useState("");

    console.log(type);
    useEffect(function(){
        chercher();
    }, [search])
    list.update = function(){
        updateList(Eats.fakeUpdate(list))
    }
    function chercher(){
        list.reset();
        list.makeRequest(
            'search/element', 
            {
                name: search,
            },
            function(error){
            },
            function(response){
                console.log(response)
            }
        )
    }


    function eventMin(e){
        updateMin(e.target.value);
    }
    function eventMax(e){
        updateMax(e.target.value);
    }

    return <div className = "d-flex m-2 p-4">

            <div>
                <p>Filtre de recherche</p>

                <Form.Select className="w-50 p-2" aria-label="type" value={type} onChange={(e) => updateType(e.target.value)}>
                    <option value="">Type</option>
                    <option value="project">Projet</option>
                    <option value="user">Utilisateur</option>
                </Form.Select>

                <Form.Group className="w-50 p-1" controlId="min">
                    <Form.Control value={min} onInput={eventMin} type="text" placeholder="Note minimum" />
                </Form.Group>
                <Form.Group className="w-50 p-1" controlId="max">
                    <Form.Control value={max} onInput={eventMax} type="text" placeholder="Note maximum" />
                </Form.Group>

            </div>
            <div>
                


        {
            list.map(function(object, index) {
                function openProfil(){
                    if (object instanceof Project){
                        navigate("/project/" + object.id_str);
                    } else{
                        navigate("/profil/" + object.id_str);
                    }
                }
                    let div = <div key={index} className = "d-flex m-2 p-1 justify-content-between" >
                            <div className="banner border-bottom border-4 border-primary">
                                {object.profile != undefined ? <img src={Constant.IMAGE_URL+object.profile} className="center-crop w-100 h-100" alt=""/> :  <ImgProfile className="center-crop w-100 h-100" elem={object}></ImgProfile>}
                        </div>
                        <div>
                            <p className="m-4">{object.name == undefined ? object.firstname : object.name}</p>
                            <p className = "mt-4 m-2">{object.description}</p> 
                            <Rating
                                            readonly={true}
                                            allowHover={false}
                                            ratingValue={object.moyenne} /* Available Props */
                                            allowHalfIcon={true}/>
                        </div>
                        <Button className = "h-50 m-4" onClick={openProfil} variant="primary">Voir</Button>
                        </div>;
                    if (type == "") return div;
                    if (type == "project" && object instanceof Project) return div;
                    if (type == "user" && object instanceof User) return div;

            })
        }
        </div>
    </div>
}
export default Search;

