import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { TemplateParameters } from './template-parameters.model';
import { TemplateParametersService } from './template-parameters.service';

@Injectable()
export class TemplateParametersPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private templateParametersService: TemplateParametersService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.templateParametersService.find(id)
                    .subscribe((templateParametersResponse: HttpResponse<TemplateParameters>) => {
                        const templateParameters: TemplateParameters = templateParametersResponse.body;
                        this.ngbModalRef = this.templateParametersModalRef(component, templateParameters);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.templateParametersModalRef(component, new TemplateParameters());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    templateParametersModalRef(component: Component, templateParameters: TemplateParameters): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.templateParameters = templateParameters;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
