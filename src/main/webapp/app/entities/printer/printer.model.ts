import { BaseEntity } from './../../shared';

export class Printer implements BaseEntity {
    constructor(
        public id?: number,
        public printerName?: string,
        public printerDescription?: string,
        public managed?: boolean,
        public aceCompany?: BaseEntity,
    ) {
        this.managed = false;
    }
}
