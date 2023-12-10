import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ charData }) => {
    return <Line data={charData} />
}

export default BarChart;