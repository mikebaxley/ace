import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AceLaunchModule } from './launch/launch.module';
import { AceBundleGroupModule } from './bundle-group/bundle-group.module';
import { AceBundleModule } from './bundle/bundle.module';
import { AceBundleToDocumentModule } from './bundle-to-document/bundle-to-document.module';
import { AceDocumentGenericModule } from './document-generic/document-generic.module';
import { AceDocumentSpecificModule } from './document-specific/document-specific.module';
import { AceTemplateParametersModule } from './template-parameters/template-parameters.module';
import { AceDocumentStateModule } from './document-state/document-state.module';
import { AceDocumentTypeModule } from './document-type/document-type.module';
import { AceAceCompanyModule } from './ace-company/ace-company.module';
import { AceAceCompanyTagModule } from './ace-company-tag/ace-company-tag.module';
import { AcePrinterModule } from './printer/printer.module';
import { AceWebServiceRequestAuditModule } from './web-service-request-audit/web-service-request-audit.module';
import { AcePrintManagementModule } from './print-management/print-management.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        AceLaunchModule,
        AceBundleGroupModule,
        AceBundleModule,
        AceBundleToDocumentModule,
        AceDocumentGenericModule,
        AceDocumentSpecificModule,
        AceTemplateParametersModule,
        AceDocumentStateModule,
        AceDocumentTypeModule,
        AceAceCompanyModule,
        AceAceCompanyTagModule,
        AcePrinterModule,
        AceWebServiceRequestAuditModule,
        AcePrintManagementModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AceEntityModule {}
