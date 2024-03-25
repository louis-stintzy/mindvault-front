import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';

import { Line } from 'react-chartjs-2';
import { CardsByCompartmentPerWeek } from '../../@types/stats';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function AreaChart({
  weekLabels,
  totalCardsEndOfWeek,
  cardsByCompartmentEndOfWeek,
}: {
  weekLabels: string[];
  totalCardsEndOfWeek: number[];
  cardsByCompartmentEndOfWeek: CardsByCompartmentPerWeek;
}) {
  const data = {
    labels: weekLabels,
    datasets: [
      {
        label: 'Total cards',
        data: totalCardsEndOfWeek,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Compartment 1',
        data: cardsByCompartmentEndOfWeek.compartment1,
        fill: true,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
      },
      {
        label: 'Compartment 2',
        data: cardsByCompartmentEndOfWeek.compartment2,
        fill: true,
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
      },
      {
        label: 'Compartment 3',
        data: cardsByCompartmentEndOfWeek.compartment3,
        fill: true,
        backgroundColor: 'rgba(255,206,86,0.2)',
        borderColor: 'rgba(255,206,86,1)',
      },
      {
        label: 'Compartment 4',
        data: cardsByCompartmentEndOfWeek.compartment4,
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
      },
      {
        label: 'Compartment 5',
        data: cardsByCompartmentEndOfWeek.compartment5,
        fill: true,
        backgroundColor: 'rgba(153,102,255,0.2)',
        borderColor: 'rgba(153,102,255,1)',
      },
      {
        label: 'Compartment 6',
        data: cardsByCompartmentEndOfWeek.compartment6,
        fill: true,
        backgroundColor: 'rgba(255,159,64,0.2)',
        borderColor: 'rgba(255,159,64,1)',
      },
      {
        label: 'Compartment 7',
        data: cardsByCompartmentEndOfWeek.compartment7,
        fill: true,
        backgroundColor: 'rgba(255,99,132,0.2)',
        borderColor: 'rgba(255,99,132,1)',
      },
      {
        label: 'Compartment 8',
        data: cardsByCompartmentEndOfWeek.compartment8,
        fill: true,
        backgroundColor: 'rgba(54,162,235,0.2)',
        borderColor: 'rgba(54,162,235,1)',
      },
    ],
  };

  const options = {
    plugins: {
      filler: {
        propagate: true,
      },
      legend: {
        display: true,
      },
    },
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
}

export default AreaChart;
