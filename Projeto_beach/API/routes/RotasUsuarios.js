import { BD } from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET_KEY = 'chave_secreta'; 

class RotasUsuarios {
    static async novoUsuario(req, res) {
        const { nome, email, senha, telefone, foto_perfil, data_cadastro, ativo } = req.body;
        const saltRounds = 10;
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds);

        try {

            const resultado = await BD.query(
                `INSERT INTO usuarios (nome, email, senha, telefone, foto_perfil, data_cadastro, ativo) 
                 VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
                [nome, email, senhaCriptografada, telefone, foto_perfil, data_cadastro, ativo]
            );

            res.status(201).send(resultado.rows[0]);
        } catch (error) {
            console.error('Erro ao criar usuário:', error);
            res.status(500).json({ message: 'Erro ao criar usuário', error: error.message });
        }
    }

static async atualizarUsuario(req, res) {
    const { id } = req.params;
    const { nome, email, senha, telefone, foto_perfil, data_cadastro } = req.body;

    try {
        const resultado = await BD.query(
            `UPDATE usuarios 
             SET nome = $1, email = $2, senha = $3, telefone = $4, 
             foto_perfil = $5, data_cadastro = $6 
             WHERE id_usuario = $7`,
            [nome, email, senha, telefone, foto_perfil, data_cadastro, id]
        );

        return res.status(200).json({ message: 'Usuário atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar usuário:', error);
        return res.status(500).json({ message: 'Erro ao atualizar usuário', error: error.message });
    }
}

 

    static async listarUsuario(req, res) {
        try {
            console.log('Listando usuários...');
            const usuario = await BD.query('SELECT * FROM usuarios');
            res.status(200).json(usuario.rows);
        } catch (error) { 
            res.status(500).json({ message: 'Erro ao listar os usuários', error: error.message });
        }
    }

    static async deletarUsuario(req, res) {
        const { id } = req.params;

        try {
            await BD.query('UPDATE usuarios SET ativo = false WHERE id_usuario = $1', [id]);
            res.status(200).json({ message: 'Usuário deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar usuário', error: error.message });
        }
    }

    static async login(req, res) {
        const { email, senha } = req.body;

        try {
            const resultado = await BD.query(
                `SELECT * FROM usuarios WHERE email = $1`,
                [email]
            );

            if (resultado.rows.length === 0) {
                return res.status(401).json({ message: 'Email ou senha inválidos' });
            }

            const usuarios = resultado.rows[0];
            const senhaValida = await bcrypt.compare(senha, usuarios.senha);

            if (!senhaValida) {
                return res.status(401).json({ message: 'Email ou senha inválidos' });
            }

            const token = jwt.sign(
                { id_usuario: usuarios.id_usuario, nome: usuarios.nome, email: usuarios.email },
                SECRET_KEY, { expiresIn: '1h' })

            res.status(200).json({ message: 'Login realizado com sucesso', token, nome: usuarios.nome, id_usuario: usuarios.id_usuario });
        } catch (error) {
            console.error('Erro ao realizar login:', error);
            res.status(500).json({ message: 'Erro ao realizar login', error: error.message });
        }
    }

    static async editar(req, res) {
        const { id } = req.params;

        const { nome, email, senha, telefone, foto_perfil, data_cadastro, ativo } = req.body;
        console.log(typeof ativo);
        try {
            //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
            const campos = [];
            const valores = [];

            if (nome !== undefined) {
                campos.push(`nome=$${valores.length + 1}`);
                valores.push(nome);
            }
            if (email !== undefined) {
                campos.push(`email=$${valores.length + 1}`);
                valores.push(email);
            }
            if (senha !== undefined) {
                campos.push(`senha=$${valores.length + 1}`);
                const saltRounds = 10;
                const senhaCriptografada = await bcrypt.hash(senha, saltRounds);
                valores.push(senhaCriptografada);
            }
            if (telefone !== undefined) {
                campos.push(`telefone=$${valores.length + 1}`);
                valores.push(telefone);
            }
            if (foto_perfil !== undefined) {
                campos.push(`foto_perfil=$${valores.length + 1}`);
                valores.push(foto_perfil);
            }
            if (data_cadastro !== undefined) {
                campos.push(`data_cadastro=$${valores.length + 1}`);
                valores.push(data_cadastro);
            }
            if (ativo !== undefined) {
                campos.push(`ativo = $${valores.length + 1}`);
                valores.push(ativo);
            }
            if (campos.length === 0) {
                return res
                    .status(400)
                    .json({ message: "nenhum campo fornecido para atualização" });
            }

            const query = `update usuarios set  ${campos.join(
                ","
            )} where id_usuario = ${id} RETURNING *`;
            console.log(query);
            const usuarios = await BD.query(query, valores);
            //verifica se o usuario foi atualizado

            if (usuarios.rows.length === 0) {
                return res.status(404).json({ message: `usuario não encontrado` });
            }

            return res.status(200).json(usuarios.rows[0]);
        } catch (error) {
            res
                .status(500)
                .json({ message: "erro ao atualizar usuario", error: error.message });
        }
    }


    static async filtrarUsuario(req, res) {
        const { nome } = req.query;

        try {
            const query = `SELECT * FROM usuarios 
            WHERE nome like $1 and ativo = true order by id_usuario`;  
            const valores = [`%${nome}%`];   

            const resposta = await BD.query(query, valores); 

            return res.status(200).json(resposta.rows); 
        } catch (error) {
            console.error('Erro ao filtrar usuarios', error);  
            return res.status(500).json({ message: 'Erro ao filtrar usuarios', error: error.message })
        }
    }
}


export function autenticarToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido' });
    }

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Token inválido' });

        req.usuarios = decoded; // Aqui estava o erro!
        next();
    });
}

export default RotasUsuarios;
