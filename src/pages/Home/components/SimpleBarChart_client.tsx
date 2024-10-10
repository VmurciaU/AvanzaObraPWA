import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

// Definir los tipos de datos
interface DataItem {
  name: string;
  natural?: number;
  juridico?: number;
}

// Datos del gráfico
const data: DataItem[] = [
  { name: 'Natural', natural: 12},
  { name: 'Jurídico', juridico: 24},
];

const SimpleBarChart_client: React.FC = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="natural" fill="#8884d8" />
        <Bar dataKey="juridico" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SimpleBarChart_client;