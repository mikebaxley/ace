import { BaseEntity } from './../../shared';

export class DocumentSpecific implements BaseEntity {
    constructor(
        public id?: number,
        public documentKey?: string,
        public fileName?: string,
        public filePath?: string,
        public document?: BaseEntity,
        public documentStates?: BaseEntity[],
    ) {
    }
}
