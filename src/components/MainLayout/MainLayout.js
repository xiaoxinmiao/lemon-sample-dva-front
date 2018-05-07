import React, { Component } from 'react';
import { connect } from 'dva'
import Base from './Base'
function MainLayout({ children, location, t }) {

    let menu={
        selectedKey:location.pathname,
        items:[
            {
                name:"Fruit",
                key:"/",
                link:"/",
                iconType:'bars',
            }
        ]
    };
    

    return (
        <Base menu={menu}>
            {children}
        </Base>
    )
}
export default connect()(MainLayout)