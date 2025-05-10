import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import React from 'react'

const ExperienceDialog = ({ isOpen, onClose, title, years, months }) => {
  return (
    <div>
       <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <p className="text-lg">
              <span className="font-semibold">{years}</span> Years and <span className="font-semibold">{months}</span>{" "}
              Months
            </p>
            <p className="text-sm text-muted-foreground">
              {title === "Experience"
                ? "Total professional experience in the industry"
                : "Relevant work experience in current field"}
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
    </div>
  )
}

export default ExperienceDialog
