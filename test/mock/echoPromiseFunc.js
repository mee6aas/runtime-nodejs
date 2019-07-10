function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = (arg) => {
    return sleep(3).then(() => {
        return arg
    })
}
