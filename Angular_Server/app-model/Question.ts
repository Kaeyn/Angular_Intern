export class Question{
    id : string;
    code : number;
    stringques : string;
    type : number;
    group : number;
    timelimit: number;
    scoring: number;
    status: number;
    
    constructor(id: string, code: number, stringques: string, type : number,group : number, timelimit : number, scoring: number, status : number) {
        this.id = id;
        this.code = code;
        this.stringques = stringques;
        this.type = type;
        this.group = group;
        this.timelimit = timelimit;
        this.scoring = scoring;
        this.status = status
    }
}