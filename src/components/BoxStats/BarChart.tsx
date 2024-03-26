import { Bar } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CardsByCompartment } from '../../@types/stats';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// interface CardsByCompartment {
//   cardsByCompartment: {
//     compartment1: number;
//     compartment2: number;
//     compartment3: number;
//     compartment4: number;
//     compartment5: number;
//     compartment6: number;
//     compartment7: number;
//     compartment8: number;
//   };
// }

function BarChart({
  cardsByCompartment,
}: {
  cardsByCompartment: CardsByCompartment;
}) {
  const data = {
    labels: [
      'Compartment 1',
      'Compartment 2',
      'Compartment 3',
      'Compartment 4',
      'Compartment 5',
      'Compartment 6',
      'Compartment 7',
      'Compartment 8',
    ],
    datasets: [
      {
        label: 'Number of cards',
        data: [
          cardsByCompartment.compartment1,
          cardsByCompartment.compartment2,
          cardsByCompartment.compartment3,
          cardsByCompartment.compartment4,
          cardsByCompartment.compartment5,
          cardsByCompartment.compartment6,
          cardsByCompartment.compartment7,
          cardsByCompartment.compartment8,
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    maintainAspectRatio: false, // Permet une hauteur fixe tout en étant réactif en largeur -> responsive
    indexAxis: 'y' as const,
    scales: {
      y: {
        beginAtZero: true,
        // ticks: {
        //   autoSkip: false,
        // },
      },
    },
  };
  return <Bar data={data} options={options} />;
}

export default BarChart;
