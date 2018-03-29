/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { AceTestModule } from '../../../test.module';
import { BundleGroupDetailComponent } from '../../../../../../main/webapp/app/entities/bundle-group/bundle-group-detail.component';
import { BundleGroupService } from '../../../../../../main/webapp/app/entities/bundle-group/bundle-group.service';
import { BundleGroup } from '../../../../../../main/webapp/app/entities/bundle-group/bundle-group.model';

describe('Component Tests', () => {

    describe('BundleGroup Management Detail Component', () => {
        let comp: BundleGroupDetailComponent;
        let fixture: ComponentFixture<BundleGroupDetailComponent>;
        let service: BundleGroupService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [AceTestModule],
                declarations: [BundleGroupDetailComponent],
                providers: [
                    BundleGroupService
                ]
            })
            .overrideTemplate(BundleGroupDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BundleGroupDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BundleGroupService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new BundleGroup(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.bundleGroup).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
