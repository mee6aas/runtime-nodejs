"use strict";

const path = require("path");

const gulp = require("gulp");
const mocha = require('gulp-mocha');
const del = require("del");
const ts = require("gulp-typescript");

//
// util
//

function giveName(fn, name) {
    if (name) fn.displayName = name;
    return fn;
}

//
// build
//

function buildSources() {
    let tsProject = ts.createProject("tsconfig.json");

    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(tsProject.options.outDir));
}

const build = buildSources;

//
// test
//

function testSpecs() {
    process.env.TS_NODE_PROJECT = "./tsconfig.json";
    process.env.TS_NODE_IGNORE = "(.pre.js|/node_modules/)";

    return gulp.src("./test/**/*.spec.ts")
        .pipe(mocha({
            require: ['ts-node/register']
        }))
        .on("error", function () {
            this.emit("end")
        })
}

const test = testSpecs

//
// clean
//

function createDryCleaner(trg) { return () => { return del(trg, { dryRun: true }).then(trg => console.log(trg, "will be deleted")) } }
function createCleaner(trg) { return () => { return del(trg) } }

const dryCleanBuild = giveName(createDryCleaner("./build"), "dry clean build folder")
const cleanBuild = giveName(createCleaner("./build"), "clean build folder")

const dryClean = giveName(dryCleanBuild, "dryClean")
const clean = giveName(cleanBuild, "clean")

module.exports = {
    // build files in tsconfig.json.include
    build,

    // run test in ./test/**/*.spec.ts
    test,

    // show deleted files by `clean`
    dryClean,

    // delete all non-source files
    clean,
}
