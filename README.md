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

# Programmable Banking Card Issuer Emulator

This is a simple card issuer emulator that simulates a card issuer system. The system can create, block, and unblock cards. It is implemented in TypeScript and uses a simple in-memory database to store card information.

## Table of Contents
- [Installation](#installation)
- [Docker](#docker)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

## Installation

### Prerequisites
- Node.js (version X.X.X)
- npm (version X.X.X)

### Steps
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

## Endpoints

- **GET /api/numbers**
  - Returns a list of numbers from 1 to 10.

- **GET /cards**
  - Returns a list of cards.

- **POST /cards**
  - Creates a new card.
  - Request body:
    ```json
    {
        "id": "unique-card-id",
        "cardId": "unique-card-id",
        "url": "http://example.com"
    }
    ```

- **GET /cards/:cardId**
  - Retrieves a specific card by ID.

- **PATCH /cards/:cardId**
  - Updates a specific card by ID.

- **DELETE /cards/:cardId**
  - Deletes a specific card by ID.

## Testing

To run the tests, use the following command:
```bash
npm test
```

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License.

## Contact

For inquiries, please contact [Your Name] at [your.email@example.com].

## Acknowledgments

- [Prisma](https://www.prisma.io/)
- [Express](https://expressjs.com/)

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
[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/devinpearson/programmable-banking-card-issuer/tree/develop)
