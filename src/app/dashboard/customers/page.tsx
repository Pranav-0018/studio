import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { customers } from "@/lib/data"
import { CustomerDataTable } from "@/components/customers/data-table"
import { columns } from "@/components/customers/columns"

export default function CustomersPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Management</CardTitle>
        <CardDescription>
          View, add, and manage all customer records.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <CustomerDataTable columns={columns} data={customers} />
      </CardContent>
    </Card>
  )
}
