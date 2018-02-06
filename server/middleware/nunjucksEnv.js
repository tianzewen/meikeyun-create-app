/*global module require */
const nunjucks = require('nunjucks')
const config = require('../../config/app.config')

function createEnv(path, opts) {
    let autoescape = opts.autoescape === undefined ? true : opts.autoescape,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(path, {
                noCache: noCache,
                watch: watch,
            }), {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            })
    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f])
        }
    }
    return env
}

module.exports = createEnv(config.TMP_ROOT, {
    watch: true,
    filters: {
        hex: function (n) {
            return `0x${n.toString(16)}`
        }
    }
})
