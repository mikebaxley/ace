import { BaseEntity } from './../../shared';

export class DocumentGeneric implements BaseEntity {
    constructor(
        public id?: number,
        public genericKey?: string,
        public matchIssueOrResidentState?: string,
        public documentType?: BaseEntity,
        public aceCompanies?: BaseEntity[],
    ) {
    }
}
