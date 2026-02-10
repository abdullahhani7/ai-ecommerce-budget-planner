"use client";

import React, { useActionState } from "react";
import { BudgetState, createBudgetPlan } from "../_utils/ai-budget";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import AddToCartSection from "./AddToCartSection";

const initialState: BudgetState = {
  message: "",
  success: false,
  error: {},
};
function BudgetPlanner() {
  const [state, action, isPending] = useActionState(
    createBudgetPlan,
    initialState,
  );
  return (
    <div className="space-y-8 w-full">
      <div className="w-full p-2">
        <form action={action} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="budget">Total Budget ($)</Label>
            <Input
              id="budget"
              name="budget"
              type="number"
              placeholder="e.g. 150"
              required
              min="1"
              className="border-emerald-200 focus-visible:ring-emerald-500"
            />
            {state.error?.budget && (
              <p className="text-sm text-red-500">{state.error.budget[0]}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="days">Days</Label>
              <Input
                id="days"
                name="days"
                type="number"
                placeholder="7"
                required
                min="1"
                max="30"
                className="border-emerald-200 focus-visible:ring-emerald-500"
              />
              {state.error?.days && (
                <p className="text-sm text-red-500">{state.error.days[0]}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="people">People</Label>
              <Input
                id="people"
                name="people"
                type="number"
                placeholder="2"
                required
                min="1"
                className="border-emerald-200 focus-visible:ring-emerald-500"
              />
              {state.error?.people && (
                <p className="text-sm text-red-500">{state.error.people[0]}</p>
              )}
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-all"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Plan...
              </>
            ) : (
              "Generate Meal Plan"
            )}
          </Button>

          {state.message && !state.success && (
            <p className="text-center text-sm text-red-500">{state.message}</p>
          )}

          {state.success && state.plan && (
            <div className="grid grid-cols-1  animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Meal Plan */}

              <Card className="border-emerald-100 h-fit">
                <CardHeader>
                  <CardTitle className="text-emerald-800">
                    Suggested Meals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.plan.meals.map((meal, idx) => (
                    <div
                      key={idx}
                      className="p-3 bg-emerald-50/50 rounded-lg border border-emerald-100"
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-emerald-900">
                          {meal.name}
                        </span>
                        <span className="text-xs font-mono uppercase bg-emerald-200 text-emerald-800 px-2 py-0.5 rounded">
                          {meal.mealType}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Ingredients: {meal.ingredients.join(", ")}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <AddToCartSection plan={state.plan} />
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default BudgetPlanner;
