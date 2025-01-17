import PageEnum from "../enum/PageEnum";
import Utils from "../utils/Utils";
import React from "react"
import { Bell, BellFill, Search, ThreeDots, EnvelopeFill, Person } from "react-bootstrap-icons";
import { Badge, Button , Modal} from "react-bootstrap";
import { useEffect,useState } from "react";
import ErrorEats from "../object/base/ErrorEats";
import CompareEats from "../object/base/CompareEats";
import ListEats from "../object/base/ListEats";
import Eats from "../object/base/Eats";
import Constant from "../utils/Constant";
import { useLocation } from 'react-router-dom'
import { Link } from "react-router-dom";

function Header({user, navigate, search, updateSearch, notif, updateNotif}){
    const location = useLocation();
    const [pathname, updatePathname] = useState("/");
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));
    let [show, updateShow] = useState(false);

    function handleClose() {
        updateShow(false);
    }
    function openParam() {
        updateShow(true);
    }

    function logout(){
        handleClose();
        navigate("/");
        user.logout();   
    }

    useEffect(function(){
        if(!location.pathname.includes("/search/")){
            updatePathname(location.pathname);
        }
    }, [location.pathname, ])
    
    function openNotif(){
        updateNotif(!notif);
    }

    let profil;
    if(user.profile){
        profil = <img src={Constant.IMAGE_URL+user.profile} className="imageHeader" alt=""/>
    }
    else {
        profil = <img src={Constant.BASE_IMAGE + "profile_empty.png"} className="imageHeader" alt=""/>
    }

    let button;
    if (user.logged){
        button = <div className="d-flex justify-content-start align-items-center me-2">

            <Link to={"/profil/"+user.id_str} className="me-2">
                    {profil}
            </Link>

            <Link to={"/message/-1"}>
                <Button className="me-2" variant="primary" >
                    <EnvelopeFill></EnvelopeFill>
                </Button>
            </Link>

            <div>
                <Button onClick={openNotif} className="me-2">
                    <BellFill></BellFill>
                </Button>
            </div>

            <div>
            <Button className="me-2" onClick={openParam} variant="primary">
				<ThreeDots></ThreeDots>
			</Button>
            <Modal show={show} className="highest" onHide={handleClose}>
                <Modal.Body className="d-flex justify-content-center">
                    <Link to={"/"}>
                        <Button className="m-1" variant="primary" onClick={logout}>Déconnexion</Button>
                    </Link>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Retour
                    </Button>
                </Modal.Footer>
            </Modal>
            </div>
        </div>
    }
    else {
        let titleInscription = "Inscription";
        let titleConnexion = "Connexion";
        function connexion(){
            navigate("/login");
        }
        function inscription(){
            navigate("/register");
        }
        button = <div>
            <button className='btn btn-primary me-3' onClick={inscription}>{titleInscription}</button>
            <button className='btn btn-primary me-3' onClick={connexion}>{titleConnexion}</button>
        </div>
    }
    function home(){
        navigate('/');
    }
    function back(){
        navigate(-1)
    }
    
    const [focused, setFocused] = useState(false)
    const onFocus = function(){
        setFocused(true)
        chercher(true, "")
    }
    const onBlur = function(){
        //setFocused(false)
        //chercher(false, "")
    }
  
    function chercherEvent(e){
        updateSearch(e.target.value);
        chercher(focused, e.target.value);
    }
    list.update = function(){
        updateList(Eats.fakeUpdate(list));
    }

    function chercher(focused, search_base=search){
        if(!focused){
            navigate(pathname)
        }
        else {
            navigate("/search/"+search_base);
        }
    }

    return (
        <nav className="navbar navbar-dark bg-dark justify-content-between">            <button className='ms-3 btn btn-primary me-3' onClick={back}>Retour</button>
            <Link className="text-decoration-none" to={"/"}>
                <div className="navbar-brand ps-2 click">
                    <img src={Constant.BASE_IMAGE + "logo_usmb.png"} width="35" height="35" className="align-top" alt=""/>
                    <h3 className="ps-2 d-inline">LINKER</h3>
                </div>
            </Link>
            <div>
                <div className="input-group">
                    <div>
                        <input onChange={chercherEvent} type="search" id="form1" className="form-control" placeholder="Rechercher" value={search} onFocus={onFocus} onBlur={onBlur} />
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