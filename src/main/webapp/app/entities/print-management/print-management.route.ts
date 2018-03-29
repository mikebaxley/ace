import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { PrintManagementComponent } from './print-management.component';
import { PrintManagementDetailComponent } from './print-management-detail.component';
import { PrintManagementPopupComponent } from './print-management-dialog.component';
import { PrintManagementDeletePopupComponent } from './print-management-delete-dialog.component';

export const printManagementRoute: Routes = [
    {
        path: 'print-management',
        component: PrintManagementComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrintManagements'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'print-management/:id',
        component: PrintManagementDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrintManagements'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const printManagementPopupRoute: Routes = [
    {
        path: 'print-management-new',
        component: PrintManagementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrintManagements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'print-management/:id/edit',
        component: PrintManagementPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrintManagements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'print-management/:id/delete',
        component: PrintManagementDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PrintManagements'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
