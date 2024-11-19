import React, { useState } from 'react';
import { Button } from "../../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../ui/dialog";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../ui/select"

const ScheduleDrive = ({ children }) => {
    const [time, setTime] = useState("")
  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Schedule Drive</DialogTitle>
            <DialogDescription>
              Please provide the date and time for the drive below. Click "Save Schedule" to confirm.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 grid-cols-1 sm:grid-cols-2">
            {/* Date Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" placeholder="Select a date" />
            </div>
            {/* Time Field */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="time">Time</Label>
              <Select onValueChange={setTime}>
            <SelectTrigger id="time" className="w-full">
              <SelectValue placeholder="Select a time">
              {time ? time : "Select a time"}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                <SelectItem key={hour} value={`${hour.toString().padStart(2, '0')}:00`}>
                  {`${hour.toString().padStart(2, '0')}:00`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save Schedule</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ScheduleDrive;
