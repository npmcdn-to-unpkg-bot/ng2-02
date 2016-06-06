import {Component} from 'angular2/core';

@Component({
    selector: 'my-app',
    template: '<p>{{title}}</p>'
})
export class AppComponent {
    title: string;

    constructor() {
        this.title = 'Hello World';
    }
}