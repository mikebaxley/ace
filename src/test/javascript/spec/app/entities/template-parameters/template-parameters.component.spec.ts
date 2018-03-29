/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AceTestModule } from '../../../test.module';
import { TemplateParametersComponent } from '../../../../../../main/webapp/app/entities/template-parameters/template-parameters.component';
import { TemplateParametersService } from '../../../../../../main/webapp/app/entities/template-parameters/template-parameters.service';
import { TemplateParameters } from '../../../../../../main/webapp/app/entities/template-parameters/template-parameters.model';

describe('Component Tests', () => {

    describe('TemplateParameters Management Component', () => {
        let comp: TemplateParametersComponent;
        let fixture: ComponentFixture<TemplateParametersComponent>;
        let service: TemplateParametersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [TemplateParametersComponent],
                providers: [
                    TemplateParametersService
                ]
            })
            .overrideTemplate(TemplateParametersComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TemplateParametersComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TemplateParametersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TemplateParameters(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.templateParameters[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
