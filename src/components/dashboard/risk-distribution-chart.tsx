'use client'

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend, Cell } from 'recharts'
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart"

type RiskDistributionChartProps = {
  data: {
    category: string
    count: number
    fill: string
  }[]
}

export function RiskDistributionChart({ data }: RiskDistributionChartProps) {
  const chartConfig = {
    count: {
      label: 'Customers',
    },
    'Low Risk': {
      label: 'Low Risk',
    },
    'Medium Risk': {
      label: 'Medium Risk',
    },
    'High Risk': {
      label: 'High Risk',
    },
  }

  return (
    <ChartContainer config={chartConfig} className="mx-auto aspect-square h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Tooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
          <Pie
            data={data}
            dataKey="count"
            nameKey="category"
            innerRadius={60}
            strokeWidth={5}
          >
            {data.map((entry) => (
              <Cell key={`cell-${entry.category}`} fill={entry.fill} />
            ))}
          </Pie>
          <Legend
            content={({ payload }) => {
              return (
                <ul className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-4 text-sm">
                  {payload?.map((entry) => (
                    <li key={`item-${entry.value}`} className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: entry.color }} />
                      <span>{entry.value}</span>
                    </li>
                  ))}
                </ul>
              )
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
