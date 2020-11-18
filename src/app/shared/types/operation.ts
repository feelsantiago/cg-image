export enum OperationsTypes {
    soma,
    subtracao,
    divisao,
    multiplicacao,
    and,
    or,
    xor,
}

export interface OperationInfo {
    name: string;
    type: OperationsTypes;
}
