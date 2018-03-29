import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { BundleToDocumentComponent } from './bundle-to-document.component';
import { BundleToDocumentDetailComponent } from './bundle-to-document-detail.component';
import { BundleToDocumentPopupComponent } from './bundle-to-document-dialog.component';
import { BundleToDocumentDeletePopupComponent } from './bundle-to-document-delete-dialog.component';

export const bundleToDocumentRoute: Routes = [
    {
        path: 'bundle-to-document',
        component: BundleToDocumentComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BundleToDocuments'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'bundle-to-document/:id',
        component: BundleToDocumentDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BundleToDocuments'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const bundleToDocumentPopupRoute: Routes = [
    {
        path: 'bundle-to-document-new',
        component: BundleToDocumentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BundleToDocuments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bundle-to-document/:id/edit',
        component: BundleToDocumentPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BundleToDocuments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'bundle-to-document/:id/delete',
        component: BundleToDocumentDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'BundleToDocuments'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
