"use strict";

const gulp = require("gulp");
const ts = require("gulp-typescript");

function build(){
    let tsProject = ts.createProject("tsconfig.json")

    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(tsProject.config.compilerOptions["outDir"]))
}

exports.default = build;
