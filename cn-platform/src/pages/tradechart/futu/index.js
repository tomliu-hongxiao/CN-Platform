import React, { useState, useEffect } from 'react';
import Chart from './chart';
import Table from './table';
import { getData } from "./utils"
import * as FirestoreService from './../../../firebase';
import styled from "styled-components/macro";
import { spacing } from "@material-ui/system";
import Loader from "../../../components/Loader";
import {
  Grid,
  Divider as MuiDivider,
  Typography as MuiTypography,
} from "@material-ui/core";

const Divider = styled(MuiDivider)(spacing);

const Typography = styled(MuiTypography)(spacing);

const ChartComponent = () => {
  const [data, setData] = useState(null);
  const [tradeList, setTradeList] = useState(null);
  const [supportLevel, setSupportLevel] = useState(null);

  useEffect(() => {
    getData().then(data => {
        setData(data)
      });
    FirestoreService.getFUTUTradeList()
      .then(result => {
        setTradeList(result.data());
      });
    FirestoreService.getFUTUShortSupportLevel()
      .then(result => {
        setSupportLevel(result.data());
      });
  }, [])

  if (data == null || tradeList == null || supportLevel == null) {
		return <Loader/>
	}
	return (
    <React.Fragment>
      <Grid justify="space-between" container spacing={6}>
        <Grid item>
          <Typography variant="h3" gutterBottom>
              FUTU Chart              
          </Typography>
        </Grid>
      </Grid>

      <Divider my={6} />

      <Chart
        type={"hybrid"}
        data={data}
        tradeslist={tradeList.trades}
        supportLevel={supportLevel}
      />
      
      <Divider my={6} />

      <Table data={tradeList.trades}/>
    </React.Fragment>
	)  
}

export default ChartComponent;
