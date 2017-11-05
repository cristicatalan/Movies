import { inject, NewInstance } from "aurelia-framework";
import { MovieData } from "./movieData";
import { Router } from "aurelia-router";
import { ValidationRules, ValidationController } from "aurelia-validation";
import { BootstrapFormRenderer } from 'bootstrap-form-renderer';

@inject(MovieData, Router, NewInstance.of(ValidationController))
export class Edit {
    constructor(movieData, router, controller) {
        this.data = movieData;
        this.router = router;
        this.controller = controller;

        this.controller.addRenderer(new BootstrapFormRenderer());

        ValidationRules.customRule(
            'integerRange',
            (value, obj, min, max) => value === null || value === undefined
                || Number.isInteger(value) && value >= min && value <= max,
            `\${$displayName} must be an integer between \${$config.min} and \${$config.max}.`,
            (min, max) => ({ min, max })
        );
    }

    activate(params) {
        return this.data.getById(params.id)
            .then(movie => {
                this.movie = movie;

                ValidationRules
                    .ensure("title")
                    .required()
                    .minLength(3)
                    .maxLength(100)
                    .ensure('releaseYear')
                    .satisfiesRule('integerRange', 1900, 2100)
                    .on(this.movie);
            });
    }

    attached() {
        this.controller.validate();
    }

    save() {
        this.controller
            .validate()
            .then(result => {
                if (result.valid) {
                    this.data.save(this.movie)
                        .then(movie => {
                            let url = this.router.generate("details", { id: movie.id });
                            this.router.navigate(url);
                        });
                }
            });
    }
}