/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { AceCompanyTagDetailComponent } from '../../../../../../main/webapp/app/entities/ace-company-tag/ace-company-tag-detail.component';
import { AceCompanyTagService } from '../../../../../../main/webapp/app/entities/ace-company-tag/ace-company-tag.service';
import { AceCompanyTag } from '../../../../../../main/webapp/app/entities/ace-company-tag/ace-company-tag.model';

describe('Component Tests', () => {

    describe('AceCompanyTag Management Detail Component', () => {
        let comp: AceCompanyTagDetailComponent;
        let fixture: ComponentFixture<AceCompanyTagDetailComponent>;
        let service: AceCompanyTagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [AceCompanyTagDetailComponent],
                providers: [
                    AceCompanyTagService
                ]
            })
            .overrideTemplate(AceCompanyTagDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AceCompanyTagDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AceCompanyTagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AceCompanyTag(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.aceCompanyTag).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
