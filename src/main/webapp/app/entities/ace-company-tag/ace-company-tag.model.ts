import { BaseEntity } from './../../shared';

export class AceCompanyTag implements BaseEntity {
    constructor(
        public id?: number,
        public companyTag?: string,
        public companyTagValue?: string,
        public aceCompany?: BaseEntity,
    ) {
    }
}
