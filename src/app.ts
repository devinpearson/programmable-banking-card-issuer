import express, { Request, Response } from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { createSecureContext } from 'tls';

export const port = process.env.PORT || 3000

export const app = express()

app.use(cors())
// Configuring body parser middleware
app.use(express.urlencoded({ extended: false }))
app.use(morgan('combined'));
app.use(express.json())

const terminals = [
    {
        id: '9004',
        currency: 'zar',
        symbol: 'R'
    },
    // {
    //     id: '2',
    //     currency: 'usd',
    //     symbol: '$'
    // },
    // {
    //     id: '3',
    //     currency: 'usd',
    //     symbol: '$'
    // }
]

const cards = [
    {
        id: '1043878979806',
        partner: '1'
    },
    {
        id: '906717833598',
        partner: '2'
    },
    {
        id: '84492430001',
        partner: '3'
    },
    {
        id: '1045274045110',
        partner: '3'
    },
    {
        id: '82964458105',
        partner: '3'
    },
    {
        id: '771551472176',
        partner: '3'
    },
    {
        id: '701007080185',
        partner: '3'
    },
    {
        id: '840716134595',
        partner: '3'
    },
    {
        id: '496246335814',
        partner: '3'
    },
    {
        id: '429434153712',
        partner: '3'
    },
    {
        id: '150855690407',
        partner: '3'
    },
    {
        id: '1045274045118',
        partner: '3'
    },
]

const transactions = []
// need to store terminals in a database
// need to store cards in a database
// card should be associated to a partner for card code processing
// need a function that returns the currency the terminal will use
app.get('/terminals/:terminalId', async (req: Request, res: Response) => {
    const terminalId = req.params.terminalId
    let terminal = terminals.find(o => o.id === terminalId);
    return res.json(terminal)
})

app.post('/terminals/:terminalId/transactions', (req, res) => {
    const terminalId = req.params.terminalId
    let terminal = terminals.find(o => o.id === terminalId);

    let transaction = req.body
    let date = new Date();
    let card = cards.find(o => o.id === transaction.card)
    let result = false
    if (!card) {
        console.log('card not found')
    }
    if (card && card.partner === '1') {
        result = true
    }
    transactions.push({
        centsAmount: transaction.centsAmount,
        currency: transaction.currency,
        card: transaction.card,
        terminal: terminalId,
        result: result,
    })
    
    return res.json(
        {
            result: result,
        }
      )
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