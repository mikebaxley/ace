import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    DocumentStateService,
    DocumentStatePopupService,
    DocumentStateComponent,
    DocumentStateDetailComponent,
    DocumentStateDialogComponent,
    DocumentStatePopupComponent,
    DocumentStateDeletePopupComponent,
    DocumentStateDeleteDialogComponent,
    documentStateRoute,
    documentStatePopupRoute,
} from './';

const ENTITY_STATES = [
    ...documentStateRoute,
    ...documentStatePopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocumentStateComponent,
        DocumentStateDetailComponent,
        DocumentStateDialogComponent,
        DocumentStateDeleteDialogComponent,
        DocumentStatePopupComponent,
        DocumentStateDeletePopupComponent,
    ],
    entryComponents: [
        DocumentStateComponent,
        DocumentStateDialogComponent,
        DocumentStatePopupComponent,
        DocumentStateDeleteDialogComponent,
        DocumentStateDeletePopupComponent,
    ],
    providers: [
        DocumentStateService,
        DocumentStatePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceDocumentStateModule {}
