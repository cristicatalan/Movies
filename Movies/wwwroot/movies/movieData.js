import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-http-client";

let baseUrl = "/api/movies";

@inject(HttpClient)
export class MovieData {
    constructor(httpClient) {
        this.http = httpClient;
    }

    getAll() {
        return this.http.get(baseUrl)
            .then(response => response.content);
    }

    getById(id) {
        return this.http.get(`${baseUrl}/${id}`)
            .then(response => response.content);
    }

    save(movie) {
        var request = this.http.createRequest();
        request.asPut()
            .withUrl(baseUrl)
            .withHeader("Accept", "application/json")
            .withHeader("Content-Type", "application/json")
            .withContent(movie);

        return request.send().then(response => response.content);
    }
}