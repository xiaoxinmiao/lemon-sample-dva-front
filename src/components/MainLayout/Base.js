import React, { Component } from 'react';
import { Layout, Menu, Dropdown, Badge, Avatar, Icon, Breadcrumb } from 'antd';
import { Link } from 'dva/router';
import { translate } from 'react-i18next';
import styles from './Base.less';
import { connect } from 'dva'
const { Header, Content, Footer, Sider } = Layout;
const { Item } = Menu

function Base(props) {
    const { i18n, t } = props;
    const changeLanguage = (e) => {
        i18n.changeLanguage(e.key);
    };
    const language = (
        <Menu onClick={changeLanguage}>
            <Item key="zh-CN">
                <a>中文</a>
            </Item>
            <Item key="en">
                <a>English</a>
            </Item>
            <Item key="ko">
                <a>한국어</a>
            </Item>
        </Menu>
    );

    return (
        <Layout className={styles['page_height']}>
            <Sider width={188}>
                <div className={styles['logoStyle']}>
                    sample
                </div>
                <Menu theme="dark" defaultSelectedKeys={[props.menu.selectedKey]}>
                    {props.menu.items.map(function (item, idx) {
                        return <Menu.Item key={item.key} >
                            <Link to={item.link}>
                                <Icon type={item.iconType} />
                                <span>{item.name}</span>
                            </Link>
                        </Menu.Item>
                    }, this)}
                </Menu>
            </Sider>
            <Layout>
                <Header className={styles['user-information-domain']}>
                    <div className={styles.box1}>
                        <span className={styles['user-profile']}>
                            <Badge><Avatar shape="circle" icon="user" /></Badge>
                        </span>
                        <span className={styles['user-name']}>
                            <a className={styles['ant-dropdown-link']}>
                                xiaomiao
                                </a>
                        </span>
                        <span className={styles['user-login']}>
                            <a>
                                <Icon type="user" /> {t('logOut')}
                            </a>
                        </span>
                        <span>
                            <Dropdown overlay={language} trigger={['click']}>
                                <a className={styles['ant-dropdown-link']}>
                                    {t('language')}<Icon type="down" />
                                </a>
                            </Dropdown>
                        </span>
                    </div>
                </Header>
                <Content className={styles['container-wrapper']}>
                    <Breadcrumb className={styles['current-info']}>
                        <Breadcrumb.Item></Breadcrumb.Item>
                    </Breadcrumb>
                    <div className={styles['contents-wrapper']}>
                        {props.children}
                    </div>
                </Content>
                <Footer className={styles['footer-align']}>
                    <p>sample ©2018 Created by eland</p>
                </Footer>
            </Layout>
        </Layout>
    );
}

export default translate('translations')(Base) 
