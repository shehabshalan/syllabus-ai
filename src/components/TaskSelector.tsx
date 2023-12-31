"use client";

import * as React from "react";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { PopoverProps } from "@radix-ui/react-popover";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Task } from "../../global";

interface TaskSelectorProps extends PopoverProps {
  tasks: Task[];
  setSelectedTask: (task: Task) => void;
  selectedTask: Task;
}

export function TaskSelector({
  tasks,
  setSelectedTask,
  selectedTask,
  ...props
}: TaskSelectorProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen} {...props}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-label="Choose task here"
          aria-expanded={open}
          className="flex-1 justify-between md:max-w-[200px] lg:max-w-[300px]"
        >
          {selectedTask ? selectedTask.name : "Choose a task like Quiz"}
          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search tasks..." />
          <CommandEmpty>No task found.</CommandEmpty>
          <CommandGroup heading="Examples">
            {tasks.map((task) => (
              <CommandItem
                key={task.slug}
                onSelect={() => {
                  setSelectedTask(task);
                  setOpen(false);
                }}
              >
                {task.name}
                <CheckIcon
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedTask?.slug === task.slug
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
