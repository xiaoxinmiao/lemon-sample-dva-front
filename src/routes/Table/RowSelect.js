import React from 'react';
import { connect } from 'dva';
import { translate } from "react-i18next";
import RowSelect from '../../components/Table/RowSelect';
import MainLayout from '../../components/Layout/MainLayout';


function RowSelectRoute({ location,t }) {
    return (
        <MainLayout location={location}>
            <RowSelect/>
        </MainLayout>
    )
}

export default translate('translations')(RowSelectRoute);