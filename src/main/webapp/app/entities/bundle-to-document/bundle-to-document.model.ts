import { BaseEntity } from './../../shared';

export class BundleToDocument implements BaseEntity {
    constructor(
        public id?: number,
        public collateSequence?: number,
        public optional?: boolean,
        public bundle?: BaseEntity,
        public document?: BaseEntity,
    ) {
        this.optional = false;
    }
}
