import express from "express"
import mongoose from "mongoose"
import dotenv from 'dotenv'

dotenv.config();

const app = express()
app.use(express.json())

const port = 3000

app.listen(port, () => {
    console.log(`rodando na porta ${port}`)
})


async function main() {
    await mongoose.connect(`mongodb+srv://admin:${process.env.DB_PASSWORD}@cluster0.v1huity.mongodb.net/`);
}

main()

const itemSchema = new mongoose.Schema({
    item: String
});

const funcionariosSchema = new mongoose.Schema({
    nome: String,
    salario: Number
});

const Item = mongoose.model('Item', itemSchema);


app.post('/lista', async (req, res)=> {
    try {
        await new Item({ item: req.body.item }).save()
        res.send(`${req.body.item} adicionado com sucesso`).status(200)
    } catch (error) {
        console.log(error)
    }
})

app.get('/lista', async (req, res)=> {
    try {
        const items = await Item.find()
        res.send(items).status(200)
    } catch (error) {
        console.log(error)
    }
})

app.delete('/lista/:id', async (req, res)=> {
   try {
    const itemEncontrado = await Item.findByIdAndDelete(req.params.id)

    res.send(`${itemEncontrado} removido com sucesso`)
   } catch (error) {
    console.log(error)
   }
})

app.get('/lista/:id', async (req, res) => {
    try {
        const itemEncontrado = await Item.findById(req.params.id)
        res.send(itemEncontrado).status(200)
    } catch (error) {
        console.log(error)
    }
})

app.put('/lista/:id', async (req, res)=> {
    try {
        const itemEncontrado = await Item.findByIdAndUpdate(req.params.id, {item: req.body.item})
        res.send(itemEncontrado).status(200)
    } catch (error) {
        console.log(error)
    }
})

app.get('/lista/busca/:nome', async (req, res)=> {
    try {
        const itemEncontrado = await Item.find({ item: { $regex: req.params.nome, $options: 'i' } })
        res.send(itemEncontrado).status(200)
    } catch (error) {
        console.log(error)
    }
})