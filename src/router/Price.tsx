import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface PriceProps {
  coinId: string;
}

function Price({ coinId }: PriceProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["price", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading Chart..."
      ) : (
        <ApexCharts
          type="line"
          series={[
            {
              name: "price high",
              data: data?.map((price) => Number(price.high)) as any,
            },
          ]}
          options={{
            chart: {
              background: "#1F225B",
              height: 500,
              width: 500,
              toolbar: {
                show: false,
              },
            },
            theme: {
              mode: "dark",
            },
            title: {
              text: "High Price Chart",
              align: "right",
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["blue"], stops: [0, 100] },
            },
            colors: ["#CA9C23"],
            xaxis: {
              categories: data?.map((price) => [
                new Date(price.time_open).getDay() + "일",
                new Date(price.time_open).getHours() + "시",
                new Date(price.time_open).getMinutes() + "분",
              ]),
            },
          }}
        />
      )}
    </div>
  );
}

export default Price;
