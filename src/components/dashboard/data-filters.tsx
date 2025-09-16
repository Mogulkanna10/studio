"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Filter } from "lucide-react";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DataFilters() {
  const [date, setDate] = React.useState<DateRange | undefined>({
    from: new Date(2024, 4, 20),
    to: new Date(),
  });

  return (
    <div className="flex flex-col sm:flex-row gap-2">
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full sm:w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y")} -{" "}
                  {format(date.to, "LLL dd, y")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Pick a date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>

      <Select defaultValue="track-1">
        <SelectTrigger className="w-full sm:w-[180px]">
          <SelectValue placeholder="Select Track" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="track-1">Track Section 1</SelectItem>
          <SelectItem value="track-2">Track Section 2</SelectItem>
          <SelectItem value="track-3">Track Section 3</SelectItem>
        </SelectContent>
      </Select>
      <Button variant="outline" size="icon">
        <Filter className="h-4 w-4" />
        <span className="sr-only">More Filters</span>
      </Button>
    </div>
  );
}
