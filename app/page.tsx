'use client'
import { useState } from "react";
import { generateRecipes } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Loader2 } from "lucide-react"

export default function Home() {
  const [prompt, setPrompt] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [recipes, setRecipes] = useState<any[]>([]);

  async function onSubmit() {
    setIsLoading(true);
    let r = await generateRecipes(prompt);
    setRecipes(JSON.parse(r));
    setIsLoading(false);
  }

  function Loading() {
    if (isLoading && (!recipes || recipes.length === 0)) {
      return (
        <div className="flex flex-col flex-1">
          <Skeleton className="h-[125px] w-[250px] rounded-xl" />
          <div className="space-y-2 mt-2">
            <Skeleton className="h-4 w-[220px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      );
    } else {
      return "";
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-center text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:leading-[1.1] hidden md:block">Open Leftovers</h1>
      <span className="max-w-[750px] text-center text-lg text-muted-foreground my-2">Helping you to figure out how to use your left over food</span>
      <div className="flex w-full max-w-lg items-center space-x-2 my-8">
        <Input type="text" placeholder="Enter leftover ingredients here" value={prompt} onChange={e => setPrompt(e.target.value)} />
        <Button type="submit" onClick={() => onSubmit()}>Generate</Button>
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        <Loading></Loading>
        <Loading></Loading>
        <Loading></Loading>
        {!isLoading && recipes.length > 0 && recipes.map((recipe, i) => (
          <Card className="flex flex-col flex-1">
            <CardHeader>
              <CardTitle>{recipe.name}</CardTitle>
              <CardDescription>{recipe.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col flex-1">
              <div className="flex flex-col flex-1 mb-2">
                <h2 className="font-bold">Ingredients:</h2>
                <div className="bg-slate-50 border border-slate-100 shadow-sm rounded my-2">
                  <ul className="text-sm list-disc ml-4 px-4 py-2">
                    {recipe.ingredients.map((ingredient: string, i: number) => (
                      <li key={i}>{ingredient}</li>
                    ))}
                  </ul>
                </div>

                <h2 className="font-bold">Instructions:</h2>
                <ol className="list-decimal ml-4">
                  {recipe.instructions.map((instruction: string, i: number) => (
                    <li key={i}>{instruction}</li>
                  ))}
                </ol>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
