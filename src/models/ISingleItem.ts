export interface ISingleItem {
    id: number;
    image: string; 
    name: string;
    format: string;
    size: number;
    barcode: number;
    manufacturer: string;
    brand: string;
    description: string;
    price: number;
    care?: string;
}