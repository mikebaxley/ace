import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    AceCompanyTagService,
    AceCompanyTagPopupService,
    AceCompanyTagComponent,
    AceCompanyTagDetailComponent,
    AceCompanyTagDialogComponent,
    AceCompanyTagPopupComponent,
    AceCompanyTagDeletePopupComponent,
    AceCompanyTagDeleteDialogComponent,
    aceCompanyTagRoute,
    aceCompanyTagPopupRoute,
} from './';

const ENTITY_STATES = [
    ...aceCompanyTagRoute,
    ...aceCompanyTagPopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AceCompanyTagComponent,
        AceCompanyTagDetailComponent,
        AceCompanyTagDialogComponent,
        AceCompanyTagDeleteDialogComponent,
        AceCompanyTagPopupComponent,
        AceCompanyTagDeletePopupComponent,
    ],
    entryComponents: [
        AceCompanyTagComponent,
        AceCompanyTagDialogComponent,
        AceCompanyTagPopupComponent,
        AceCompanyTagDeleteDialogComponent,
        AceCompanyTagDeletePopupComponent,
    ],
    providers: [
        AceCompanyTagService,
        AceCompanyTagPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceAceCompanyTagModule {}
