import { pool } from "@/db/index";

export const dynamic = "force-dynamic";

export async function GET() {
  if (pool === null) {
    return Response.json({ status: "error" }, { status: 503 });
  }

  try {
    await pool.query("SELECT 1");
    return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "error" }, { status: 503 });
  }
}
