export class Embed {
    "title": string;
    "description": string;
    "color": number;
    
    constructor(title: string, description: string, color:string) {
        this.title = title;
        this.description = description;
        this.color = parseInt(color, 16);
    };
}