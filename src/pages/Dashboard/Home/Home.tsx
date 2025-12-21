import React from "react";
import MainLayout from "../../../constant/MainLayout";
import Calender from "../../../component/Calender";
import CycleHighlight from "./component/CircleHighlight";

const Home: React.FC = () => {
  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-5">
        <Calender />
        <CycleHighlight />
      </div>
    </MainLayout>
  );
};

export default Home;
