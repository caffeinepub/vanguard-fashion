import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Cart {
    items: Array<CartItem>;
}
export interface CartItem {
    color: string;
    size: string;
    productId: bigint;
    quantity: bigint;
}
export interface Product {
    id: bigint;
    imageUrls: Array<ExternalBlob>;
    name: string;
    description: string;
    sizes: Array<string>;
    colors: Array<string>;
    price: bigint;
}
export interface backendInterface {
    addProduct(name: string, description: string, price: bigint, sizes: Array<string>, colors: Array<string>, imageUrls: Array<ExternalBlob>): Promise<bigint>;
    addToCart(userId: string, productId: bigint, quantity: bigint, size: string, color: string): Promise<void>;
    getAllProducts(): Promise<Array<Product>>;
    getCart(userId: string): Promise<Cart>;
    getProduct(id: bigint): Promise<Product>;
}
