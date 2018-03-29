import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AceSharedModule } from '../../shared';
import {
    TemplateParametersService,
    TemplateParametersPopupService,
    TemplateParametersComponent,
    TemplateParametersDetailComponent,
    TemplateParametersDialogComponent,
    TemplateParametersPopupComponent,
    TemplateParametersDeletePopupComponent,
    TemplateParametersDeleteDialogComponent,
    templateParametersRoute,
    templateParametersPopupRoute,
} from './';

const ENTITY_STATES = [
    ...templateParametersRoute,
    ...templateParametersPopupRoute,
];

@NgModule({
    imports: [
        AceSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TemplateParametersComponent,
        TemplateParametersDetailComponent,
        TemplateParametersDialogComponent,
        TemplateParametersDeleteDialogComponent,
        TemplateParametersPopupComponent,
        TemplateParametersDeletePopupComponent,
    ],
    entryComponents: [
        TemplateParametersComponent,
        TemplateParametersDialogComponent,
        TemplateParametersPopupComponent,
        TemplateParametersDeleteDialogComponent,
        TemplateParametersDeletePopupComponent,
    ],
    providers: [
        TemplateParametersService,
        TemplateParametersPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceTemplateParametersModule {}
