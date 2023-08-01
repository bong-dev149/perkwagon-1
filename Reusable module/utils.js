
const expiresInToMilliseconds = (expiresIn) => {
    const unit = expiresIn.charAt(expiresIn.length - 1);
    const duration = Number(expiresIn.substring(0, expiresIn.length - 1));

    if (unit === 's') return duration * 1000; // seconds
    if (unit === 'm') return duration * 60 * 1000; // minutes
    if (unit === 'h') return duration * 60 * 60 * 1000; // hours
    if (unit === 'd') return duration * 24 * 60 * 60 * 1000; // days

    return 0;
};

module.exports = { expiresInToMilliseconds };
