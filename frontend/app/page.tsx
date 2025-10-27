import { Button } from "primereact/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">
        Welcome to the Multi-Company Template
      </h1>
      <p className="mb-8 text-center">
        This is a starter template for building multi-company applications using
        Next.js and NestJS.
      </p>
      <Button label="Check" icon="pi pi-check" />
    </div>
  );
}
