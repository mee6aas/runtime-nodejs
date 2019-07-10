function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


module.exports = async (arg) => {
    await sleep(3)
    return arg;
}
