import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DocumentGenericComponent } from './document-generic.component';
import { DocumentGenericDetailComponent } from './document-generic-detail.component';
import { DocumentGenericPopupComponent } from './document-generic-dialog.component';
import { DocumentGenericDeletePopupComponent } from './document-generic-delete-dialog.component';

export const documentGenericRoute: Routes = [
    {
        path: 'document-generic',
        component: DocumentGenericComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentGenerics'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'document-generic/:id',
        component: DocumentGenericDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentGenerics'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentGenericPopupRoute: Routes = [
    {
        path: 'document-generic-new',
        component: DocumentGenericPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentGenerics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-generic/:id/edit',
        component: DocumentGenericPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentGenerics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-generic/:id/delete',
        component: DocumentGenericDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentGenerics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
