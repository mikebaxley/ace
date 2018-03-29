import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { WebServiceRequestAudit } from './web-service-request-audit.model';
import { WebServiceRequestAuditService } from './web-service-request-audit.service';

@Injectable()
export class WebServiceRequestAuditPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private webServiceRequestAuditService: WebServiceRequestAuditService

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
                this.webServiceRequestAuditService.find(id)
                    .subscribe((webServiceRequestAuditResponse: HttpResponse<WebServiceRequestAudit>) => {
                        const webServiceRequestAudit: WebServiceRequestAudit = webServiceRequestAuditResponse.body;
                        webServiceRequestAudit.requestWhen = this.datePipe
                            .transform(webServiceRequestAudit.requestWhen, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.webServiceRequestAuditModalRef(component, webServiceRequestAudit);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.webServiceRequestAuditModalRef(component, new WebServiceRequestAudit());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    webServiceRequestAuditModalRef(component: Component, webServiceRequestAudit: WebServiceRequestAudit): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.webServiceRequestAudit = webServiceRequestAudit;
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
