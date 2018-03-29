import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Launch } from './launch.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Launch>;

@Injectable()
export class LaunchService {

    private resourceUrl =  SERVER_API_URL + 'api/launches';

    constructor(private http: HttpClient) { }

    create(launch: Launch): Observable<EntityResponseType> {
        const copy = this.convert(launch);
        return this.http.post<Launch>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(launch: Launch): Observable<EntityResponseType> {
        const copy = this.convert(launch);
        return this.http.put<Launch>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Launch>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Launch[]>> {
        const options = createRequestOption(req);
        return this.http.get<Launch[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Launch[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Launch = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Launch[]>): HttpResponse<Launch[]> {
        const jsonResponse: Launch[] = res.body;
        const body: Launch[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Launch.
     */
    private convertItemFromServer(launch: Launch): Launch {
        const copy: Launch = Object.assign({}, launch);
        return copy;
    }

    /**
     * Convert a Launch to a JSON which can be sent to the server.
     */
    private convert(launch: Launch): Launch {
        const copy: Launch = Object.assign({}, launch);
        return copy;
    }
}
