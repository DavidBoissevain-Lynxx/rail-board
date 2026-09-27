"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Disruption = { id: number; location: string; asset: string; open: boolean };

export default function Home() {
  const [items, setItems] = useState<Disruption[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/disruptions").then((r) => r.json()).then(setItems);
  }, []);

  const shown = items.filter((d) =>
    d.location.toLowerCase().includes(search.toLowerCase())
  );
  const openCount = items.filter((d) => d.open).length;

  function resolve(id: number) {
    setItems(items.map((d) => (d.id === id ? { ...d, open: false } : d)));
  }

  return (
    <main className="mx-auto max-w-2xl p-8 space-y-6">
      <h1 className="text-3xl font-bold">Spoorstoringen</h1>
      <span className="inline-block rounded-full bg-violet-100 px-4 py-1 font-medium text-violet-900">
        {openCount} open storingen
      </span>
      <Input
        placeholder="Zoek station..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {shown.map((d) => (
        <Card key={d.id}>
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{d.location}</p>
              <p className="text-sm text-muted-foreground">{d.asset}</p>
            </div>
            {d.open ? (
              <Button onClick={() => resolve(d.id)}>Afmelden</Button>
            ) : (
              <Badge variant="secondary">Opgelost</Badge>
            )}
          </CardContent>
        </Card>
      ))}
    </main>
  );
}