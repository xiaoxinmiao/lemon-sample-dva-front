import React from 'react';
import { connect } from 'dva';
import styles from './Fruit.less';
import Fruit from '../../components/Fruit/Fruit';
import MainLayout from '../../components/Layout/MainLayout';


function FruitRouter({ location,t }) {
    return (
        <MainLayout location={location}>
            <Fruit/>
        </MainLayout>
    )
}

export default connect()(FruitRouter);