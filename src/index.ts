import { serve } from "bun";
import { createCanvas, registerFont } from "canvas";
import * as user from "./models/user";

registerFont("./fonts/Montserrat-VariableFont_wght.ttf", { family: "sans" });

serve({
  routes: {
    "/views/:uid": {
      GET: async (req) => {
        const url = new URL(req.url);
        const uid = req.params.uid;
        const w = Math.max(
          0,
          Math.min(512, number(url.searchParams.get("w")?.trim()) ?? 240)
        );
        const h = 36;
        const bg = url.searchParams.get("bg")?.trim().slice(0, 53) ?? "white";
        const color =
          url.searchParams.get("color")?.trim().slice(0, 53) ?? "black";

        const { count } = user.put(uid);
        console.info(uid, count);

        const canvas = createCanvas(w, h);
        const ctx = canvas.getContext("2d");

        const p = 8;

        ctx.strokeStyle = color;
        ctx.roundRect(p, p, w - p * 2, h - p * 2, p);
        ctx.fillStyle = bg;
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = color;
        const text = `View${count !== 1 ? "s" : ""}: ${count}`;
        ctx.font = "12px sans medium";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(text, w / 2, h / 2);

        const buffer = canvas.toBuffer("image/png");

        return status(200, buffer, {
          "content-type": "image/png",
          "cache-control": "no-store",
        });
      },
    },
    "/api/views/:uid": {
      GET: async (req) => {
        const result = user.get(req.params.uid);
        return status(200, JSON.stringify(result), {
          "content-type": "application/json",
          "cache-control": "no-store",
        });
      },
    },
  },
});

function number(x: string | undefined) {
  if (x) return Number(x);
}

function status(
  code = 200,
  body?: Bun.BodyInit,
  headers?: Record<string, string>
) {
  return new Response(body, { status: code, headers });
}
