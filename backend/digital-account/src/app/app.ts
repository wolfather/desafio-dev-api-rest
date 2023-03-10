import express, { Application } from 'express'

export class App {
    app: Application;

    constructor() {
        this.app = express();
    }
}