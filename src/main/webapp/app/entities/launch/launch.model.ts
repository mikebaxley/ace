import { BaseEntity } from './../../shared';

export class Launch implements BaseEntity {
    constructor(
        public id?: number,
        public launchApp?: string,
        public launchKey?: string,
        public enabled?: boolean,
        public bundleGroup?: BaseEntity,
    ) {
        this.enabled = false;
    }
}
