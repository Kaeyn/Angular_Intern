import { SubCategory } from "./SubCategory";

export class Category{
    id : string;
    code : number;
    moduleCode : number;
    icon : string;
    name : string;
    path : string;
    modulePath : string;
    subCategory : SubCategory[];
    
    constructor(id: string, code: number, moduleCode : number, icon : string, name: string, path: string, modulePath : string, subCategory : SubCategory[]) {
        this.id = id;
        this.code = code;
        this.moduleCode = moduleCode;
        this.icon = icon;
        this.name = name;
        this.path = path;
        this.modulePath = modulePath;
        this.subCategory = subCategory;
    }
}