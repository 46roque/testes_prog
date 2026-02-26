import { BD } from "../db.js";

class RotasEventos {
  // Buscar todos os eventos
  static async listarTodos(req, res) {
    try {
      const resultado = await BD.query(
        `SELECT id_evento, nome, descricao, data_inscricao, tipo, status FROM eventos`
      );
      res.status(200).json(resultado.rows);
    } catch (error) {
      console.error("Erro ao listar eventos:", error);
      res.status(500).json({ message: "Erro ao listar eventos.", error: error.message });
    }
  }

  // Buscar evento por ID
  static async buscarPorId(req, res) {
    const { id } = req.params;

    try {
      const resultado = await BD.query(
        `SELECT id_evento, nome, descricao, data_inscricao, tipo, status FROM eventos WHERE id_evento = $1`,
        [id]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({ message: "Evento não encontrado." });
      }

      res.status(200).json(resultado.rows[0]);
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
      res.status(500).json({ message: "Erro ao buscar evento.", error: error.message });
    }
  }

  // Cadastrar novo evento (POST)
  static async cadastrar(req, res) {
    const { nome, descricao, data_inscricao, tipo, status } = req.body;

    try {
      const resultado = await BD.query(
        `INSERT INTO eventos (nome, descricao, data_inscricao, tipo, status) 
         VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [nome, descricao, data_inscricao, tipo, status  ]
      );
      res.status(201).json(resultado.rows[0]);
    } catch (error) {
      console.error("Erro ao cadastrar evento:", error);
      res.status(500).json({ message: "Erro ao cadastrar evento.", error: error.message });
    }
  }

  // Atualizar parcialmente (PATCH)
  static async atualizar(req, res) {
    const { id } = req.params;
    const campos = [];
    const valores = [];
    let i = 1;
    const { nome, descricao, data_inscricao, tipo, status, link_pagamento } = req.body;

    if (nome !== undefined) {
      campos.push(`nome = $${i++}`);
      valores.push(nome);
    }
    if (descricao !== undefined) {
      campos.push(`descricao = $${i++}`);
      valores.push(descricao);
    }
    if (data_inscricao !== undefined) {
      campos.push(`data_inscricao = $${i++}`);
      valores.push(data_inscricao);
    }
    if (tipo !== undefined) {
      campos.push(`tipo = $${i++}`);
      valores.push(tipo);
    }
    if (status !== undefined) {
      campos.push(`status = $${i++}`);
      valores.push(status);
    }
    if (link_pagamento !== undefined) {
      campos.push(`link_pagamento = $${i++}`);
      valores.push(link_pagamento);
    }

    if (campos.length === 0) {
      return res.status(400).json({ message: "Nenhum campo para atualizar." });
    }

    valores.push(id);
    const query = `UPDATE eventos SET ${campos.join(", ")} WHERE id_evento = $${i} RETURNING *`;

    try {
      const resultado = await BD.query(query, valores);

      if (resultado.rows.length === 0) {
        return res.status(404).json({ message: "Evento não encontrado." });
      }

      res.status(200).json(resultado.rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      res.status(500).json({ message: "Erro ao atualizar evento.", error: error.message });
    }
  }

  // Atualizar todos os campos (PUT)
  static async atualizarTodosCampos(req, res) {
    const { id } = req.params;
    const { nome, descricao, data_inscricao, tipo, status, link_pagamento } = req.body;

    try {
      const resultado = await BD.query(
        `UPDATE eventos SET nome = $1, descricao = $2, data_inscricao = $3, tipo = $4, status = $5, link_pagamento = $6 WHERE id_evento = $7 RETURNING *`,
        [nome, descricao, data_inscricao, tipo, status, link_pagamento, id]
      );

      if (resultado.rows.length === 0) {
        return res.status(404).json({ message: "Evento não encontrado." });
      }

      res.status(200).json(resultado.rows[0]);
    } catch (error) {
      console.error("Erro ao atualizar evento:", error);
      res.status(500).json({ message: "Erro ao atualizar evento.", error: error.message });
    }
  }

  // Deletar evento
  static async deletar(req, res) {
    const { id } = req.params;

    try {
      const resultado = await BD.query(`DELETE FROM eventos WHERE id_evento = $1`, [id]);

      if (resultado.rowCount === 0) {
        return res.status(404).json({ message: "Evento não encontrado." });
      }

      res.status(200).json({ message: "Evento deletado com sucesso." });
    } catch (error) {
      console.error("Erro ao deletar evento:", error);
      res.status(500).json({ message: "Erro ao deletar evento.", error: error.message });
    }
  }
}

export default RotasEventos;