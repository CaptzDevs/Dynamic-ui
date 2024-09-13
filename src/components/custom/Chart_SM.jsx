
import {useState , useEffect , useMemo} from "react"
import { Bar,Line,LineChart, BarChart, CartesianGrid, XAxis , Cell } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";
  
  import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart";
import WordRotate from "../magicui/word-rotate";
import NumberTicker from "../magicui/number-ticker";
import { DrawerIOS } from "./DrawerIOS";
  

  
  const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

const generateRandomDate = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const randomDate = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return randomDate.toISOString().split('T')[0];
};

const generateRandomChartData = (numEntries) => {
  const data = [];
  const today = new Date();
  
  for (let i = 0; i < numEntries; i++) {
    const date = generateRandomDate(new Date(today - 1000 * 60 * 60 * 24 * 30).toISOString().split('T')[0], today.toISOString().split('T')[0]);
    data.push({
      date: date,
      desktop: getRandomInt(50, 1000),  // Random value between 50 and 500
    });
  }
  
  return data;
};


  const getBarColor = (value) => {
    if (value >= 300) return "var(--orange-700)";
    if (value >= 100) return "var(--orange-500)";
    return "var(--orange-300)";
  };
  
  const chartConfig = {
    views: {
      label: "Page Views",
    },
    desktop: {
      label: "Desktop",
      color: "hsl(var(--chart-1))",
    },
    mobile: {
      label: "Mobile",
      color: "hsl(var(--chart-2))",
    },
  };
  

  export function Chart_SM() {
    const [activeChart, setActiveChart] = useState("desktop");
    const [ chartData , setCharData ] = useState(generateRandomChartData(1))
    const [openIOS , setOpenIOS] = useState(false);

    useEffect(() => {
      const intervalId = setInterval(() => {

        setCharData(prev => [...prev , generateRandomChartData(1)[0]])

      }, 500); 
  
      return () => clearInterval(intervalId);
    }, []);
  
  
    const total = useMemo(
      () => ({
        desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      }),
      [chartData]
    );


  
    return (
      <Card className=" border-none min-w-[500px] overflow-hidden relative cursor-pointer " onClick={()=>setOpenIOS(!openIOS)} >
        <CardHeader className="flex flex-col  items-stretch space-y-0 p-0 sm:flex-row  top-0 left-0 w-full  ">
          <div className="flex flex-1 flex-col justify-center align-baseline gap-1 pt-4 pb-2 px-3">
            <CardTitle className="text-2xl" >XAU : {chartData.length}</CardTitle>
          </div>

          <DrawerIOS open={openIOS}/>

          <div className="flex ">
            {["desktop"].map((key) => {
              const chart = key;
              return (
                <button
                  key={chart}
                  className="relative z-30 flex flex-1 items-center justify-start gap-3 border-t text-left  sm:border-t-0 px-6 pt-4"
                  onClick={() => setActiveChart(chart)}
                >
                 {/*  <span className="text-md text-muted-foreground ">
                    {chartConfig[chart].label}
                  </span> */}

                  <span className="text-lg font-bold leading-none">
                    {total[key].toLocaleString()}
                  </span>
              
                </button>
              );
            })}
          </div>
        </CardHeader>

        <CardContent className="pb-6  px-2 ">
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[80px] w-full "
          >
            <BarChart
              barCategoryGap={2}
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
              
            >
            <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                hide
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  });
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    className="w-[150px]"
                    nameKey="views"
                    labelFormatter={(value) => {
                      return new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      });
                    }}
                  />
                }
              />
              <Bar dataKey={activeChart} radius={2} dot={false}   > 
              {
                       chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={getBarColor(entry[activeChart])} />
                        ))
                    }
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    );
  }
  