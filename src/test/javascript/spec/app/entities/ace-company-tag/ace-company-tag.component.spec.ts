/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { AceCompanyTagComponent } from '../../../../../../main/webapp/app/entities/ace-company-tag/ace-company-tag.component';
import { AceCompanyTagService } from '../../../../../../main/webapp/app/entities/ace-company-tag/ace-company-tag.service';
import { AceCompanyTag } from '../../../../../../main/webapp/app/entities/ace-company-tag/ace-company-tag.model';

describe('Component Tests', () => {

    describe('AceCompanyTag Management Component', () => {
        let comp: AceCompanyTagComponent;
        let fixture: ComponentFixture<AceCompanyTagComponent>;
        let service: AceCompanyTagService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [AceCompanyTagComponent],
                providers: [
                    AceCompanyTagService
                ]
            })
            .overrideTemplate(AceCompanyTagComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AceCompanyTagComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AceCompanyTagService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AceCompanyTag(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.aceCompanyTags[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
