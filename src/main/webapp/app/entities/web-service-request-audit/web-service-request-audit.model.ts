import { BaseEntity } from './../../shared';

export class WebServiceRequestAudit implements BaseEntity {
    constructor(
        public id?: number,
        public requestWhen?: any,
        public operation?: string,
        public durationMs?: number,
        public exception?: string,
        public wsRequest?: string,
        public wsResponse?: string,
        public callingApp?: string,
        public fromServer?: string,
        public extraField?: string,
        public printManagement?: BaseEntity,
    ) {
    }
}
