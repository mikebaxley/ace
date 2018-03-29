import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { TemplateParameters } from './template-parameters.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<TemplateParameters>;

@Injectable()
export class TemplateParametersService {

    private resourceUrl =  SERVER_API_URL + 'api/template-parameters';

    constructor(private http: HttpClient) { }

    create(templateParameters: TemplateParameters): Observable<EntityResponseType> {
        const copy = this.convert(templateParameters);
        return this.http.post<TemplateParameters>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(templateParameters: TemplateParameters): Observable<EntityResponseType> {
        const copy = this.convert(templateParameters);
        return this.http.put<TemplateParameters>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<TemplateParameters>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<TemplateParameters[]>> {
        const options = createRequestOption(req);
        return this.http.get<TemplateParameters[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<TemplateParameters[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: TemplateParameters = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<TemplateParameters[]>): HttpResponse<TemplateParameters[]> {
        const jsonResponse: TemplateParameters[] = res.body;
        const body: TemplateParameters[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to TemplateParameters.
     */
    private convertItemFromServer(templateParameters: TemplateParameters): TemplateParameters {
        const copy: TemplateParameters = Object.assign({}, templateParameters);
        return copy;
    }

    /**
     * Convert a TemplateParameters to a JSON which can be sent to the server.
     */
    private convert(templateParameters: TemplateParameters): TemplateParameters {
        const copy: TemplateParameters = Object.assign({}, templateParameters);
        return copy;
    }
}
