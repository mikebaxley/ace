/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { AceCompanyDetailComponent } from '../../../../../../main/webapp/app/entities/ace-company/ace-company-detail.component';
import { AceCompanyService } from '../../../../../../main/webapp/app/entities/ace-company/ace-company.service';
import { AceCompany } from '../../../../../../main/webapp/app/entities/ace-company/ace-company.model';

describe('Component Tests', () => {

    describe('AceCompany Management Detail Component', () => {
        let comp: AceCompanyDetailComponent;
        let fixture: ComponentFixture<AceCompanyDetailComponent>;
        let service: AceCompanyService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [AceCompanyDetailComponent],
                providers: [
                    AceCompanyService
                ]
            })
            .overrideTemplate(AceCompanyDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AceCompanyDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AceCompanyService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AceCompany(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.aceCompany).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
