import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Conta } from '../models/conta';
import { NgForm } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class ContaService {

  url = 'http://localhost:8081/api/insereConta'; 
  constructor(private httpClient: HttpClient) { }
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }
  // salva um carro
  saveConta(conta: Conta): Observable<Conta> {
    return this.httpClient.post<Conta>(this.url, JSON.stringify(conta), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }
  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Erro ocorreu no lado do client
      errorMessage = error.error.message;
    } else {
      // Erro ocorreu no lado do servidor
      errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  };
}
