import { Injectable } from '@angular/core';
import { IModularContent } from '../interfaces/imodular-content.interface';
import { IItem } from '../interfaces/iitem.interface';
import { ResponseSingle } from '../responses/response-single.class';
import { ResponseMultiple } from '../responses/response-multiple.class';
import { TextField, AssetField } from '../fields/field-types';
import { IField } from '../interfaces/ifield.interface';
import { FieldType } from '../fields/field-type';


@Injectable()
export class FieldMapService {

    constructor() { }

    getFields<T extends IItem<T>>(item: IItem<T>, modularContent: any): T {
        var properties = Object.getOwnPropertyNames(item.elements);

        properties.forEach(fieldName => {
            var field = item.elements[fieldName] as IField;
            item[fieldName] = this.getField(field, modularContent);
        });

        return item as T;
    }

    private getField(field: IField, modularContent: any): any {
        if (field.type.toString() === FieldType.modular_content.toString()) {
            return this.mapModularField(field, modularContent);
        }
        else if (field.type.toString() === FieldType.text.toString()) {
            return this.mapTextField(field);
        }
        else if (field.type.toString() === FieldType.asset.toString()) {
            return this.mapAssetField(field);
        }
        else {
            console.log('Unsupported field type "' + field.type + '"');
            //throw Error('Unsupported field type "' + field.type + '"')
        }
    }

    private mapTextField(field: IField): TextField {
        return new TextField(field.name, field.type, field.value);
    }

    private mapAssetField(field: IField): AssetField {
        return new AssetField(field.name, field.type, field.value);
    }

    private mapModularField(field: IField, modularContent: any): any {
        var modularItem = modularContent[field.value[0]] as IItem<any>; // support for 1 modular contentitem only!

        return this.getFields(modularItem, modularContent);
    }
}