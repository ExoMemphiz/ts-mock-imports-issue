import { someFunction } from "./Utils";

export function dependentFunction(name: string) {
    return `${someFunction()} ${name}`;
}
