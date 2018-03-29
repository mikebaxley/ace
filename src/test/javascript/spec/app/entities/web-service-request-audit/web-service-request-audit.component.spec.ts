/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { WebServiceRequestAuditComponent } from '../../../../../../main/webapp/app/entities/web-service-request-audit/web-service-request-audit.component';
import { WebServiceRequestAuditService } from '../../../../../../main/webapp/app/entities/web-service-request-audit/web-service-request-audit.service';
import { WebServiceRequestAudit } from '../../../../../../main/webapp/app/entities/web-service-request-audit/web-service-request-audit.model';

describe('Component Tests', () => {

    describe('WebServiceRequestAudit Management Component', () => {
        let comp: WebServiceRequestAuditComponent;
        let fixture: ComponentFixture<WebServiceRequestAuditComponent>;
        let service: WebServiceRequestAuditService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [WebServiceRequestAuditComponent],
                providers: [
                    WebServiceRequestAuditService
                ]
            })
            .overrideTemplate(WebServiceRequestAuditComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(WebServiceRequestAuditComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(WebServiceRequestAuditService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new WebServiceRequestAudit(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.webServiceRequestAudits[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
