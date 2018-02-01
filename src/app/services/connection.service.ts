import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Question} from "../models/question";


@Injectable()
export class ConnectionService {

  constructor(private http: HttpClient) {

  }

  getQuestions() {
    return this.http.get("./assets/data.json");
  }
}
