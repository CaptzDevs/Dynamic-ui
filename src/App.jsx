import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { Chart_SM } from "./components/custom/Chart_SM";
import { DrawerIOS } from "./components/custom/DrawerIOS";
import { ThemeProvider , useTheme } from "./components/custom/ThemeProvider";

function App() {
  const { theme, setTheme } = useTheme();

  useEffect(()=>{
    setTheme('dark')
  },[])
  return <main className="gap-3 ">

  <Chart_SM/>
  </main>;
}

export default App;



