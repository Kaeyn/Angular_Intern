export class SubCategory{
    id : string;
    code : number;
    categoryCode : number;
    name : string;
    path : string;   
    categoryPath : string;
    icon : string;
    
    constructor(id: string, code: number, categoryCode : number, name: string ,path : string, categoryPath : string, icon : string) {
        this.id = id;
        this.code = code;
        this.categoryCode = categoryCode
        this.icon = icon;
        this.name = name;
        this.path = path;
        this.categoryPath = categoryPath;
    }
}