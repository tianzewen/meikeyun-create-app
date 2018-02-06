/**
 * 前端入口
 * tzw 2017年8月21日17:33:18
 */

import React from 'react'
import { render, hydrate } from 'react-dom'
import { observer, Provider, inject } from 'mobx-react'
import { BrowserRouter as Router, StaticRouter, Route, Link, Switch } from 'react-router-dom'

import RouterBox from './router.js'

hydrate(
    <Router>
        <Route component={RouterBox}/>
    </Router>,
    document.getElementById('wrap')
)
