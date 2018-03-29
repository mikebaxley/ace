import { BaseEntity } from './../../shared';

export class DocumentGeneric implements BaseEntity {
    constructor(
        public id?: number,
        public documentKey?: string,
        public matchIssueOrResidentState?: string,
        public bundleToDocuments?: BaseEntity[],
        public documentSpecifics?: BaseEntity[],
        public documentType?: BaseEntity,
        public aceCompanies?: BaseEntity[],
    ) {
    }
}
