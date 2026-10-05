import crypto from "crypto";

export function generateInvitationToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function isTokenExpired(expires: Date): boolean {
  return new Date() > expires;
}
