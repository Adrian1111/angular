import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { AuthGuard } from './../_guards/index';


@Injectable()
export class AuthenticationService {
    public token: string;
    private httpHeaders: any;
    private requestOptions: any;
    public url: string;

    constructor(private http: Http, private authGuard: AuthGuard) {
        this.httpHeaders = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
        this.requestOptions = new RequestOptions({ headers: this.httpHeaders });

        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.url = 'http://recruits.siennsoft.com/api/Jwt';
    }

     public login(username: string, password: string): Promise<any> {
      let body = new URLSearchParams();
      body.set('UserName', username);
      body.set('Password', password);
      return this.http.post(this.url, body, this.requestOptions )
        .toPromise().then((response: Response) => {
            let token =  response.json().access_token;
            if (token) {
                this.token = token;
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));
                return true;
            } else {
                return false;
            }
        })
        .catch(this.handleError);
    }

     logout(): void {
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    private handleError(error: any): any {
      return false;
    }


}
