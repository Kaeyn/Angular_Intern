export class Module{
    id : string;
    code : number;
    name : string;
    path : string;
    
    constructor(id: string, code: number, name: string, path : string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.path = path;
    }
}