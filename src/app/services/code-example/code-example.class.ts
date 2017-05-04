import { ISystem } from '../../kentico-cloud/interfaces/isystem.interface';
import { IItem } from '../../kentico-cloud/interfaces/iitem.interface';
import { TextField } from '../../kentico-cloud/fields/field-types';
import { Author } from './author.class';

export class CodeExample implements IItem<CodeExample> { 

  constructor(
    public system: ISystem,
    public title: TextField,
    public author: Author
  ) {}
}

