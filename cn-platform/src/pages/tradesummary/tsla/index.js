import React, {useState, useEffect} from "react";
import styled from "styled-components/macro";
import { Helmet } from "react-helmet-async";

import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import LineChart from "./LineChart";
import Table from "./Table";
import * as FirestoreService from './../../../firebase';

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const TslaTradeSummary = () => {
    const [data, setData] = useState({"equity": [], "short_equity": [], "long_equity": []});

    useEffect(() => {
        FirestoreService.getTSLASummary()
            .then(result => {
                setData(result.data())
            })
    }, [])

    return (
        <React.Fragment>
            <Helmet title="Default Dashboard" />
            <Grid justify="space-between" container spacing={6}>
                <Grid item>
                    <Typography variant="h3" gutterBottom>
                        TSLA Summary              
                    </Typography>
                </Grid>
            </Grid>

            <Divider my={6} />

            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <LineChart equity={data.equity} title={ "Net Equity" }/>
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={12} lg={6}>
                    <LineChart equity={data.short_equity} title={ "Short Equity" }/>
                </Grid>
                <Grid item xs={12} lg={6}>
                    <LineChart equity={data.long_equity} title={ "Long Equity" }/>
                </Grid>
            </Grid>
            <Grid container spacing={6}>
                <Grid item xs={12}>
                    <Table data={ data }/>
                </Grid>
            </Grid>
        </React.Fragment>
    );
}

export default TslaTradeSummary;
