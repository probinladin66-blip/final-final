import Image from "next/image";

async function getRams() {
  try {
    const res = await fetch("/api/rams", {
      cache: "no-store"
    });
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export default async function Home() {
  const rams = await getRams();

  return (
    <main style={{padding: 20}}>
      <h1 style={{fontSize: 28, fontWeight: "bold", marginBottom: 20}}>
        Hoof & Horn Collective
      </h1>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
        gap: 20
      }}>
        {rams.length === 0 && (
          <p>No rams available yet.</p>
        )}

        {rams.map((ram, i) => (
          <div key={i} style={{
            border: "1px solid #ddd",
            padding: 12,
            borderRadius: 10
          }}>
            <Image
              src={ram.image || "https://images.unsplash.com/photo-1601758228041-f3b2795255f1"}
              alt={ram.name || "Ram"}
              width={400}
              height={250}
              style={{borderRadius: 8}}
            />
            <h2 style={{marginTop: 10}}>{ram.name}</h2>
            <p>{ram.price}</p>
            <p style={{fontSize: 14}}>{ram.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
}