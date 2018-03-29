import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    BundleToDocumentService,
    BundleToDocumentPopupService,
    BundleToDocumentComponent,
    BundleToDocumentDetailComponent,
    BundleToDocumentDialogComponent,
    BundleToDocumentPopupComponent,
    BundleToDocumentDeletePopupComponent,
    BundleToDocumentDeleteDialogComponent,
    bundleToDocumentRoute,
    bundleToDocumentPopupRoute,
} from './';

const ENTITY_STATES = [
    ...bundleToDocumentRoute,
    ...bundleToDocumentPopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        BundleToDocumentComponent,
        BundleToDocumentDetailComponent,
        BundleToDocumentDialogComponent,
        BundleToDocumentDeleteDialogComponent,
        BundleToDocumentPopupComponent,
        BundleToDocumentDeletePopupComponent,
    ],
    entryComponents: [
        BundleToDocumentComponent,
        BundleToDocumentDialogComponent,
        BundleToDocumentPopupComponent,
        BundleToDocumentDeleteDialogComponent,
        BundleToDocumentDeletePopupComponent,
    ],
    providers: [
        BundleToDocumentService,
        BundleToDocumentPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceBundleToDocumentModule {}
