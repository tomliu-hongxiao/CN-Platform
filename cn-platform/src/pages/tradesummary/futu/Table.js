import React from "react";
import styled from "styled-components/macro";

import {
  Card as MuiCard,
  CardHeader,
  IconButton,
  Chip as MuiChip,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";

import { red, green, orange } from "@material-ui/core/colors";

import { spacing } from "@material-ui/system";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const Chip = styled(MuiChip)`
  height: 20px;
  padding: 4px 0;
  font-size: 90%;
  background-color: ${(props) => props.rgbcolor};
  color: ${(props) => props.theme.palette.common.white};
`;

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const Paper = styled(MuiPaper)(spacing);

const TableWrapper = styled.div`
  overflow-y: auto;
  max-width: calc(100vw - ${(props) => props.theme.spacing(12)}px);
`;

const DashboardTable = (props) => (
  <Card mb={6}>
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <MoreVertical />
        </IconButton>
      }
      title="Latest BackTesting"
    />
    <Paper>
      <TableWrapper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>All</TableCell>
              <TableCell>Short</TableCell>
              <TableCell>Long</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key={1}>
              <TableCell component="th" scope="row">
                  Net Profit
              </TableCell>
              <TableCell>${props.data.netProfit}</TableCell>
              <TableCell>${props.data.shortProfit}</TableCell>
              <TableCell>${props.data.longProfit}</TableCell>
            </TableRow>
            <TableRow key={2}>
                <TableCell component="th" scope="row">
                  Net Profit (%)
                </TableCell>
                <TableCell>{props.data.netProfitPercentage}%</TableCell>
                <TableCell>{props.data.shortProfitPercentage}%</TableCell>
                <TableCell>{props.data.longProfitPercentage}%</TableCell>
            </TableRow>
            <TableRow key={3}>
                <TableCell component="th" scope="row">
                  Max Loss
                </TableCell>
                <TableCell><RedText>${props.data.maxLoss}</RedText></TableCell>
                <TableCell><RedText>${props.data.maxLossShort}</RedText></TableCell>
                <TableCell><RedText>${props.data.maxLossLong}</RedText></TableCell>
            </TableRow>
            </TableBody>
            <TableRow key={4}>
                <TableCell component="th" scope="row">
                  Max Gain
                </TableCell>
                <TableCell><GreenText>${props.data.maxGain}</GreenText></TableCell>
                <TableCell><GreenText>${props.data.maxGainShort}</GreenText></TableCell>
                <TableCell><GreenText>${props.data.maxGainLong}</GreenText></TableCell>
          </TableRow>
          <TableRow key={5}>
              <TableCell component="th" scope="row">
                  Trade #
                </TableCell>
                <TableCell>{props.data.totalTrades}</TableCell>
                <TableCell>{props.data.totalShortTrades}</TableCell>
                <TableCell>{props.data.totalLongTrades}</TableCell>
              </TableRow>
        </Table>
      </TableWrapper>
    </Paper>
  </Card>
);

export default DashboardTable;
