# Programmable Banking Card Issuer Emulator

This is a simple card issuer emulator that simulates a card issuer system. The system can create, block, and unblock cards. It is implemented in TypeScript and uses a simple in-memory database to store card information.

## Table of Contents
- [Installation](#installation)
- [DevContainer (VSCode)](#devcontainer-vscode)
- [Docker](#docker)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)
- [Deploy to DigitalOcean](#deploy-to-digitalocean)
- [Other Projects](#other-projects)

## Installation
Before installing, [download and install Node.js](https://nodejs.org/en/download/).

```bash
git clone https://github.com/devinpearson/programmable-banking-card-issuer.git
cd programmable-banking-card-issuer
```
```bash
npm install
```
## DevContainer (VSCode)
VS Code will automatically detect the `.devcontainer` folder and prompt you to open the project in a container. This will set up the environment for you to run the server in a Docker container. 
```bash
docker-compose -f .devcontainer/docker-compose.yml up
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

For inquiries, please open an issue.

## Acknowledgments

- [Prisma](https://www.prisma.io/)
- [Express](https://expressjs.com/)

## Deploy to DigitalOcean
[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/devinpearson/programmable-banking-card-issuer/tree/develop)

## Other Projects
- [Banking API Simulator](https://github.com/devinpearson/programmable-banking-sim)
- [Random banking data generator](https://github.com/devinpearson/programmable-banking-faker)
- [Open Banking Point of Sales device](https://github.com/devinpearson/programmable-banking-pos)
- [CLI app for running programmable banking card code](https://github.com/devinpearson/card-code-cli)
- [A blockly editor for card code](https://github.com/devinpearson/investec-blockly)
- [A HTTP server for using the card code emulator](https://github.com/devinpearson/investec-card-server)
- [The card code emulator package](https://github.com/devinpearson/programmable-card-code-emulator)