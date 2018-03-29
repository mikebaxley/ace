import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    WebServiceRequestAuditService,
    WebServiceRequestAuditPopupService,
    WebServiceRequestAuditComponent,
    WebServiceRequestAuditDetailComponent,
    WebServiceRequestAuditDialogComponent,
    WebServiceRequestAuditPopupComponent,
    WebServiceRequestAuditDeletePopupComponent,
    WebServiceRequestAuditDeleteDialogComponent,
    webServiceRequestAuditRoute,
    webServiceRequestAuditPopupRoute,
} from './';

const ENTITY_STATES = [
    ...webServiceRequestAuditRoute,
    ...webServiceRequestAuditPopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        WebServiceRequestAuditComponent,
        WebServiceRequestAuditDetailComponent,
        WebServiceRequestAuditDialogComponent,
        WebServiceRequestAuditDeleteDialogComponent,
        WebServiceRequestAuditPopupComponent,
        WebServiceRequestAuditDeletePopupComponent,
    ],
    entryComponents: [
        WebServiceRequestAuditComponent,
        WebServiceRequestAuditDialogComponent,
        WebServiceRequestAuditPopupComponent,
        WebServiceRequestAuditDeleteDialogComponent,
        WebServiceRequestAuditDeletePopupComponent,
    ],
    providers: [
        WebServiceRequestAuditService,
        WebServiceRequestAuditPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceWebServiceRequestAuditModule {}
