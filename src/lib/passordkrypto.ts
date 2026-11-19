import "server-only";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

// Studentpassord lagres kryptert (AES-256-GCM), så læreren kan vise dem igjen.
// Nøkkelen ligger bare i miljøvariabelen STUDENT_PASSORD_NOKKEL (32 byte, base64).

function nokkel() {
  const b64 = process.env.STUDENT_PASSORD_NOKKEL;
  const k = b64 ? Buffer.from(b64, "base64") : null;
  if (!k || k.length !== 32) {
    throw new Error("STUDENT_PASSORD_NOKKEL mangler eller er ikke 32 byte (base64).");
  }
  return k;
}

export function krypter(tekst: string) {
  const iv = randomBytes(12);
  const c = createCipheriv("aes-256-gcm", nokkel(), iv);
  const data = Buffer.concat([c.update(tekst, "utf8"), c.final()]);
  return [iv, c.getAuthTag(), data].map((b) => b.toString("base64")).join(".");
}

export function dekrypter(lagret: string) {
  const [iv, tag, data] = lagret.split(".").map((s) => Buffer.from(s, "base64"));
  const d = createDecipheriv("aes-256-gcm", nokkel(), iv);
  d.setAuthTag(tag);
  return Buffer.concat([d.update(data), d.final()]).toString("utf8");
}
