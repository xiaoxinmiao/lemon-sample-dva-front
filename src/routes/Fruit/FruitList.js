import React from 'react';
import { connect } from 'dva';
import FruitList from '../../components/Fruit/FruitList';
import MainLayout from '../../components/Layout/MainLayout';


function FruitListRoute({ location,t }) {
    return (
        <MainLayout location={location}>
            <FruitList/>
        </MainLayout>
    )
}

export default connect()(FruitListRoute);