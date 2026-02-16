'use client'

import { useEffect, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/hooks/use-toast"
import { generateInterventionAction } from "@/app/actions"
import type { Customer } from "@/lib/types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Terminal } from "lucide-react"
import { cn } from "@/lib/utils"

type InterventionDialogProps = {
  customer: Customer
  isOpen: boolean
  onClose: () => void
}

export function InterventionDialog({ customer, isOpen, onClose }: InterventionDialogProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [interventionMessage, setInterventionMessage] = useState("")
  const { toast } = useToast()

  const handleGenerateIntervention = async () => {
    setIsLoading(true)
    setInterventionMessage("")
    try {
      const result = await generateInterventionAction({
        customerId: customer.id,
        customerName: customer.name,
        riskCategory: customer.riskCategory,
        loanAmount: customer.loanAmount,
        emiAmount: customer.emiAmount,
        paymentHistory: `On-time: ${customer.paymentHistory.onTime}, Delayed: ${customer.paymentHistory.delayed}`,
        missedPayments: customer.missedPayments,
      })

      if (result.success && result.message) {
        setInterventionMessage(result.message)
      } else {
        throw new Error(result.error || "An unknown error occurred.")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Generation Failed",
        description: error instanceof Error ? error.message : "Could not generate intervention message.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  // Automatically trigger generation when dialog opens
  useEffect(() => {
    if (isOpen) {
      handleGenerateIntervention()
    }
  }, [isOpen])

  const riskBadgeClass =
    customer.riskCategory === 'High' ? 'bg-destructive/10 text-destructive border-destructive/20' :
    customer.riskCategory === 'Medium' ? 'bg-yellow-400/10 text-yellow-500 border-yellow-400/20' :
    'bg-green-400/10 text-green-600 border-green-400/20';

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>AI Intervention Recommendation</DialogTitle>
          <DialogDescription>
            Personalized message for customer{" "}
            <span className="font-semibold text-primary">{customer.name}</span>.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex justify-between items-center">
             <h4 className="text-sm font-semibold">Customer Risk Profile</h4>
             <span className={cn("px-2 py-1 text-xs font-medium rounded-full border", riskBadgeClass)}>
                {customer.riskCategory} Risk
             </span>
          </div>

          <Alert>
            <Terminal className="h-4 w-4" />
            <AlertTitle>Generated Message</AlertTitle>
            <AlertDescription className="mt-2">
              {isLoading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                interventionMessage || "No message generated."
              )}
            </AlertDescription>
          </Alert>

        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Close</Button>
          <Button onClick={handleGenerateIntervention} disabled={isLoading}>
            {isLoading ? "Regenerating..." : "Regenerate"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
