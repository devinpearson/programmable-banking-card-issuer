# Programmble banking Card Issuer Emulator

This is a simple card issuer emulator that can be used to simulate a card issuer system. The system is able to create a card, block a card, and unblock a card. The system is implemented in Typescript and uses a simple in-memory database to store the card information.

## Installation

```bash
npm install
```

## Docker
    
```bash
docker build -t card-issuer .
docker run -dp 127.0.0.1:3001:3001 card-issuer
```

## Usage

```bash
npm run dev
```
### Endpoints
- GET /terminals/:terminalId
Returns the terminal information

- POST /terminals/:terminalId/transactions
Creates a transaction for the terminal
```json
{
    "centsAmount": "5600",
    "card": "1043878979806",
    "currency": "zar"
}
```