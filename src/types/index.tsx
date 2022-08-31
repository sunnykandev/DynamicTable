export interface ProductData {
    sku: string;
    price: number;
    quantity: number;
    shipping: number;
}

export interface ProductEditParam {
    sku:string,
    quantity?:number;
    price?:number;
    shipping?:number;
}

export type ProductDataset = ProductData[]

export type ChildrenProps = {
  children?: React.ReactNode;
}