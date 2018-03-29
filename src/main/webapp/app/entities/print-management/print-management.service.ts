import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { PrintManagement } from './print-management.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<PrintManagement>;

@Injectable()
export class PrintManagementService {

    private resourceUrl =  SERVER_API_URL + 'api/print-managements';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(printManagement: PrintManagement): Observable<EntityResponseType> {
        const copy = this.convert(printManagement);
        return this.http.post<PrintManagement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(printManagement: PrintManagement): Observable<EntityResponseType> {
        const copy = this.convert(printManagement);
        return this.http.put<PrintManagement>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<PrintManagement>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<PrintManagement[]>> {
        const options = createRequestOption(req);
        return this.http.get<PrintManagement[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<PrintManagement[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: PrintManagement = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<PrintManagement[]>): HttpResponse<PrintManagement[]> {
        const jsonResponse: PrintManagement[] = res.body;
        const body: PrintManagement[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to PrintManagement.
     */
    private convertItemFromServer(printManagement: PrintManagement): PrintManagement {
        const copy: PrintManagement = Object.assign({}, printManagement);
        copy.whenDocumentCreated = this.dateUtils
            .convertDateTimeFromServer(printManagement.whenDocumentCreated);
        copy.whenProcessed = this.dateUtils
            .convertDateTimeFromServer(printManagement.whenProcessed);
        return copy;
    }

    /**
     * Convert a PrintManagement to a JSON which can be sent to the server.
     */
    private convert(printManagement: PrintManagement): PrintManagement {
        const copy: PrintManagement = Object.assign({}, printManagement);

        copy.whenDocumentCreated = this.dateUtils.toDate(printManagement.whenDocumentCreated);

        copy.whenProcessed = this.dateUtils.toDate(printManagement.whenProcessed);
        return copy;
    }
}
