import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DocumentStateComponent } from './document-state.component';
import { DocumentStateDetailComponent } from './document-state-detail.component';
import { DocumentStatePopupComponent } from './document-state-dialog.component';
import { DocumentStateDeletePopupComponent } from './document-state-delete-dialog.component';

export const documentStateRoute: Routes = [
    {
        path: 'document-state',
        component: DocumentStateComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentStates'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'document-state/:id',
        component: DocumentStateDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentStates'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentStatePopupRoute: Routes = [
    {
        path: 'document-state-new',
        component: DocumentStatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentStates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-state/:id/edit',
        component: DocumentStatePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentStates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-state/:id/delete',
        component: DocumentStateDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentStates'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
