import React, {useState, useEffect} from "react";
import styled, { withTheme } from "styled-components/macro";
import {
  Card as MuiCard,
  CardContent,
  CardHeader,
  IconButton,
} from "@material-ui/core";

import { spacing } from "@material-ui/system";

import { fade } from "@material-ui/core/styles/colorManipulator";

import { Line } from "react-chartjs-2";

import { MoreVertical } from "react-feather";

const Card = styled(MuiCard)(spacing);

const ChartWrapper = styled.div`
  height: 378px;
`;

function LineChart({ theme, equity, title }) {
  
  const data = (canvas) => {
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(0, 0, 0, 300);
    gradient.addColorStop(0, fade(theme.palette.secondary.main, 0.0875));
    gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

    let axisX = []
    let axisY = []
    for (var i = 0; i < equity.length; i++) {
      axisY.push(equity[i]);
      axisX.push(i + 1);
    }

    return {
      labels: axisX,
      datasets: [
        {
          label: "Cum.G/L ($)",
          fill: true,
          backgroundColor: gradient,
          borderColor: theme.palette.secondary.main,
          data: axisY,
        },
      ],
    };
  };

  const options = {
    maintainAspectRatio: false,
    legend: {
      display: false,
    },
    tooltips: {
      intersect: false,
    },
    hover: {
      intersect: true,
    },
    plugins: {
      filler: {
        propagate: false,
      },
    },
    scales: {
      xAxes: [
        {
          reverse: true,
          gridLines: {
            color: "rgba(0,0,0,0.0)",
          },
          ticks: {
            stepSize: 20,
            fontColor: theme.palette.text.secondary,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            stepSize: 500,
            fontColor: theme.palette.text.secondary,
          },
          display: true,
          borderDash: [5, 5],
          gridLines: {
            color: "rgba(0,0,0,0.0375)",
            fontColor: "#fff",
          },
        },
      ],
    },
  };

  return (
    <Card mb={3}>
      <CardHeader
        action={
          <IconButton aria-label="settings">
            <MoreVertical />
          </IconButton>
        }
        title={title}
      />
      <CardContent>
        <ChartWrapper>
          <Line data={data} options={options} />
        </ChartWrapper>
      </CardContent>
    </Card>
  );
}
export default withTheme(LineChart);
