<<'EOF'
import { supabase } from "@/utils/supabaseClient";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Only allow the methods we support
  if (!["GET", "POST", "PUT", "DELETE"].includes(req.method ?? "")) {
    res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
    return res.status(405).end(`Method '${req.method}' Not Allowed`);
  }

  // Helper to send JSON errors consistently
  const sendError = (msg: string, status = 400) => {
    res.status(status).json({ error: msg });
  };

  // ------------------- GET -------------------
  if (req.method === "GET") {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .order("date", { ascending: false });

    if (error) return sendError(error.message);
    res.status(200).json(data);
    return;
  }

  // ------------------- POST -------------------
  if (req.method === "POST") {
    const {
      title,
      description,
      date,
      venue,
      price_general,
      price_vip,
      capacity,
      image_url,
      is_digital,
    } = req.body;

    // Basic validation (you can expand this)
    if (!title || !date || !venue || !price_general || !capacity) {
      return sendError("Missing required fields", 422);
    }

    const { data, error } = await supabase
      .from("events")
      .insert([
        {
          title,
          description,
          date,
          venue,
          price_general,
          price_vip,
          capacity,
          image_url,
          is_digital,
        }
      ])
      .select()
      .single();

    if (error) return sendError(error.message);
    res.status(201).json(data);
    return;
  }

  // ------------------- PUT -------------------
  if (req.method === "PUT") {
    const { id, ...payload } = req.body;
    if (!id) return sendError("Event ID is required for updates", 422);

    const { data, error } = await supabase
      .from("events")
      .update(payload)
      .eq("id", id)
      .select()
      .single();

    if (error) return sendError(error.message);
    res.status(200).json(data);
    return;
  }

  // ------------------- DELETE -------------------
  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return sendError("Event ID is required for deletion", 422);

    const { error } = await supabase.from("events").delete().eq("id", id);
    if (error) return sendError(error.message);
    res.status(204).send();
    return;
  }
}
EOF