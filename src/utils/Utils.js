export default class Utils {
    static getType(p) {
        // recupère le type de l'object
        let res;
        if (Array.isArray(p)){
            res = 'array';
        }
        else if (typeof p == 'string') {
            res = 'string';
        }
        else if (p != null && typeof p == 'object') {
            res = 'object';
        }
        else {
            res = 'other';
        }
        return res;
    }
    static array_month_fr = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
    static getDate(date, type, bonus=""){
        function toDate(date){
            try {
                let dateObj = new Date(date*1000)
                return dateObj.getDate()+" "+this.array_month_fr[dateObj.getMonth()]+" "+dateObj.getFullYear();
            } catch(e){
                return ""
            }
        }
        if(type==0){
            return toDate(date)
        }
        else {
            let ccDate = Math.ceil(new Date().getTime()/1000);
            let diff = ccDate - date;
            if(diff>604800*52){
                let num = Math.ceil(diff/(86400*7*52));
                if(num<=1){
                    return bonus+"+ "+num+" an";
                }
                else{
                    return bonus+"+ "+num+" ans";
                }
            }
            else if(diff>604800){
                let num = Math.ceil(diff/(86400*7));
                if(num<=1){
                    return bonus+"+ "+num+" semaine";
                }
                else{
                    return bonus+"+ "+num+" semaines";
                }
            }
            else {
                let num = Math.ceil(diff/(86400));
                if(num==0){
                    return "Aujourd'hui"
                }
                else if(num<=1){
                    return bonus+"+ "+num+" jour";
                }
                else{
                    return bonus+"+ "+num+" jours";
                }
            }
        }
    }
    
    static canApplyData(obj, json){
        return json["id_str"]!=undefined&&(obj.id_str==undefined||obj.id_str==json["id_str"]);
    }
    static isObject(obj){
        return typeof obj === 'object' &&
        !Array.isArray(obj) &&
        obj !== null
    }
    static changeUrl(title, url){
        window.history.replaceState(null, title, url);
    }
    static currentDate(){
        return Math.ceil(new Date().getTime()/1000);
    }
}