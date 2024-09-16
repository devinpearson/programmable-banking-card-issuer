import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'
import morgan from 'morgan';
import cors from 'cors';

export const port = process.env.PORT || 3001

const prisma = new PrismaClient()

export const app = express()

app.use(cors())
// Configuring body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(morgan('combined'));
app.use(express.json())

interface Card {
    id: string;
    cardId: string;
    url: string;
}

const transactions = []
// need to store terminals in a database
// need to store cards in a database
// card should be associated to a partner for card code processing
// need a function that returns the currency the terminal will use
app.get('/cards', async (req: Request, res: Response) => {
    try {
        const cards = await prisma.card.findMany()
        return res.json(cards)
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
      }
})

app.post('/cards', async (req: Request, res: Response) => {
    try {
        let incomingCard: Card = req.body
        const card = await prisma.card.create({
            data: incomingCard,
          })
        return res.json(card)
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
      }
})

app.get('/cards/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const card = await prisma.card.findFirst({
            where: {
                id: id,
            },
        })
        if (!card) {
            console.log('no card found')
            return res.status(404).json('no card found') // no terminal was found
        }
        return res.json(card)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.patch('/cards/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const card = await prisma.card.findFirst({
            where: {
                id: id,
            },
        })
        if (!card) {
            console.log('no card found')
            return res.status(404).json('no card found') // no terminal was found
        }
        const updatedCard = await prisma.card.update({
            where: { id: id },
            data: req.body,
        })
        return res.json(updatedCard)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.delete('/cards/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const card = await prisma.card.findFirst({
            where: {
                id: id,
            },
        })
        if (!card) {
            console.log('no card found')
            return res.status(404).json('no card found') // no terminal was found
        }
        await prisma.card.delete({
            where: {
                id: id,
            },
        })
        return res.json(card)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.get('/terminals', async (req: Request, res: Response) => {
    try {
        const terminals = await prisma.terminal.findMany()
        return res.json(terminals)
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
      }
})

app.post('/terminals', async (req: Request, res: Response) => {
    try {
        const terminal = await prisma.terminal.create({
            data: req.body,
          })
        return res.json(terminal)
      } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
      }
})

app.get('/terminals/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const terminal = await prisma.terminal.findFirst({
            where: {
                id: id,
            },
        })
        if (!terminal) {
            console.log('no terminal found')
            return res.status(404).json('no terminal found') // no terminal was found
        }
        // let terminal = terminals.find(o => o.id === terminalId);
        return res.json(terminal)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.patch('/terminals/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const terminal = await prisma.terminal.findFirst({
            where: {
                id: id,
            },
        })
        if (!terminal) {
            console.log('no terminal found')
            return res.status(404).json('no terminal found') // no terminal was found
        }
            const updatedTerminal = await prisma.terminal.update({
                where: { id: id },
                data: req.body,
            })
        // let terminal = terminals.find(o => o.id === terminalId);
        return res.json(updatedTerminal)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.delete('/terminals/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id
        const terminal = await prisma.terminal.findFirst({
            where: {
                id: id,
            },
        })
        if (!terminal) {
            console.log('no terminal found')
            return res.status(404).json('no terminal found') // no terminal was found
        }
        await prisma.terminal.delete({
            where: {
                id: id,
            },
        })
        // let terminal = terminals.find(o => o.id === terminalId);
        return res.json(terminal)
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
    }
})

app.post('/terminals/:id/transactions', async (req, res) => {
    try {
        let result = false
        const id = req.params.id
        const terminal = await prisma.terminal.findFirst({
            where: {
            id: id,
            },
        })

        let transaction = req.body
        const card = await prisma.card.findFirst({
            where: {
                id: transaction.card,
            },
        })
        if (!card) {
            console.log('card not found')
        } else {
            try {
                let response = await callHost(card?.url? card.url : 'http://localhost:3000', card?.cardId? card.cardId : '700615', terminal, transaction.centsAmount)
                transactions.push({
                    centsAmount: transaction.centsAmount,
                    currency: transaction.currency,
                    card: transaction.card,
                    terminal: id,
                    result: response.data.result,
                })

                result = response.data.result
            } catch (error) {
                console.log(error)
            }
        }

        return res.json(
            {
                result: result,
            })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ error: 'Something went wrong' })
    }
  });

  // This is a placeholder the actual implementation will be done in the future This is actually the transaction that should be sent on to the card code to be processed
  app.post('/transactionz', (req, res) => {
    let transaction = req.body
    let date = new Date();
    return res.json(
        {
            accountNumber: "10000000000",
            dateTime: date.toISOString(),
            centsAmount: transaction.centsAmount,
            currencyCode: 'usd',
            type: "card",
            reference: "simulation",
            card: {
              id: transaction.card,
            },
            merchant: {
              category: {
                code: '5462', 
                key: 'bakeries', 
                name: 'Bakeries'
            },
              name: 'Bobs Burgers',
              city: 'Springfield',
              country: {
                code: 'US', 
                alpha3: 'USA', 
                name: 'United States of America (the)'
              },
            },
          }
      )
  });

  async function callHost(host: string, cardId: string, terminal: any, amount: string) {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
    "centsAmount": amount,
    "currencyCode": terminal.currencyCode,
    "merchantCode": terminal.merchantCode,
    "merchantName": terminal.merchantName,
    "merchantCity": terminal.merchantCity,
    "countryCode": terminal.countryCode
    });

    const response = await fetch(host + "/za/v1/cards/"+cardId+"/code/execute-live", {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    })
    const result = await response.json();
    // console.log(result)
    return result
}