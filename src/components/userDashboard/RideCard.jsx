import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

const RideCard = () => {
  return (
    <Card>
      <CardContent  className="p-4 space-y-2">
        <p className="font-medium">Bangalore → Chennai</p>
        <p className="text-sm text-muted-foreground">Date: 25 Jan</p>
        <p className="text-sm">Seats: 2</p>
      </CardContent>
    </Card>
  )
}

export default RideCard