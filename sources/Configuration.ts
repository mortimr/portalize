import { arrOf, objOf, str } from 'ts-dynamic-type-checker';

export interface Module {
    name: string;
    path: string;
}

export const ConfigurationChecker: any = arrOf(objOf({
    name: str,
    path: str
}));
