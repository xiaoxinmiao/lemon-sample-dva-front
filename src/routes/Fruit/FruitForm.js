import React from 'react';
import { connect } from 'dva';
import { translate } from "react-i18next";
import styles from './Fruit.less';
import FruitFormComponent from '../../components/Fruit/FruitForm';
import MainLayout from '../../components/MainLayout/MainLayout';


function FruitForm({ location,t }) {
    return (
        <MainLayout location={location}>
            <FruitFormComponent/>
        </MainLayout>
    )
}

export default translate('translations')(FruitForm);