export class Question{
    id : string;
    code : number;
    stringques : string;
    type : string;
    group : number;
    timelimit: number;
    status: number;
    
    constructor(id: string, code: number, stringques: string, type : string,group : number, timelimit : number, status : number) {
        this.id = id;
        this.code = code;
        this.stringques = stringques;
        this.type = type;
        this.group = group;
        this.timelimit = timelimit;
        this.status = status
    }
}