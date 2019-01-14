import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ImageService {

    constructor(private httpClient: HttpClient) { }

    getImage(id: string): Observable<Blob> {
        return this.httpClient.get("http://localhost:49493/api/imagem/" + id, { responseType: 'blob' });
    }

}