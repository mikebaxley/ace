import { BaseEntity } from './../../shared';

export class AceCompany implements BaseEntity {
    constructor(
        public id?: number,
        public regionCode?: string,
        public companyCode?: string,
        public canadian?: boolean,
        public letterhead?: string,
        public reinstatementCanadian?: boolean,
        public url?: string,
        public variableProducts?: boolean,
        public adminSystem?: string,
        public webSite?: string,
        public statCoCode?: string,
        public webWord?: string,
        public optParam?: string,
        public logo?: string,
        public aceCompanyTags?: BaseEntity[],
        public printers?: BaseEntity[],
        public documents?: BaseEntity[],
    ) {
        this.canadian = false;
        this.reinstatementCanadian = false;
        this.variableProducts = false;
    }
}
