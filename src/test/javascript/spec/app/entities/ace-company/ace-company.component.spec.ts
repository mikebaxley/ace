/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { AceCompanyComponent } from '../../../../../../main/webapp/app/entities/ace-company/ace-company.component';
import { AceCompanyService } from '../../../../../../main/webapp/app/entities/ace-company/ace-company.service';
import { AceCompany } from '../../../../../../main/webapp/app/entities/ace-company/ace-company.model';

describe('Component Tests', () => {

    describe('AceCompany Management Component', () => {
        let comp: AceCompanyComponent;
        let fixture: ComponentFixture<AceCompanyComponent>;
        let service: AceCompanyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [AceCompanyComponent],
                providers: [
                    AceCompanyService
                ]
            })
            .overrideTemplate(AceCompanyComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AceCompanyComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AceCompanyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AceCompany(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.aceCompanies[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
