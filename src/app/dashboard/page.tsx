import { customers, riskTrends } from "@/lib/data"
import StatCard from "@/components/dashboard/stat-card"
import { RiskDistributionChart } from "@/components/dashboard/risk-distribution-chart"
import { RiskTrendChart } from "@/components/dashboard/risk-trend-chart"
import { HighRiskTable } from "@/components/dashboard/high-risk-table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, ShieldAlert, ShieldCheck, ShieldQuestion, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const totalCustomers = customers.length
  const highRiskCount = customers.filter(c => c.riskCategory === "High").length
  const mediumRiskCount = customers.filter(c => c.riskCategory === "Medium").length
  const lowRiskCount = customers.filter(c => c.riskCategory === "Low").length
  const highRiskCustomers = customers.filter(c => c.riskCategory === "High").slice(0, 5)

  const riskDistributionData = [
    { category: "Low Risk", count: lowRiskCount, fill: "var(--color-chart-2)" },
    { category: "Medium Risk", count: mediumRiskCount, fill: "var(--color-chart-3)" },
    { category: "High Risk", count: highRiskCount, fill: "var(--color-chart-5)" },
  ]

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            <StatCard
                title="Total Customers"
                value={totalCustomers.toString()}
                icon={<Users className="h-4 w-4 text-muted-foreground" />}
                description="The total number of customers in the system."
            />
            <StatCard
                title="High Risk"
                value={highRiskCount.toString()}
                icon={<ShieldAlert className="h-4 w-4 text-muted-foreground" />}
                description={`${((highRiskCount / totalCustomers) * 100).toFixed(1)}% of total customers`}
            />
            <StatCard
                title="Medium Risk"
                value={mediumRiskCount.toString()}
                icon={<ShieldQuestion className="h-4 w-4 text-muted-foreground" />}
                description={`${((mediumRiskCount / totalCustomers) * 100).toFixed(1)}% of total customers`}
            />
            <StatCard
                title="Low Risk"
                value={lowRiskCount.toString()}
                icon={<ShieldCheck className="h-4 w-4 text-muted-foreground" />}
                description={`${((lowRiskCount / totalCustomers) * 100).toFixed(1)}% of total customers`}
            />
        </div>
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <Card className="xl:col-span-2">
                <CardHeader>
                    <CardTitle>Risk Trend Over Time</CardTitle>
                    <CardDescription>Monthly trend of customers in different risk categories.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RiskTrendChart data={riskTrends} />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Risk Distribution</CardTitle>
                    <CardDescription>Distribution of customers across risk categories.</CardDescription>
                </CardHeader>
                <CardContent>
                    <RiskDistributionChart data={riskDistributionData} />
                </CardContent>
            </Card>
        </div>
        <Card>
            <CardHeader className="flex flex-row items-center">
                <div className="grid gap-2">
                    <CardTitle>High-Risk Customers</CardTitle>
                    <CardDescription>
                        Customers identified with the highest risk of delinquency.
                    </CardDescription>
                </div>
                <Button asChild size="sm" className="ml-auto gap-1">
                    <a href="/dashboard/customers">
                        View All
                        <ArrowUpRight className="h-4 w-4" />
                    </a>
                </Button>
            </CardHeader>
            <CardContent>
                <HighRiskTable customers={highRiskCustomers} />
            </CardContent>
        </Card>
    </div>
  )
}
