export interface Product {
    id:number;
    title:string;
    price:number;
    description:string;
    category:String;
    image:string;
    product:number;
    rating:RatingProps;
}


 interface RatingProps{
    rate:number;
    count:number;
 }