import { BaseEntity } from './../../shared';

export class Bundle implements BaseEntity {
    constructor(
        public id?: number,
        public bundleName?: string,
        public bundleKey?: string,
        public awdSourceType?: string,
        public bundleToDocuments?: BaseEntity[],
        public bundleGroups?: BaseEntity[],
    ) {
    }
}
