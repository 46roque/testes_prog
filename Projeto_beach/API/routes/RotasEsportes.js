import { BD } from '../db.js';

class RotasEsportes {
    static async novoEsporte(req, res) {
        const { nome, id_esporte } = req.body;
    
        try {
            const resultado = await BD.query(
                `INSERT INTO categorias (nome, id_esporte)
                 VALUES ($1, $2)
                 RETURNING *`, 
                [nome, id_usuario] 
            );
    
            res.status(201).send(resultado.rows[0]);
        } catch (error) {
            console.error('Erro ao criar categoria', error);
            res.status(500).json({ message: 'Erro ao criar esportes', error: error.message });
        }
    }


    static async atualizarEsportes(req, res) {
        const { id_esporte } = req.params;
        const { nome } = req.body;
    
        try {
            const resultado = await BD.query(
                `UPDATE esportes 
                 SET nome = $1 WHERE id_esporte = $2
                 RETURNING *`,
                [nome, id_esporte]
            );
    
            res.status(200).json(resultado.rows[0]);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao atualizar a esportes', error: error.message });
        }
    }

    static async listarEsportes(req, res) {
        try {
            const esportes= await BD.query('SELECT * FROM id_esporte WHERE ativo = true');
            res.status(200).json(esportes.rows);
        } catch (error) {
            res.status(500).json({ message: 'Erro ao listar as esportes', error: error.message });
        }
    }

    static async deletarEsportes(req, res) {
        const { id_esporte } = req.params;

        try {
            await BD.query('UPDATE esportes SET ativo = false WHERE id_esporte = $1', [id_esporte]);
            res.status(200).json({ message: 'esportes deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ message: 'Erro ao deletar esportes', error: error.message });
        }
    }



    static async editar(req, res) {
        const { id } = req.params;
    
        const { nome, ativo, id_esporte } = req.body;
        console.log(typeof ativo);
        try {
          //inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
          const campos = [];
          const valores = [];
    
          if (nome !== undefined) {
            campos.push(`nome=$${valores.length + 1}`);
            valores.push(nome);
          }
          
          if (ativo !== undefined) {
            campos.push(`ativo = $${valores.length + 1}`);
            valores.push(ativo);
            console.log(typeof valores[0]);
          
          }
          if (id_esporte !== undefined) {
            campos.push(`id_esporte=$${valores.length + 1}`);
            valores.push(id_esporte);
          }
         
          if (campos.length === 0) {
            return res
              .status(400)
              .json({ message: "nenhum campo fornecido para atualização" });
          }
    
          const query = `update categorias set  ${campos.join(
            ","
          )} where id_categoria = ${id} RETURNING *`;
          console.log(query);
          const categorias = await BD.query(query, valores);
          //verifica se o usuario foi atualizado
    
          if (categorias.rows.length === 0) {
            return res.status(404).json({ message: `Esportes não encontrado` });
          }
    
          return res.status(200).json(categorias.rows[0]);
        } catch (error) {
          res
            .status(500)
            .json({ message: "erro ao atualizar esportes", error: error.message });
        }
      }

      
}




export default RotasEsportes;