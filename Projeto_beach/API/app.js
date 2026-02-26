import { testarConexao } from './db.js'; // se db.js estiver no mesmo diretório
import RotasUsuarios, {autenticarToken} from '../API/routes/RotasUsuarios.js';
import RotasEventos from '../API/routes/RotasEventos.js'
import RotasEsportes from './routes/RotasEsportes.js';
import express from "express"
import cors from 'cors';

// import swaggerUi from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

const app = express();
testarConexao(); 

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

 app.get('/', (req, res) => {
   res.redirect('/api-docs');
})

// Rotas de Usuários
app.post('/usuarios', RotasUsuarios.novoUsuario);
app.get('/usuarios', autenticarToken,  RotasUsuarios.listarUsuario);
app.put('/usuarios/:id', autenticarToken,  RotasUsuarios.atualizarUsuario);
app.delete('/usuarios/:id', autenticarToken,  RotasUsuarios.deletarUsuario);
app.post('/usuarios/login', RotasUsuarios.login);
app.patch('/usuarios/:id', autenticarToken, RotasUsuarios.editar);
app.get('/usuarios/filtrarUsuario/:nome', RotasUsuarios.filtrarUsuario);

//Rotas Eventos
 app.post('/eventos', RotasEventos.cadastrar); 
 app.get('/eventos', RotasEventos.listarTodos);
 app.get('/eventos/:id', RotasEventos.buscarPorId)

// Rotas de Esportes
app.post('/esportes', RotasEsportes.novoEsporte);
app.get('/esportes', RotasEsportes.listarEsportes);
app.put('/esportes/:id', RotasEsportes.atualizarEsportes);
app.delete('/esportes/:id', RotasEsportes.deletarEsportes);
app.patch('/esportes/:id', RotasEsportes.editar);


// Inicia o servidor
const porta = 3000;
app.listen(porta, () => {
    console.log(`API rodando em: http://localhost:${porta}`);
});