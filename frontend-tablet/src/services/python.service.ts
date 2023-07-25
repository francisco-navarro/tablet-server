import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PythonService {
  startProcess() {
    const url = environment.apiUrl + 'python/start';
    return firstValueFrom(this.http.get(url));
  }
  stopProcess() {
    const url = environment.apiUrl + 'python/stop';
    return firstValueFrom(this.http.get(url));
  }
  constructor(private http: HttpClient) {}

  async getIsStarted(): Promise<boolean> {
    const url = environment.apiUrl + 'python/status';

    try {
      const response: any = await firstValueFrom(this.http.get(url));

      return !response?.killed;
    } catch (error) {
      console.error('Error al obtener los datos:', error);
      return false;
    }
  }

}
