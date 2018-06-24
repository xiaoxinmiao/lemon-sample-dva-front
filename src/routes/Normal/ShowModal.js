import React from 'react';
import { connect } from 'dva';
import { translate } from "react-i18next";
import ShowModal from '../../components/Normal/ShowModal';
import MainLayout from '../../components/Layout/MainLayout';


function ShowModalRoute({ location,t }) {
    return (
        <MainLayout location={location}>
            <ShowModal/>
        </MainLayout>
    )
}

export default translate('translations')(ShowModalRoute);