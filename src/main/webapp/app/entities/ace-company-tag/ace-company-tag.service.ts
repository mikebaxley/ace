import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AceCompanyTag } from './ace-company-tag.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AceCompanyTag>;

@Injectable()
export class AceCompanyTagService {

    private resourceUrl =  SERVER_API_URL + 'api/ace-company-tags';

    constructor(private http: HttpClient) { }

    create(aceCompanyTag: AceCompanyTag): Observable<EntityResponseType> {
        const copy = this.convert(aceCompanyTag);
        return this.http.post<AceCompanyTag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(aceCompanyTag: AceCompanyTag): Observable<EntityResponseType> {
        const copy = this.convert(aceCompanyTag);
        return this.http.put<AceCompanyTag>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AceCompanyTag>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AceCompanyTag[]>> {
        const options = createRequestOption(req);
        return this.http.get<AceCompanyTag[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AceCompanyTag[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AceCompanyTag = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AceCompanyTag[]>): HttpResponse<AceCompanyTag[]> {
        const jsonResponse: AceCompanyTag[] = res.body;
        const body: AceCompanyTag[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AceCompanyTag.
     */
    private convertItemFromServer(aceCompanyTag: AceCompanyTag): AceCompanyTag {
        const copy: AceCompanyTag = Object.assign({}, aceCompanyTag);
        return copy;
    }

    /**
     * Convert a AceCompanyTag to a JSON which can be sent to the server.
     */
    private convert(aceCompanyTag: AceCompanyTag): AceCompanyTag {
        const copy: AceCompanyTag = Object.assign({}, aceCompanyTag);
        return copy;
    }
}
