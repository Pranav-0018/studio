'use client'

import Image from "next/image"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Customer } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"
import { InterventionDialog } from "@/components/dashboard/intervention-dialog"

type HighRiskTableProps = {
  customers: Customer[]
}

export function HighRiskTable({ customers }: HighRiskTableProps) {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden sm:table-cell">Risk Score</TableHead>
            <TableHead className="hidden sm:table-cell">Loan Amount</TableHead>
            <TableHead className="hidden md:table-cell">Missed Payments</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                    <Image
                        src={customer.avatar}
                        width={40}
                        height={40}
                        alt={customer.name}
                        className="rounded-full"
                        data-ai-hint="person face"
                    />
                    <div className="font-medium">{customer.name}</div>
                </div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <Badge variant="destructive">{customer.riskScore}</Badge>
              </TableCell>
              <TableCell className="hidden sm:table-cell">{formatCurrency(customer.loanAmount)}</TableCell>
              <TableCell className="hidden md:table-cell">{customer.missedPayments}</TableCell>
              <TableCell className="text-right">
                <Button size="sm" onClick={() => setSelectedCustomer(customer)}>Generate Intervention</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {selectedCustomer && (
        <InterventionDialog
            customer={selectedCustomer}
            isOpen={!!selectedCustomer}
            onClose={() => setSelectedCustomer(null)}
        />
      )}
    </>
  )
}
