const router = require('express').Router();
const bodyParser = require('body-parser');
const crypto = require('crypto');

let gifts = [];

router.use(bodyParser.json());

router.get("/", (req, res) => {
    return res.status(200).send({ api_version: 'v1' })
});

router.post("/gift", (req, res) => {
    try {
        const { author, message, to } = req.body;
        const random = Math.random() * 256;
        const hash = crypto.createHash('sha256', random).update(random.toString()).digest('hex');

        const newGift = { id: hash, author, message, to }

        gifts.push(newGift)

        return res.status(201).send(newGift)
    } catch (e) {
        return res.status(400).send("Bad request. " + e)
    }
});

router.get("/gift/:id", (req, res) => {
    try {
        const id = req.params.id;

        const gift = gifts.find(gift => gift.id === id) || null;

        if (gift === null) return res.status(200).send("Gift não encontrado ou já destruido.");

        const newGiftArray = [...gifts.filter(gift => gift.id !== id)];

        gifts = newGiftArray;

        return res.status(200).send(gift);

    } catch (e) {
        return res.status(400).send("Bad request. " + e)
    }
})

module.exports = router;