import React, { Component } from 'react';
import { connect } from 'dva'
import Base from './Base'
function MainLayout({ children, location, t }) {

    let menu={
        selectedKey:location.pathname,
        items:[
            {
                name:"FruitList",
                key:"/fruitList",
                link:"/fruitList",
                iconType:'bars',
            },
            {
                name:"Table rowMerge",
                key:"/table",
                link:"/table",
                iconType:'bars',
            },
            {
                name:"RowSelect",
                key:"/rowSelect",
                link:"/rowSelect",
                iconType:'bars',
            },
            {
                name:"ShowModal",
                key:"/showModal",
                link:"/showModal",
                iconType:'bars',
            },
        ]
    };
    

    return (
        <Base menu={menu}>
            {children}
        </Base>
    )
}
export default connect()(MainLayout)