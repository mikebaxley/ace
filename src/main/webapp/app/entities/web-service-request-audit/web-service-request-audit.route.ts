import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { WebServiceRequestAuditComponent } from './web-service-request-audit.component';
import { WebServiceRequestAuditDetailComponent } from './web-service-request-audit-detail.component';
import { WebServiceRequestAuditPopupComponent } from './web-service-request-audit-dialog.component';
import { WebServiceRequestAuditDeletePopupComponent } from './web-service-request-audit-delete-dialog.component';

export const webServiceRequestAuditRoute: Routes = [
    {
        path: 'web-service-request-audit',
        component: WebServiceRequestAuditComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WebServiceRequestAudits'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'web-service-request-audit/:id',
        component: WebServiceRequestAuditDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WebServiceRequestAudits'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const webServiceRequestAuditPopupRoute: Routes = [
    {
        path: 'web-service-request-audit-new',
        component: WebServiceRequestAuditPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WebServiceRequestAudits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'web-service-request-audit/:id/edit',
        component: WebServiceRequestAuditPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WebServiceRequestAudits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'web-service-request-audit/:id/delete',
        component: WebServiceRequestAuditDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'WebServiceRequestAudits'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
