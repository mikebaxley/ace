import { BaseEntity } from './../../shared';

export class DocumentSpecific implements BaseEntity {
    constructor(
        public id?: number,
        public fileName?: string,
        public filePath?: string,
        public templateParameters?: BaseEntity[],
        public documentStates?: BaseEntity[],
        public document?: BaseEntity,
    ) {
    }
}
