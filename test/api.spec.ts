import request from "supertest";
import { app } from "../src/app.js";
import { expect, describe, it } from "vitest";

describe("GET /api/numbers", () => {
  it("should return a list of numbers", async () => {
    const response = await request(app).get("/api/numbers");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});

// Tests for /cards endpoint
describe("GET /cards", () => {
  it("should return a list of cards", async () => {
    const response = await request(app).get("/cards");
    expect(response.status).toBe(200);
    // Add further checks for the response body if needed
  });
});

describe("POST /cards", () => {
  it("should create a new card", async () => {
    const newCard = {
      id: "unique-card-id-2",
      cardId: "unique-card-id-2",
      url: "http://example.com",
    };
    const response = await request(app).post("/cards").send(newCard);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(newCard);
  });
});

describe("GET /cards/:cardId", () => {
  it("should retrieve a specific card by ID", async () => {
    const cardId = "123"; // Use an existing card ID for testing
    const response = await request(app).get(`/cards/${cardId}`);
    expect(response.status).toBe(200);
    // Add further checks for the response body if needed
  });
});

describe("PATCH /cards/:cardId", () => {
  it("should update a specific card by ID", async () => {
    const cardId = "123"; // Use an existing card ID for testing
    const updatedCard = { url: "http://updated-url.com" };
    const response = await request(app)
      .patch(`/cards/${cardId}`)
      .send(updatedCard);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(updatedCard);
  });
});

describe("DELETE /cards/:cardId", () => {
  it("should delete a specific card by ID", async () => {
    const cardId = "123"; // Use an existing card ID for testing
    const response = await request(app).delete(`/cards/${cardId}`);
    expect(response.status).toBe(200);
    // Optionally check that the card no longer exists
  });
});
