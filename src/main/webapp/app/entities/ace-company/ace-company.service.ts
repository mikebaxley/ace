import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AceCompany } from './ace-company.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AceCompany>;

@Injectable()
export class AceCompanyService {

    private resourceUrl =  SERVER_API_URL + 'api/ace-companies';

    constructor(private http: HttpClient) { }

    create(aceCompany: AceCompany): Observable<EntityResponseType> {
        const copy = this.convert(aceCompany);
        return this.http.post<AceCompany>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(aceCompany: AceCompany): Observable<EntityResponseType> {
        const copy = this.convert(aceCompany);
        return this.http.put<AceCompany>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AceCompany>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AceCompany[]>> {
        const options = createRequestOption(req);
        return this.http.get<AceCompany[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AceCompany[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AceCompany = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AceCompany[]>): HttpResponse<AceCompany[]> {
        const jsonResponse: AceCompany[] = res.body;
        const body: AceCompany[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AceCompany.
     */
    private convertItemFromServer(aceCompany: AceCompany): AceCompany {
        const copy: AceCompany = Object.assign({}, aceCompany);
        return copy;
    }

    /**
     * Convert a AceCompany to a JSON which can be sent to the server.
     */
    private convert(aceCompany: AceCompany): AceCompany {
        const copy: AceCompany = Object.assign({}, aceCompany);
        return copy;
    }
}
