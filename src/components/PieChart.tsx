import EChartsReact from "echarts-for-react";

type PieChartProps = {
    title: string;
    data: {
        name: string;
        value: number;
    }[];
};

const PieChart = (props: PieChartProps) => {
    const option = {
        tooltip: {
            trigger: "item"
        },
        legend: {
            top: "2.5%",
            left: "center"
        },
        series: [
            {
                name: "Access From",
                type: "pie",
                radius: ["40%", "70%"],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: "#fff",
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: "center"
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 20,
                        fontWeight: "normal"
                    }
                },
                labelLine: {
                    show: false
                },
                data: props.data
            }
        ]
    };

    return (
        <div className="">
            <p className="text-center">{props.title}</p>
            <div className="flex justify-center">
                <EChartsReact className="w-[500px] h-[500px]" option={option} />
            </div>
        </div>
    );
}

export default PieChart;
