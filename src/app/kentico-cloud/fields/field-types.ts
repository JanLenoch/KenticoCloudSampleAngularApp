import { FieldType } from './field-type';
import { IField } from '../interfaces/ifield.interface';
import { AssetModel } from './field-models';

export class ModularContent<T> implements IField {
    constructor(
        public name: string,
        public type: FieldType,
        public value: any
    ) { };

    public item: T;
}

export class TextField implements IField {
    constructor(
        public name: string,
        public type: FieldType,
        public value: any
    ) { };

    public text = this.value;
}


export class AssetField implements IField {
    constructor(
        public name: string,
        public type: FieldType,
        public value: any
    ) { };

    public asset = this.value as AssetModel;
}
