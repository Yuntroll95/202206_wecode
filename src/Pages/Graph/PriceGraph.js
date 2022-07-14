import React, { useEffect } from 'react';
import 'zingchart/es6';
import ZingChart from 'zingchart-react';
import 'zingchart/modules-es6/zingchart-depth.min.js';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { priceGraphDataState } from '../../atoms';
import { IP } from '../../config';
import {
  EstimateCarInfo,
  setMinPriceState,
  setMaxPriceState,
} from '../../atoms';

const PriceGraph = () => {
  const [priceGraphData, setPriceGraphData] =
    useRecoilState(priceGraphDataState);
  const estimateCarInfo = useRecoilValue(EstimateCarInfo);
  const setMinPrice = useSetRecoilState(setMinPriceState);
  const setMaxPrice = useSetRecoilState(setMaxPriceState);

  useEffect(() => {
    fetch(`${IP}cars/price`, {
      headers: {
        Authorization: localStorage.getItem('access_token'),
      },
    })
      .then(res => res.json())
      .then(data => {
        setPriceGraphData(data);
        setMinPrice(data.min_result[1]);
        setMaxPrice(data.max_result[1]);
      });
  }, []);

  const myData = {
    behaviors: [
      {
        id: 'Reload', //built-in id
        enabled: 'none', //sets visibility to show
      },
      {
        id: 'SaveAsImage',
        enabled: 'none',
      },
      {
        id: 'DownloadPDF', //built-in id
        enabled: 'none', //sets visibility to show
      },
      {
        id: 'DownloadSVG',
        enabled: 'none',
      },
      {
        id: 'Print',
        enabled: 'none',
      },
      {
        id: 'ViewSource', //built-in id
        enabled: 'none', //sets visibility to hide
      },
      {
        id: 'About ZingChart', //removed with licensing
      },
    ],
    type: 'mixed',
    scaleX: {
      mirrored: false,
    },
    series: [
      {
        type: 'scatter',
        tooltip: { visible: false },
        marker: {
          'background-color': '#e8f1fc',
          'border-color': 'none',
          'background-repeat': 'no-repeat',
          shadow: false,
          size: 8,
        },
        values: priceGraphData.transaction,
      },
      {
        type: 'line',
        tooltip: { visible: false },
        aspect: 'spline',
        marker: {
          visible: false,
        },
        'line-width': 1,
        'line-style': '',
        'line-color': '#afcff7',
        values: [priceGraphData.min_result, priceGraphData.max_result],
      },
      {
        type: 'scatter',
        tooltip: { visible: false },
        marker: {
          'background-color': '#cee3ff',
          'border-color': 'none',
          'background-repeat': 'no-repeat',
          shadow: false,
          size: 35,
        },
        values: [
          [Number(estimateCarInfo.model_year), priceGraphData.estimated_price],
        ],
      },
    ],
  };

  return (
    <GraphWrapper>
      <ZingGraph height="300px" data={myData} />
    </GraphWrapper>
  );
};

export default PriceGraph;

const GraphWrapper = styled.div`
  ${({ theme }) => theme.flex.flexBox};
  width: 100%;
`;

const ZingGraph = styled(ZingChart)`
  width: 100%;
`;
