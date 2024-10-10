import React from 'react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar } from 'recharts';

// Definir los tipos de datos
interface DataItem {
  name: string;
  Arquitecto?: number;
  Super_user?: number;
  Obrero?: number;
  Administrador?: number;
}

// Datos del gráfico
const data: DataItem[] = [
  { name: 'Natural', Arquitecto: 3},
  { name: 'Jurídico', Super_user: 2},
  { name: 'Obrero', Obrero: 10},
  { name: 'Administrador', Administrador: 5},
];

const CustomSimpleBarChart: React.FC = () => {
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
        <Bar dataKey="Arquitecto" fill="#8884d8" />
        <Bar dataKey="Super_user" fill="#82ca9d" />
        <Bar dataKey="Obrero" fill="#f69984" />
        <Bar dataKey="Administrador" fill="#84c8f6" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomSimpleBarChart;