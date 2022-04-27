import React from "react";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import ProjectActionList from "../list/ProjectActionList";
import ErrorEats from "../object/base/ErrorEats";
import AddMembers from "./AddMembers";
function ProjectActionView({actionList, project, user, typeAction, updatePage}){
    const [show, updateShow] = useState(false);
    const [val, updateVal] = useState("");
    const [error, updateError] = useState(ErrorEats.NO_ERROR);
    function addElem(){
        updateVal("");
        updateError(ErrorEats.NO_ERROR);
        updateShow(true);
    }
    function handleClose(){
        updateShow(false);
    }
    function inviteMember(){

    }
    return <div>
        <div className="card mt-2 me-2 bg-light bg-gradient overflow-hidden">
            <div className="d-flex mt-1 pb-2 pt-2 ps-3 pe-2">
                <h4>{"Membres"}</h4>
                <Button onClick={addElem} className="ms-2 mb-1 ps-1 pt-1 pb-1 pe-1 d-flex align-items-center justify-content-center" variant="primary">
                    <img className="img-btn" src="plus.png"/>
                </Button>
            </div>
            <ProjectActionList 
                typeAction={typeAction} 
                updatePage={updatePage} 
                user={user} 
                project={project}
                actionList={actionList}>

            </ProjectActionList>
        </div>
        <Modal show={show} className="highest" onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Inviter des membres</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <AddMembers project={project}>

                </AddMembers>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleClose}>
                    Fermer
                </Button>
            </Modal.Footer>
        </Modal>
    </div>
}
export default ProjectActionView;