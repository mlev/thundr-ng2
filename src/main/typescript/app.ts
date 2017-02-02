/// <reference path="../../../typings/index.d.ts" />

import * as angular from "angular";
import "angular-ui-bootstrap";
import uiRouter from "angular-ui-router";

angular.module("app", [
    "ui.bootstrap",
    uiRouter
]);

import "../static/less/styles/home.less";
import "../static/less/styles/main.less";
import "./app.config";
import "./app.routes";