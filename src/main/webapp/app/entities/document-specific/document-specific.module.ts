import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    DocumentSpecificService,
    DocumentSpecificPopupService,
    DocumentSpecificComponent,
    DocumentSpecificDetailComponent,
    DocumentSpecificDialogComponent,
    DocumentSpecificPopupComponent,
    DocumentSpecificDeletePopupComponent,
    DocumentSpecificDeleteDialogComponent,
    documentSpecificRoute,
    documentSpecificPopupRoute,
} from './';

const ENTITY_STATES = [
    ...documentSpecificRoute,
    ...documentSpecificPopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        DocumentSpecificComponent,
        DocumentSpecificDetailComponent,
        DocumentSpecificDialogComponent,
        DocumentSpecificDeleteDialogComponent,
        DocumentSpecificPopupComponent,
        DocumentSpecificDeletePopupComponent,
    ],
    entryComponents: [
        DocumentSpecificComponent,
        DocumentSpecificDialogComponent,
        DocumentSpecificPopupComponent,
        DocumentSpecificDeleteDialogComponent,
        DocumentSpecificDeletePopupComponent,
    ],
    providers: [
        DocumentSpecificService,
        DocumentSpecificPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceDocumentSpecificModule {}
