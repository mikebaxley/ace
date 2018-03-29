import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    PrintManagementService,
    PrintManagementPopupService,
    PrintManagementComponent,
    PrintManagementDetailComponent,
    PrintManagementDialogComponent,
    PrintManagementPopupComponent,
    PrintManagementDeletePopupComponent,
    PrintManagementDeleteDialogComponent,
    printManagementRoute,
    printManagementPopupRoute,
} from './';

const ENTITY_STATES = [
    ...printManagementRoute,
    ...printManagementPopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        PrintManagementComponent,
        PrintManagementDetailComponent,
        PrintManagementDialogComponent,
        PrintManagementDeleteDialogComponent,
        PrintManagementPopupComponent,
        PrintManagementDeletePopupComponent,
    ],
    entryComponents: [
        PrintManagementComponent,
        PrintManagementDialogComponent,
        PrintManagementPopupComponent,
        PrintManagementDeleteDialogComponent,
        PrintManagementDeletePopupComponent,
    ],
    providers: [
        PrintManagementService,
        PrintManagementPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AcePrintManagementModule {}
