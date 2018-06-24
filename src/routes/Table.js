import React from 'react';
import { connect } from 'dva';
import { translate } from "react-i18next";
import Table from '../components/Table/Table';
import MainLayout from '../components/Layout/MainLayout';


function TableRoute({ location,t }) {
    return (
        <MainLayout location={location}>
            <Table/>
        </MainLayout>
    )
}

export default translate('translations')(TableRoute);