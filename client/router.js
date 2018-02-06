/**
 * 路由
 * tzw 2017年8月21日17:33:18
 */
// 引入垫片
import 'babel-polyfill'

import React from 'react'
import { Helmet } from 'react-helmet'
import { BrowserRouter, Route, Link, Switch } from 'react-router-dom'
import { Provider, observer } from 'mobx-react'

@observer
export default class RouterBox extends React.Component {

    render() {
        return <Provider history={this.props.history}>
            <div>
                <Helmet>
                    <meta charSet='utf-8' />
                    <title>魅客云</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' />
                    <meta name='keywords' content='魅客云，魅客云定制，私人定制，个性化定制' />
                    <meta name='description' content='魅客云，Maker的音译-魅客，这里是个Maker云集的地方，每个人的工艺品都像天上的云朵，独一无二，也如同独一无二的你。' />
                    <meta name='full-screen' content='yes' />
                    <meta name='x5-fullscreen' content='true' />
                    <link rel='Shortcut Icon' href='http://oscacgbbh.bkt.clouddn.com/ico_16X16.ico' />
                    <link rel='Bookmark' href='http://oscacgbbh.bkt.clouddn.com/ico_16X16.ico' />
                </Helmet>
                <div>你好 魅客云</div>
            </div>
        </Provider>
    }
}
