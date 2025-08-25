import { AIChat } from "@/components/AIChat";

export function AI() {
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-gradient-primary p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">TRENDFY</h1>
          <h2 className="text-xl font-semibold">AI</h2>
        </div>
        <p className="text-white/90">Converse com a nossa AI</p>
      </div>

      <AIChat />
    </div>
  );
}