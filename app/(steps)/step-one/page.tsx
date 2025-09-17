import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">This is Step 1</h1>
      <p className="text-muted-foreground">Welcome to the first step.</p>
      <div className="flex gap-2">
        <Link href={{ pathname: "/chat", query: { from: "/step-one" } }} className="underline">
          Open Chat
        </Link>
        <Link href="/step-two" className="underline">
          Next →
        </Link>
      </div>
    </div>
  );
}
