import { describe, it, expect, beforeAll } from "vitest";
import { UnauthorizedError } from "../errors/UnauthorizedError.js";
import { getBearerToken,makeJWT, makeRefreshToken, validateJWT } from "./auth.js";


describe("JWT authentication", () => {
  let secret: string;

  beforeAll(() => {
    secret = "test-secret";
  });

  it("should create and validate a JWT", () => {
    const userID = "123";

    const token = makeJWT(userID, 3600, secret);

    const result = validateJWT(token, secret);

    expect(result).toBe(userID);
  });

  it("should reject a JWT signed with the wrong secret", () => {
    const token = makeJWT("123", 3600, secret);

    expect(() => {
      validateJWT(token, "wrong-secret");
    }).toThrow();
  });

  it("should reject an expired JWT", () => {
    const token = makeJWT("123", -1, secret);

    expect(() => {
      validateJWT(token, secret);
    }).toThrow();
  });
});



describe("makeRefreshToken", () => {
  it("should generate a 256-bit hex refresh token", () => {
    const token = makeRefreshToken();

    expect(token).toMatch(/^[a-f0-9]{64}$/);
  });
});

describe("getBearerToken", () => {
  it("should return the token from the Authorization header", () => {
    const req = {
      get: () => "Bearer abc123",
    } as any;

    expect(getBearerToken(req)).toBe("abc123");
  });

  it("should throw UnauthorizedError if the Authorization header is missing", () => {
    const req = {
      get: () => undefined,
    } as any;

    expect(() => getBearerToken(req)).toThrow(UnauthorizedError);
  });

  it("should throw UnauthorizedError if the Authorization header is malformed", () => {
    const req = {
      get: () => "Token abc123",
    } as any;

    expect(() => getBearerToken(req)).toThrow(UnauthorizedError);
  });
});