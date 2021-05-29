import React from "react";
import styled from "styled-components/macro";
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Link,
  Breadcrumbs as MuiBreadcrumbs,
  Card as MuiCard,
  CardContent as MuiCardContent,
  Divider as MuiDivider,
  Fab as MuiFab,
  Paper as MuiPaper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Typography,
} from "@material-ui/core";


import { spacing } from "@material-ui/system";

import { red, green, orange } from "@material-ui/core/colors";

import { withStyles } from "@material-ui/core/styles";

const Card = styled(MuiCard)(spacing);

const Paper = styled(MuiPaper)(spacing);

const GreenText = styled.span`
  color: ${() => green[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const RedText = styled.span`
  color: ${() => red[400]};
  font-weight: ${(props) => props.theme.typography.fontWeightMedium};
`;

const toDate = (date) => {
  date = date.slice(0, 4) + "-" + date.slice(4, 6) + "-" + date.slice(6, 8) + ",  " + date.slice(10, 15);
  return date;
}

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

const columns = [
  { id: 'Trade#', label: 'Trade#', minWidth: 170 },
  { id: 'Type', label: 'Type', minWidth: 100 },
  { id: 'Date', label: 'Date', minWidth: 170 },
  { id: 'Price', label: 'Price', minWidth: 170 },
  { id: 'Quantity', label: 'Quantity', minWidth: 170 },
  { id: 'Profit', label: 'Profit', minWidth: 170 },
];

const SimpleTableDemo = (props) => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}

            </TableRow>
          </TableHead>
          <TableBody>
            {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.tradeId}>
                  <TableCell component="th" scope="row">
                    {row.tradeId}
                  </TableCell>
                  <TableCell>
                    <TableRow>
                      {row.type1}
                    </TableRow>
                    <TableRow>
                      {row.type2}
                    </TableRow>
                  </TableCell>
                  <TableCell>
                    <TableRow>
                      {toDate(row.datetime1)}
                    </TableRow>
                    <TableRow>
                      {toDate(row.datetime2)}
                    </TableRow>
                  </TableCell>
                  <TableCell>
                    <TableRow>
                      {row.price1}
                    </TableRow>
                    <TableRow>
                      {row.price2}
                    </TableRow>
                  </TableCell>
                  <TableCell align="left">{row.quantity}</TableCell>
                  <TableCell align="left">{row.profit > 0 ? <GreenText>{row.profit}</GreenText> : <RedText>{row.profit}</RedText>}</TableCell>
                </TableRow>
              )
            }
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 6, 9, 15, 25]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

const SimpleTable = (props) => {
  if (props.data == null) {
      return (<div></div>);
  }
  return (
    <React.Fragment>
      {/* <Typography variant="h3" gutterBottom display="inline">
        Trade Table
      </Typography> */}

      {/* <Divider my={6} /> */}
      <Grid container spacing={6}>
        <Grid item xs={12}>
            <SimpleTableDemo data={props.data}/>
        </Grid>
        </Grid>
    </React.Fragment>
  );
}

export default SimpleTable;
