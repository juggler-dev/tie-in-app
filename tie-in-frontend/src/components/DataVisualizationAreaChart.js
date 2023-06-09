import { ResponsiveContainer, AreaChart, Area, CartesianGrid, XAxis, YAxis, Tooltip, Label, Legend } from "recharts";
import { requestUser } from "../api/user";

const DataVisualizationAreaChart = ({ inputData }) => {
    let data, text, total = 0;
    const styles = {
        textAlign: 'center',
    };

    if (sessionStorage.getItem("userType") === "student") {
        text = 'Business Project Trend';
    }
    else if (sessionStorage.getItem("userType") === "business") {
        text = 'Student Project Trend';
    }
    
    //get data from input and convert to array for data visualization
    data = Object.entries(inputData).map(([day, value]) => (
        {day, value}))

    //sort by date
    data.sort(function(a, b) {
        return new Date(a.day)-new Date(b.day);
    });

    //truncate year from the date
    data = data.map((index) => (
        {
            day : `${index.day.substring(5,10)}`, value: index.value
        }
        ));
    
    //get total count
    data?.map((entry, index) => {
        total = total + entry.value;
    });

    const CustomizedTick2 = ({ x, y, payload }) => {
        return <text style={{ fontSize: "12px", float: "right", textAlign: "right" }} x={x - 24} y={y - 6} textAnchor="top" dominantBaseline="hanging">
            {payload.value}
        </text>
    }

    const renderTooltip = (props) => {
        if (props && props.payload[0]) {
            return (
                <div className="tooltip" style={{
                    borderRadius: "2rem", padding: "4px", color: "#ffffff", fontSize: "12px", border: "none"
                }}>
                    <div className='tooltip-value'>Value: {props.payload[0].payload.value}</div>
                </div>
            )
        }
    }

    const args = {
        chartData: data,
        gradientColor: "rgba(221, 91, 64, 0.3)",
        areaStrokeColor: "blue",
        customizedTick: CustomizedTick2,
        tickFormatter: null,
        renderTooltip: renderTooltip,
    }

    const Dots = () => {
        return (
            <div style={{ width: "10px", height: "10px", borderRadius: "50%", border: "1px solid black" }} />
        )
    }
    return (
        <div className='project-upload-trajectory' style={styles}>
            <div className="header-text">
                <h2>{text}</h2>
                <div className="chart-header">
                    <h3>Last <span>{data.length}</span> days</h3>
                    <h3 className='trajectory-header'>Total Project Count: <span>{total}</span></h3>
                </div>
            </div>
            <ResponsiveContainer width={420} height={290}>
                <AreaChart
                    data={args.chartData}
                    margin={{ top: 10, right: 30, left: -40, bottom: 10 }}>
                    <defs>
                        <linearGradient id={"colorUv" + args.uniqueId} x1="0" y1="0" x2="0" y2="0">
                            <stop offset="100%" stopColor={args.gradientColor} />
                        </linearGradient>
                    </defs>
                    <XAxis dataKey="day" interval={1} domain ={0}
                    height={30} 
                    />
                    <YAxis
                    allowDataOverflow = "false"
                    dataKey="value"
                        width={70}
                        tick={args.customizedTick}
                        interval={0}
                         domain={[ 'dataMin', 'dataMax+1']}
                    tickFormatter={args.tickFormatter}
                    />
                    <Tooltip content={args.renderTooltip}
                    />
                    <Area dot={{ fill: args.gradientColor, fillOpacity: 1 }} type="monotone" dataKey="value" stroke={args.gradientColor} fillOpacity={0.8} fill={"url(#colorUv" + args.uniqueId + ")"} />
                </AreaChart>

            </ResponsiveContainer>
        </div >
    )
}

export default DataVisualizationAreaChart;

//Reference https://codesandbox.io/s/x73m1omx1o?file=/index.js
