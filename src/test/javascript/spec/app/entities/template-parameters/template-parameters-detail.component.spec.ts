/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { TemplateParametersDetailComponent } from '../../../../../../main/webapp/app/entities/template-parameters/template-parameters-detail.component';
import { TemplateParametersService } from '../../../../../../main/webapp/app/entities/template-parameters/template-parameters.service';
import { TemplateParameters } from '../../../../../../main/webapp/app/entities/template-parameters/template-parameters.model';

describe('Component Tests', () => {

    describe('TemplateParameters Management Detail Component', () => {
        let comp: TemplateParametersDetailComponent;
        let fixture: ComponentFixture<TemplateParametersDetailComponent>;
        let service: TemplateParametersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [TemplateParametersDetailComponent],
                providers: [
                    TemplateParametersService
                ]
            })
            .overrideTemplate(TemplateParametersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemplateParametersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemplateParametersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TemplateParameters(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.templateParameters).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
