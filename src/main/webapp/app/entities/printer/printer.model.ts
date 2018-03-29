import { BaseEntity } from './../../shared';

export class Printer implements BaseEntity {
    constructor(
        public id?: number,
        public printerName?: string,
        public printerDescription?: string,
        public managed?: boolean,
    ) {
        this.managed = false;
    }
}
