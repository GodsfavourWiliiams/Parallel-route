import Link from "next/link";

export default function Page() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">This is Step 3</h1>
      <p className="text-muted-foreground">You are getting closer.</p>
      <div className="flex gap-2">
        <Link href="/chat?from=%2Fstep-three" className="underline">
          Open Chat
        </Link>
        <Link href="/step-four" className="underline">
          Next →
        </Link>
      </div>
    </div>
  );
}
