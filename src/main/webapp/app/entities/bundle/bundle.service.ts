import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Bundle } from './bundle.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Bundle>;

@Injectable()
export class BundleService {

    private resourceUrl =  SERVER_API_URL + 'api/bundles';

    constructor(private http: HttpClient) { }

    create(bundle: Bundle): Observable<EntityResponseType> {
        const copy = this.convert(bundle);
        return this.http.post<Bundle>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(bundle: Bundle): Observable<EntityResponseType> {
        const copy = this.convert(bundle);
        return this.http.put<Bundle>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Bundle>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Bundle[]>> {
        const options = createRequestOption(req);
        return this.http.get<Bundle[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Bundle[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Bundle = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Bundle[]>): HttpResponse<Bundle[]> {
        const jsonResponse: Bundle[] = res.body;
        const body: Bundle[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Bundle.
     */
    private convertItemFromServer(bundle: Bundle): Bundle {
        const copy: Bundle = Object.assign({}, bundle);
        return copy;
    }

    /**
     * Convert a Bundle to a JSON which can be sent to the server.
     */
    private convert(bundle: Bundle): Bundle {
        const copy: Bundle = Object.assign({}, bundle);
        return copy;
    }
}
