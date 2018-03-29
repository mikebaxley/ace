import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    AceCompanyService,
    AceCompanyPopupService,
    AceCompanyComponent,
    AceCompanyDetailComponent,
    AceCompanyDialogComponent,
    AceCompanyPopupComponent,
    AceCompanyDeletePopupComponent,
    AceCompanyDeleteDialogComponent,
    aceCompanyRoute,
    aceCompanyPopupRoute,
} from './';

const ENTITY_STATES = [
    ...aceCompanyRoute,
    ...aceCompanyPopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AceCompanyComponent,
        AceCompanyDetailComponent,
        AceCompanyDialogComponent,
        AceCompanyDeleteDialogComponent,
        AceCompanyPopupComponent,
        AceCompanyDeletePopupComponent,
    ],
    entryComponents: [
        AceCompanyComponent,
        AceCompanyDialogComponent,
        AceCompanyPopupComponent,
        AceCompanyDeleteDialogComponent,
        AceCompanyDeletePopupComponent,
    ],
    providers: [
        AceCompanyService,
        AceCompanyPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceAceCompanyModule {}
