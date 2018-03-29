import { BaseEntity } from './../../shared';

export class BundleGroup implements BaseEntity {
    constructor(
        public id?: number,
        public bundleGroupName?: string,
        public bundleGroupKey?: string,
        public bundles?: BaseEntity[],
    ) {
    }
}
