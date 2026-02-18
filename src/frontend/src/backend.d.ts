import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ProductDefinition {
    name: string;
    description: string;
    imageUrl: string;
    digitalProductUrl: string;
    price: bigint;
    subtitle?: string;
}
export type Time = bigint;
export interface UserProfile {
    name: string;
}
export interface ProductMetadata {
    lastGeneratedTime: Time;
    versionTag: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createProduct(id: string, definition: ProductDefinition, versionTag: string): Promise<void>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getProduct(id: string): Promise<ProductDefinition>;
    getProductMetadata(id: string): Promise<ProductMetadata>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    populateDefaultProducts(): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
