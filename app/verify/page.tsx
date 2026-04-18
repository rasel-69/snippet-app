import Link from "next/link";

export default async function VerifyPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string; action?: string }>;
}) {
  const { token, action } = await searchParams;

  if (!token || !action) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Invalid link</h1>
        <p>Missing token or action.</p>
        <Link className="underline" href="/signup">Go to Signup</Link>
      </div>
    );
  }

  // call our API route
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/verify?token=${encodeURIComponent(
      token
    )}&action=${encodeURIComponent(action)}`,
    { cache: "no-store" }
  );

  const data = await res.json();

  if (!res.ok) {
    return (
      <div className="p-6">
        <h1 className="text-xl font-semibold">Verification failed</h1>
        <p>{data?.error || "Something went wrong"}</p>
        <Link className="underline" href="/signup">Go to Signup</Link>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold">{data.message}</h1>

      {action === "confirm" ? (
        <Link className="underline" href="/login">Go to Login</Link>
      ) : (
        <Link className="underline" href="/signup">Go to Signup</Link>
      )}
    </div>
  );
}