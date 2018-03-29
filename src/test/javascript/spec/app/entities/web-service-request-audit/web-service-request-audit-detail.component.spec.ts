/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { WebServiceRequestAuditDetailComponent } from '../../../../../../main/webapp/app/entities/web-service-request-audit/web-service-request-audit-detail.component';
import { WebServiceRequestAuditService } from '../../../../../../main/webapp/app/entities/web-service-request-audit/web-service-request-audit.service';
import { WebServiceRequestAudit } from '../../../../../../main/webapp/app/entities/web-service-request-audit/web-service-request-audit.model';

describe('Component Tests', () => {

    describe('WebServiceRequestAudit Management Detail Component', () => {
        let comp: WebServiceRequestAuditDetailComponent;
        let fixture: ComponentFixture<WebServiceRequestAuditDetailComponent>;
        let service: WebServiceRequestAuditService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [WebServiceRequestAuditDetailComponent],
                providers: [
                    WebServiceRequestAuditService
                ]
            })
            .overrideTemplate(WebServiceRequestAuditDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WebServiceRequestAuditDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WebServiceRequestAuditService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new WebServiceRequestAudit(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.webServiceRequestAudit).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
