export interface IPerson {
    name: string;
    age: number;
}
export declare class Person {
    private readonly name;
    private readonly age;
    constructor(name: string, age: number);
    getName(): string;
    getAge(): number;
    get(): IPerson;
    console(): void;
}
