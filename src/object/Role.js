import ObjectEats from "./base/ObjectEats";

export default class Role extends ObjectEats {

    static TYPE = "Role";

    name = undefined;

    constructor(){
        super();
    }
}