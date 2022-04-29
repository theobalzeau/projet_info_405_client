import PageEnum from "../enum/PageEnum";
import Utils from "../utils/Utils";
import React from "react"
import { Bell, BellFill, Search } from "react-bootstrap-icons";
import { Badge, Button } from "react-bootstrap";
import { useEffect,useState } from "react";
import ErrorEats from "../object/base/ErrorEats";
import CompareEats from "../object/base/CompareEats";
import ListEats from "../object/base/ListEats";
import Eats from "../object/base/Eats";


function Header({user, search, updateSearch, notif, updateNotif}){
    const [val, updateVal] = useState("");
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));
    const [error, updateError] = useState(ErrorEats.NO_ERROR);

    function openNotif(){
        updateNotif(!notif);
    }
    let button;
    if (user.logged){
        function createProjet(){
            Utils.changeUrl("Créer un projet", "/create_project");
            user.updatePage(PageEnum.CreateProject);
        }
        function joinProjet(){
            //Utils.changeUrl(titleInscription, "/join_project");
            //user.updatePage(PageEnum.);
        }
        button = <div>
            <button className='btn btn-primary me-3' onClick={createProjet}>Créer un Projet</button>
            <button className='btn btn-primary me-3' onClick={joinProjet}>Rejoindre un Projet</button>
            <Button onClick={openNotif} className="me-3">
                <BellFill></BellFill>
                <Badge pill className="ms-2" bg="light" text="primary">9</Badge>
            </Button>
        </div>
    }
    else {
        let titleInscription = "Inscription";
        let titleConnexion = "Connexion";
        function connexion(){
            Utils.changeUrl(titleConnexion, "/login");
            user.updatePage(PageEnum.Login);
        }
        function inscription(){
            Utils.changeUrl(titleInscription, "/register");
            user.updatePage(PageEnum.Register);
        }
        button = <div>
            <button className='btn btn-primary me-3' onClick={inscription}>{titleInscription}</button>
            <button className='btn btn-primary me-3' onClick={connexion}>{titleConnexion}</button>
        </div>
    }
    function home(){
        Utils.changeUrl("Accueil", "/");
        user.updatePage(PageEnum.Home);
    }
    function back(){
        user.back();
    }

  

    function chercherEvent(e){
        chercher();
        updateSearch(e.target.value);
    }
    list.update = function(){
        updateList(Eats.fakeUpdate(list));
    }

    function chercher(){
        if(search==""){
            user.updatePage(PageEnum.Home);
        }
        else {
            user.updatePage(PageEnum.Search);
        }
    }

    return (
        <nav className="navbar navbar-dark bg-dark justify-content-between">
            <div className="navbar-brand ps-2 click" onClick={home}>
                <button className='btn btn-primary me-3' onClick={back}>Retour</button>
                <img src="logo_usmb.png" width="30" height="30" className="align-top" alt=""/>
                <h4 className="p-3 d-inline">Projet 405</h4>
            </div>
            <div>
                <div className="input-group">
                    <div>
                        <input onChange={chercherEvent} type="search" id="form1" className="form-control" placeholder="Rechercher" value={search}/>
                    </div>
                    <button  type="button" className="d-flex align-items-center justify-content-center btn btn-primary">
                        <Search></Search>
                    </button>
                </div>
            </div>
            <div>
                {button}
            </div>
        </nav>
    )
}
export default Header;