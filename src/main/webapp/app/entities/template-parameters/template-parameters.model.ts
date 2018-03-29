import { BaseEntity } from './../../shared';

export class TemplateParameters implements BaseEntity {
    constructor(
        public id?: number,
        public parameterName?: string,
        public valueFormula?: string,
        public required?: boolean,
        public uiFragmentKey?: string,
        public document?: BaseEntity,
    ) {
        this.required = false;
    }
}
