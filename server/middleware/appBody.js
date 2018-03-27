/*global module require */
import config from '../../config/app.config.js'
import stores from '../../client/preset'
import React from 'react'
import ReactDom from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import App from '../../client/router'

module.exports = (url, debug = false) => {
    let context = {}
    const render = debug ? ReactDom.renderToStaticNodeStream : ReactDom.renderToNodeStream
    const body_stream = render(
        <StaticRouter context={context} location={url}>
            <App stores={stores} />
        </StaticRouter>
    )
    return {
        stores: JSON.stringify(stores),
        body: body_stream.read()
    }
}
