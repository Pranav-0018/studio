'use client'

import { useState } from 'react';
import { customers, modelMetrics } from "@/lib/data"
import type { Customer } from "@/lib/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomerDataTable } from "@/components/customers/data-table"
import { columns } from "@/components/customers/columns"
import AccuracyCard from "@/components/monitoring/accuracy-card"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"
import { downloadAsCSV } from "@/lib/utils"

type RiskCategory = "All" | "Low" | "Medium" | "High";

export default function MonitoringPage() {
    const [activeTab, setActiveTab] = useState<RiskCategory>("All");

    const filteredCustomers = customers.filter(customer => {
        if (activeTab === "All") return true;
        return customer.riskCategory === activeTab;
    });

    const handleExport = () => {
        downloadAsCSV(filteredCustomers, `customers-report-${activeTab.toLowerCase()}.csv`);
    }

  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {modelMetrics.map(metric => (
                <AccuracyCard key={metric.name} metric={metric} />
            ))}
        </div>
        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as RiskCategory)}>
            <div className="flex items-center">
            <TabsList>
                <TabsTrigger value="All">All</TabsTrigger>
                <TabsTrigger value="Low">Low Risk</TabsTrigger>
                <TabsTrigger value="Medium">Medium Risk</TabsTrigger>
                <TabsTrigger value="High">High Risk</TabsTrigger>
            </TabsList>
            <div className="ml-auto flex items-center gap-2">
                <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
                <FileDown className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Export Report
                </span>
                </Button>
            </div>
            </div>
            <Card className="mt-4">
                <CardHeader>
                    <CardTitle>Customer Risk Analysis</CardTitle>
                    <CardDescription>
                    A comprehensive list of all customers with their risk profiles.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <TabsContent value={activeTab} className="mt-0">
                        <CustomerDataTable columns={columns} data={filteredCustomers} />
                    </TabsContent>
                </CardContent>
            </Card>
        </Tabs>
    </div>
  )
}
