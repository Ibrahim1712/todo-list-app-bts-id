export interface JWTPayload {
  email: string;
  iat: number;
  exp: number;
}

export const decodeJWT = (token: string): JWTPayload | null => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error decoding JWT:", error);
    return null;
  }
};

export const isTokenExpired = (token: string): boolean => {
  const payload = decodeJWT(token);
  if (!payload) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  return payload.exp < currentTime;
};

export const getEmailFromToken = (token: string): string | null => {
  const payload = decodeJWT(token);
  return payload?.email || null;
};

export const getTokenExpiration = (token: string): number | null => {
  const payload = decodeJWT(token);
  if (!payload) return null;

  return payload.exp * 1000;
};

export const willTokenExpireSoon = (
  token: string,
  minutesThreshold: number = 30
): boolean => {
  const payload = decodeJWT(token);
  if (!payload) return true;

  const currentTime = Math.floor(Date.now() / 1000);
  const timeUntilExpiry = payload.exp - currentTime;
  const thresholdSeconds = minutesThreshold * 60;

  return timeUntilExpiry <= thresholdSeconds;
};
