import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Bot } from "lucide-react";

export function BudgetPlannerSheet() {
  return (
    <Sheet>
      <SheetTrigger>
        {/* <Button
          variant="outline"
          className="gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50"
        > */}
          <Bot className="h-4 w-4" />
          Ask AI Budget Planner
        {/* </Button> */}
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-emerald-800">
            AI Budget Planner
          </SheetTitle>
          <SheetDescription>
            Tell us your budget, and we'll create a meal plan and shopping list
            for you.
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">Name</Label>
            <Input id="sheet-demo-name" defaultValue="Pedro Duarte" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Username</Label>
            <Input id="sheet-demo-username" defaultValue="@peduarte" />
          </div>
        </div>
        {/* <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
}
