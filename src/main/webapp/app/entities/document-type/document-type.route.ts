import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DocumentTypeComponent } from './document-type.component';
import { DocumentTypeDetailComponent } from './document-type-detail.component';
import { DocumentTypePopupComponent } from './document-type-dialog.component';
import { DocumentTypeDeletePopupComponent } from './document-type-delete-dialog.component';

export const documentTypeRoute: Routes = [
    {
        path: 'document-type',
        component: DocumentTypeComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentTypes'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'document-type/:id',
        component: DocumentTypeDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentTypes'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentTypePopupRoute: Routes = [
    {
        path: 'document-type-new',
        component: DocumentTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-type/:id/edit',
        component: DocumentTypePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-type/:id/delete',
        component: DocumentTypeDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentTypes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
