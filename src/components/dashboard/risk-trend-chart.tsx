'use client'

import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import type { RiskTrend } from '@/lib/types'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent
} from "@/components/ui/chart"

type RiskTrendChartProps = {
  data: RiskTrend[]
}

const chartConfig = {
  'Low Risk': {
    label: 'Low Risk',
    color: 'hsl(var(--chart-2))',
  },
  'Medium Risk': {
    label: 'Medium Risk',
    color: 'hsl(var(--chart-3))',
  },
  'High Risk': {
    label: 'High Risk',
    color: 'hsl(var(--chart-5))',
  },
}

export function RiskTrendChart({ data }: RiskTrendChartProps) {
  return (
    <ChartContainer config={chartConfig} className="h-[300px] w-full">
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -10, bottom: 0 }}>
          <CartesianGrid vertical={false} strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <YAxis
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            dataKey="High Risk"
            type="monotone"
            stroke="var(--color-High-Risk)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="Medium Risk"
            type="monotone"
            stroke="var(--color-Medium-Risk)"
            strokeWidth={2}
            dot={false}
          />
          <Line
            dataKey="Low Risk"
            type="monotone"
            stroke="var(--color-Low-Risk)"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
