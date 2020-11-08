import 'reflect-metadata';
import { Filter, FilterTypes } from 'src/app/shared/types/filter';
const metadataKey = "@filter:info"

export interface FilterTypeInfo {
    name: string;
    type: FilterTypes;
}

export const FilterInfo = (info: FilterTypeInfo) => {
    return <T extends { new (...args: any[]): {} }>(constructor: T)  =>{
        Reflect.defineMetadata(metadataKey, info, constructor.prototype);
    };
};

export const getFilterInfo = (filter: Filter) => {
    return Reflect.getMetadata(metadataKey, filter);
}
