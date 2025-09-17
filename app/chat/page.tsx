export default function ChatPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Chat (Full Page)</h1>
      <p className="text-muted-foreground">This is the fallback full-page chat. Opened when visiting /chat directly without intercept.</p>
      <a href="/step-one" className="underline">Back to Step 1</a>
    </div>
  );
}
