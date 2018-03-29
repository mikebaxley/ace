import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    BundleGroupService,
    BundleGroupPopupService,
    BundleGroupComponent,
    BundleGroupDetailComponent,
    BundleGroupDialogComponent,
    BundleGroupPopupComponent,
    BundleGroupDeletePopupComponent,
    BundleGroupDeleteDialogComponent,
    bundleGroupRoute,
    bundleGroupPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bundleGroupRoute,
    ...bundleGroupPopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BundleGroupComponent,
        BundleGroupDetailComponent,
        BundleGroupDialogComponent,
        BundleGroupDeleteDialogComponent,
        BundleGroupPopupComponent,
        BundleGroupDeletePopupComponent,
    ],
    entryComponents: [
        BundleGroupComponent,
        BundleGroupDialogComponent,
        BundleGroupPopupComponent,
        BundleGroupDeleteDialogComponent,
        BundleGroupDeletePopupComponent,
    ],
    providers: [
        BundleGroupService,
        BundleGroupPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceBundleGroupModule {}
