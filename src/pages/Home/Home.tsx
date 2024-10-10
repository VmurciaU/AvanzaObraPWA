import React from 'react';
import CustomActiveShapePieChart from './components/CustomActiveShapePieChart';
// import CustomShapeBarChart from './components/CustomShapeBarChart';
// import LegendEffectOpacity from './components/LegendEffectOpacity';
// import CardinalAreaChart from './components/CardinalAreaChart';
import SimpleBarChart from './components/SimpleBarChart';
import SimpleBarChart_client from './components/SimpleBarChart_client';


const Home: React.FC = () => {
  
    return (
       <div className="container mx-auto">

        <div className="columns-2">
            <SimpleBarChart />
            <SimpleBarChart_client />
            {/* <LegendEffectOpacity /> */}
            {/* <CustomShapeBarChart /> */}
        </div>
        <div className="columns-1">
            <CustomActiveShapePieChart />
            {/* <CardinalAreaChart /> */}
        </div>
       </div>
    );
}
    

export default Home;
