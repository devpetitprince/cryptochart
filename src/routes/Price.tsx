import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import  ApexChart from "react-apexcharts";
import { IHistorical } from "./Chart";

interface IpriceProps {
  coinId: string,
}

function Price({coinId}: IpriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
  fetchCoinHistory(coinId),
  {
    refetchInterval: 10000,
  }
);
  return (
    <div>
      {isLoading ? (
      "Loading chart..."
    ) : (
      <ApexChart 
        type="candlestick"
        series={[
            {
              name: "Price",
              data:
                  data?.map((price) => ({
                    x: new Date(price.time_close),
                    y: [price.open, price.high, price.low, price.close]
                  })) ?? [],
            },
          ]}
        options= {{
        chart: {
          type: 'candlestick',
          height: 350
        },
        xaxis: {
          type: 'datetime'
        },
        yaxis: {
          tooltip: {
            enabled: true,
          }
        }
      }}
    />
    )}
    </div>
  )
}

export default Price;