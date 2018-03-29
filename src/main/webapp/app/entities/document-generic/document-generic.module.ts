import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    DocumentGenericService,
    DocumentGenericPopupService,
    DocumentGenericComponent,
    DocumentGenericDetailComponent,
    DocumentGenericDialogComponent,
    DocumentGenericPopupComponent,
    DocumentGenericDeletePopupComponent,
    DocumentGenericDeleteDialogComponent,
    documentGenericRoute,
    documentGenericPopupRoute,
} from './';

const ENTITY_STATES = [
    ...documentGenericRoute,
    ...documentGenericPopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocumentGenericComponent,
        DocumentGenericDetailComponent,
        DocumentGenericDialogComponent,
        DocumentGenericDeleteDialogComponent,
        DocumentGenericPopupComponent,
        DocumentGenericDeletePopupComponent,
    ],
    entryComponents: [
        DocumentGenericComponent,
        DocumentGenericDialogComponent,
        DocumentGenericPopupComponent,
        DocumentGenericDeleteDialogComponent,
        DocumentGenericDeletePopupComponent,
    ],
    providers: [
        DocumentGenericService,
        DocumentGenericPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceDocumentGenericModule {}
