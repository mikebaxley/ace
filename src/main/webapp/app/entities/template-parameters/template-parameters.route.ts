import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { TemplateParametersComponent } from './template-parameters.component';
import { TemplateParametersDetailComponent } from './template-parameters-detail.component';
import { TemplateParametersPopupComponent } from './template-parameters-dialog.component';
import { TemplateParametersDeletePopupComponent } from './template-parameters-delete-dialog.component';

export const templateParametersRoute: Routes = [
    {
        path: 'template-parameters',
        component: TemplateParametersComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TemplateParameters'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'template-parameters/:id',
        component: TemplateParametersDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TemplateParameters'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const templateParametersPopupRoute: Routes = [
    {
        path: 'template-parameters-new',
        component: TemplateParametersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TemplateParameters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'template-parameters/:id/edit',
        component: TemplateParametersPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TemplateParameters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'template-parameters/:id/delete',
        component: TemplateParametersDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TemplateParameters'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
