export enum TransformationTypes {
    scale, 
    rotate,
    translation,
    shear
}

export interface TransformationInfo {
    name: string;
    type: TransformationTypes;
}
