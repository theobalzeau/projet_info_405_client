import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import LinearCompList from "../list/LinearCompList";
import CompareEats from "../object/base/CompareEats";
import Eats from "../object/base/Eats";
import ListEats from "../object/base/ListEats";
import Field from "./Field";

function SelectCompetence({project, compList, updateCompList, updateRole, type}){
    const [search, updateSearch] = useState("");
    
    const [list, updateList] = useState(new ListEats("", undefined, CompareEats.compareInt("date", CompareEats.DESC)));
    useEffect(function(){
        if(type == "skill") {
            chercher();
        } else {
            chercherTecno();
        }
    }, [search])
    list.update = function(){
        updateList(Eats.fakeUpdate(list))
    }
    function chercher(){
        list.reset();
        list.makeRequest(
            'empty/search/skill',
            {
                name: search
            },
            function(error){
            
            },
            function(response){
                
            }
        )
    }

    function chercherTecno() {
        list.reset();
        list.makeRequest(
            'empty/search/tecno',
            {
                name: search
            },
            function(error){
            
            },
            function(response){
                
            }
        )
    }



    function selectElem(elem){
        let fait = false;
        let i = 0;
        while(!fait&&i<compList.length){
            if(compList[i].id_str == elem.id_str){
                compList.splice(i, 1);
                fait = true;
            }
            i++;
        }
        if(!fait){
            compList.push(elem)
        }
        updateCompList([...compList])
    }
    function changeSearch(e){
        updateSearch(e.target.value);
    }
    /*useEffect(function(){
        project.getAllRole();
    }, []);*/
    function isSelect(comp){
        let select = false;
        let i = 0;
        while(!select&&i<compList.length){
            select = compList[i].id_str == comp.id_str;
            i++;
        }
        return select;
    }
    return <div key={`inline-radio`} className="mt-2">
        <Field className={"mt-2 mb-2"} val={search} changeValue={changeSearch} label="Chercher des compétences" name="search_comp"></Field>
        <div className={compList.length!=0&&"pt-1 mb-2"}>
            <LinearCompList
                compList={compList}>

            </LinearCompList>
        </div>
        {
            list.map((comp, index) =>
                <Form.Check
                    className="mb-0"
                    checked={isSelect(comp)}
                    key={comp.id_str}
                    inline
                    onChange={() => selectElem(comp)}
                    label={comp.name}
                    name={"select_competence"}
                    type={"checkbox"}
                    id={`inline-radio-`+comp.id_str}
                />
            )
        }
    </div>
}
export default SelectCompetence;