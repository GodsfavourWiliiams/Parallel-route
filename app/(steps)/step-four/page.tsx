import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">This is Step 4</h1>
      <p className="text-muted-foreground">Final step reached.</p>
      <div className="flex gap-2">
        <Link href={{ pathname: "/chat", query: { from: "/step-four" } }} className="underline">
          Open Chat
        </Link>
        <Link href="/step-one" className="underline">
          Back to Step 1
        </Link>
      </div>
    </div>
  );
}
