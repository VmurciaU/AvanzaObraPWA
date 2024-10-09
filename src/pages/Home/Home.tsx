import React from 'react';
import CustomActiveShapePieChart from './components/CustomActiveShapePieChart';
import CustomShapeBarChart from './components/CustomShapeBarChart';
import LegendEffectOpacity from './components/LegendEffectOpacity';
import CardinalAreaChart from './components/CardinalAreaChart';


const Home: React.FC = () => {
  
    return (
       <div className="container mx-auto">

        <div className="columns-2">
            <LegendEffectOpacity />
            <CustomShapeBarChart />
        </div>
        <div className="columns-2">
            <CustomActiveShapePieChart />
            <CardinalAreaChart />
        </div>
       </div>
    );
}
    

export default Home;
