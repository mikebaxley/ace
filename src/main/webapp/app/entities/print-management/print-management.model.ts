import { BaseEntity } from './../../shared';

export class PrintManagement implements BaseEntity {
    constructor(
        public id?: number,
        public printerName?: string,
        public whenDocumentCreated?: any,
        public fromServer?: string,
        public documentFileName?: string,
        public documentFullPath?: string,
        public documentStatus?: string,
        public tryCount?: number,
        public whenProcessed?: any,
        public processingDuration?: number,
        public processingInfo?: string,
        public extraField?: string,
        public fromRequest?: BaseEntity,
    ) {
    }
}
