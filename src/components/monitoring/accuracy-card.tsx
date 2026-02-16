import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { ModelMetric } from "@/lib/types"

type AccuracyCardProps = {
  metric: ModelMetric
}

export default function AccuracyCard({ metric }: AccuracyCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">{metric.name}</CardTitle>
        <CardDescription className="text-xs">{metric.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold font-headline text-primary">{metric.value}</div>
      </CardContent>
    </Card>
  )
}
