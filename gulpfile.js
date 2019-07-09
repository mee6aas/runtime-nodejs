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

function prebuild() {
    let tsProject = ts.createProject("tsconfig.prebuild.json");

    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(
            // dest is where the source exists
            gulp.dest(file => file.base)
        );
}

function buildSources() {
    let tsProject = ts.createProject("tsconfig.json");

    return tsProject.src()
        .pipe(tsProject())
        .js.pipe(gulp.dest(tsProject.options.outDir));
}

const build = gulp.series(prebuild, buildSources);

function getPrebuilt() {
    let tsProject = ts.createProject("tsconfig.prebuild.json");
    let src = tsProject.config.include;
    let trg = src
        .map(filename => filename.replace(".ts", ".js"))

    // prevent deleting source files for safe
    trg.push("!*.ts")

    return trg;
}

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

// I don't know why worker.pre.js is not found when test,
// so just prebuild them and ignored, works fine.
// Please teache me if you know the problem. 
const test = gulp.series(prebuild, testSpecs)

const testOnly = testSpecs

//
// clean
//

function createDryCleaner(trg) { return () => { return del(trg, { dryRun: true }).then(trg => console.log(trg, "will be deleted")) } }
function createCleaner(trg) { return () => { return del(trg) } }

const dryCleanPrebuilt = giveName(createDryCleaner(getPrebuilt()), "dry clean prebuilt files")
const cleanPrebuilt = giveName(createCleaner(getPrebuilt()), "clean prebuilt files")

const cleanBuild = giveName(createCleaner("./build"), "clean build folder")

const dryClean = gulp.series(dryCleanPrebuilt);
const clean = gulp.parallel(cleanPrebuilt, cleanBuild);

module.exports = {
    // build *.pre.* in tsconfig.prebuild.json.include
    // this must be done before test or build
    prebuild,

    // build files in tsconfig.json.include
    build,

    // run test in ./test/**/*.spec.ts
    test,

    // run test in ./test/**/*.spec.ts without prebuild
    testOnly,

    // show deleted files by `cleanPrebuilt`
    dryCleanPrebuilt,

    // delete *.pre.* in tsconfig.prebuild.json.include
    cleanPrebuilt,

    // show deleted files by `clean`
    dryClean,

    // delete all non-source files
    clean,
}
