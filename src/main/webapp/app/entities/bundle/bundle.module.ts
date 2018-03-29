import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    BundleService,
    BundlePopupService,
    BundleComponent,
    BundleDetailComponent,
    BundleDialogComponent,
    BundlePopupComponent,
    BundleDeletePopupComponent,
    BundleDeleteDialogComponent,
    bundleRoute,
    bundlePopupRoute,
} from './';

const ENTITY_STATES = [
    ...bundleRoute,
    ...bundlePopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BundleComponent,
        BundleDetailComponent,
        BundleDialogComponent,
        BundleDeleteDialogComponent,
        BundlePopupComponent,
        BundleDeletePopupComponent,
    ],
    entryComponents: [
        BundleComponent,
        BundleDialogComponent,
        BundlePopupComponent,
        BundleDeleteDialogComponent,
        BundleDeletePopupComponent,
    ],
    providers: [
        BundleService,
        BundlePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceBundleModule {}
