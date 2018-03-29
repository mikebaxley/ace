import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { DocumentSpecificComponent } from './document-specific.component';
import { DocumentSpecificDetailComponent } from './document-specific-detail.component';
import { DocumentSpecificPopupComponent } from './document-specific-dialog.component';
import { DocumentSpecificDeletePopupComponent } from './document-specific-delete-dialog.component';

export const documentSpecificRoute: Routes = [
    {
        path: 'document-specific',
        component: DocumentSpecificComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentSpecifics'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'document-specific/:id',
        component: DocumentSpecificDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentSpecifics'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const documentSpecificPopupRoute: Routes = [
    {
        path: 'document-specific-new',
        component: DocumentSpecificPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentSpecifics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-specific/:id/edit',
        component: DocumentSpecificPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentSpecifics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'document-specific/:id/delete',
        component: DocumentSpecificDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DocumentSpecifics'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
