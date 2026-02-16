"use client"

import { ColumnDef } from "@tanstack/react-table"
import Image from "next/image"
import { MoreHorizontal, ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { Customer } from "@/lib/types"
import { formatCurrency } from "@/lib/utils"

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: "Customer",
    cell: ({ row }) => {
      const customer = row.original
      return (
        <div className="flex items-center gap-3">
            <Image
                src={customer.avatar}
                width={40}
                height={40}
                alt={customer.name}
                className="rounded-full"
                data-ai-hint="person face"
            />
            <div className="flex flex-col">
                <div className="font-medium">{customer.name}</div>
                <div className="text-sm text-muted-foreground">{customer.email}</div>
            </div>
        </div>
      )
    },
  },
  {
    accessorKey: "riskScore",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Risk
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const { riskCategory, riskScore } = row.original
      const badgeVariant = riskCategory === 'High' ? 'destructive' : riskCategory === 'Medium' ? 'secondary' : 'default'
      const badgeClass = riskCategory === 'Medium' ? 'bg-yellow-400/80 text-yellow-900' : riskCategory === 'Low' ? 'bg-green-400/80 text-green-900' : ''

      return (
        <div className="flex flex-col items-center">
            <Badge variant={badgeVariant} className={badgeClass}>{riskCategory}</Badge>
            <span className="text-xs text-muted-foreground mt-1">Score: {riskScore}</span>
        </div>
      )
    },
    sortingFn: 'basic',
  },
  {
    accessorKey: "loanAmount",
    header: ({ column }) => {
        return (
            <div className="text-right">
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                    Loan Amount
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            </div>
        )
    },
    cell: ({ row }) => <div className="text-right font-medium">{formatCurrency(row.getValue("loanAmount"))}</div>,
  },
  {
    accessorKey: "creditScore",
    header: "Credit Score",
    cell: ({ row }) => <div className="text-center">{row.getValue("creditScore")}</div>
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const customerId = row.original.id
      return (
        <div className="text-right">
            <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => navigator.clipboard.writeText(customerId)}>
                    Copy customer ID
                </DropdownMenuItem>
                <DropdownMenuItem>Edit Customer</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete Customer</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>
        </div>
      )
    },
  },
]
