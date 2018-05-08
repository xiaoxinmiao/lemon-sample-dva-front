import React from 'react';
import { connect } from 'dva';
import { translate } from "react-i18next";
import styles from './Fruit.less';
import Fruit from '../../components/Fruit/Fruit';
import MainLayout from '../../components/MainLayout/MainLayout';


function FruitRoute({ location,t }) {
    return (
        <MainLayout location={location}>
            <Fruit/>
        </MainLayout>
    )
}

export default translate('translations')(FruitRoute);