import DiagnosesList from "./components/DiagnosesList";

export default function MainContent() {
  return (
    <main className="min-h-screen bg-base-100 flex flex-col gap-8 pt-16">
      {/* 1. Suche */}
      <section>
        <DiagnosesList />
      </section>
    </main>
  );
}
