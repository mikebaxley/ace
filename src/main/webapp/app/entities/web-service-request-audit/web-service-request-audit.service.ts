import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { WebServiceRequestAudit } from './web-service-request-audit.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<WebServiceRequestAudit>;

@Injectable()
export class WebServiceRequestAuditService {

    private resourceUrl =  SERVER_API_URL + 'api/web-service-request-audits';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(webServiceRequestAudit: WebServiceRequestAudit): Observable<EntityResponseType> {
        const copy = this.convert(webServiceRequestAudit);
        return this.http.post<WebServiceRequestAudit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(webServiceRequestAudit: WebServiceRequestAudit): Observable<EntityResponseType> {
        const copy = this.convert(webServiceRequestAudit);
        return this.http.put<WebServiceRequestAudit>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<WebServiceRequestAudit>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<WebServiceRequestAudit[]>> {
        const options = createRequestOption(req);
        return this.http.get<WebServiceRequestAudit[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<WebServiceRequestAudit[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: WebServiceRequestAudit = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<WebServiceRequestAudit[]>): HttpResponse<WebServiceRequestAudit[]> {
        const jsonResponse: WebServiceRequestAudit[] = res.body;
        const body: WebServiceRequestAudit[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to WebServiceRequestAudit.
     */
    private convertItemFromServer(webServiceRequestAudit: WebServiceRequestAudit): WebServiceRequestAudit {
        const copy: WebServiceRequestAudit = Object.assign({}, webServiceRequestAudit);
        copy.requestWhen = this.dateUtils
            .convertDateTimeFromServer(webServiceRequestAudit.requestWhen);
        return copy;
    }

    /**
     * Convert a WebServiceRequestAudit to a JSON which can be sent to the server.
     */
    private convert(webServiceRequestAudit: WebServiceRequestAudit): WebServiceRequestAudit {
        const copy: WebServiceRequestAudit = Object.assign({}, webServiceRequestAudit);

        copy.requestWhen = this.dateUtils.toDate(webServiceRequestAudit.requestWhen);
        return copy;
    }
}
