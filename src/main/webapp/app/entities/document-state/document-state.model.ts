import { BaseEntity } from './../../shared';

export class DocumentState implements BaseEntity {
    constructor(
        public id?: number,
        public state?: string,
        public documents?: BaseEntity[],
    ) {
    }
}
