import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PrintManagement } from './print-management.model';
import { PrintManagementService } from './print-management.service';

@Injectable()
export class PrintManagementPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private printManagementService: PrintManagementService

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
                this.printManagementService.find(id)
                    .subscribe((printManagementResponse: HttpResponse<PrintManagement>) => {
                        const printManagement: PrintManagement = printManagementResponse.body;
                        printManagement.whenDocumentCreated = this.datePipe
                            .transform(printManagement.whenDocumentCreated, 'yyyy-MM-ddTHH:mm:ss');
                        printManagement.whenProcessed = this.datePipe
                            .transform(printManagement.whenProcessed, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.printManagementModalRef(component, printManagement);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.printManagementModalRef(component, new PrintManagement());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    printManagementModalRef(component: Component, printManagement: PrintManagement): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.printManagement = printManagement;
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
