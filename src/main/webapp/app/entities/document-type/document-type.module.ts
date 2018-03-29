import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    DocumentTypeService,
    DocumentTypePopupService,
    DocumentTypeComponent,
    DocumentTypeDetailComponent,
    DocumentTypeDialogComponent,
    DocumentTypePopupComponent,
    DocumentTypeDeletePopupComponent,
    DocumentTypeDeleteDialogComponent,
    documentTypeRoute,
    documentTypePopupRoute,
} from './';

const ENTITY_STATES = [
    ...documentTypeRoute,
    ...documentTypePopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocumentTypeComponent,
        DocumentTypeDetailComponent,
        DocumentTypeDialogComponent,
        DocumentTypeDeleteDialogComponent,
        DocumentTypePopupComponent,
        DocumentTypeDeletePopupComponent,
    ],
    entryComponents: [
        DocumentTypeComponent,
        DocumentTypeDialogComponent,
        DocumentTypePopupComponent,
        DocumentTypeDeleteDialogComponent,
        DocumentTypeDeletePopupComponent,
    ],
    providers: [
        DocumentTypeService,
        DocumentTypePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceDocumentTypeModule {}
