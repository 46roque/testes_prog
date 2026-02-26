import express from "express";
import cors from "cors";
import fs from "fs";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.json("tela principal");
});

app.get('/api/vingadores', (req, res) => {
    try {
        const date = fs.readFileSync("vingadores.json", "utf-8");
        const vingadores = JSON.parse(date);
        res.json(vingadores);
    } catch (error) {
        res.status(500).json({error: "Erro ao ler o arquivo JSON"});
    }
})

app.get('/api/vingadores/idendidade', (req, res) => {
    try {
        const date = fs.readFileSync("vingadores.json", "utf-8");
        const vingadores = JSON.parse(date);
        const idendidadeSecreta = vingadores.menbros.map(menbro => menbro.idendidadeSecreta);
        res.json({idendidadeSecreta});
    } catch (error) {
        res.status(500).json({error: "Erro ao ler o arquivo JSON"});
    }
})

//Nova rota retornando idade e poderes
app.get('/api/vingadores/idade-poderes', (req, res) => {
    try {
        const data = fs.readFileSync("vingadores.json", "utf-8");
        const vingadores = JSON.parse(data);

        const idadePoderes = vingadores.membros.map(membro => ({
            nome: membro.nome,
            idade: membro.idade,
            poder: membro.poder
        }));
        res.json({idadePoderes});
    } catch (error) {
        //Se ocorrer algum erro retorna o erro
        res.status(500).json({error: "Erro ao ler o arquivo JSON"});
    }
})


const porta = 3000;
app.listen(porta, () => {
    console.log(`Servidor rodando em http://localhost:${porta}`);
});