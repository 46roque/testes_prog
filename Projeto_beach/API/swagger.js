import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
  openapi: "3.0.4",
  info: {
    title: "API do Gestor Financeiro Pessoal",
    version: "1.0.0",
    description:
      "API para gerenciamento financeiro pessoal desenvolvida no curso Técnico de Desenvolvimento de Sistemas do SENAI",
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Servidor Local",
    },
    {
      url: "http://192.168.0.237:200",
      description: "Servidor da API do Douglas",
    },
  ],
  tags: [
    {
      name: "Usuarios",
      description: "Rotas para cadastro, login, atualização e desativação de usuários",
    },
    {
      name: "Eventos",
      description: "Operações relacionadas a eventos",
    },
    {
      name: "Esportes", // Nova tag para Esportes
      description: "Operações relacionadas a esportes",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    schemas: {
      // --- Schemas de Usuários ---
      Usuario: {
        type: "object",
        properties: {
          id_usuario: {
            type: "integer",
            description: "ID único do usuário.",
            example: 1,
          },
          nome: {
            type: "string",
            description: "Nome completo do usuário.",
            example: "João Silva",
          },
          email: {
            type: "string",
            format: "email",
            description: "Endereço de e-mail do usuário (único).",
            example: "joao.silva@example.com",
          },
          telefone: {
            type: "string",
            nullable: true,
            description: "Número de telefone do usuário.",
            example: "5511987654321",
          },
          foto_perfil: {
            type: "string",
            nullable: true,
            description: "URL da foto de perfil do usuário.",
            example: "http://example.com/fotos/joao.jpg",
          },
          data_cadastro: {
            type: "string",
            format: "date-time",
            description: "Data e hora do cadastro do usuário.",
            example: "2024-01-01T10:00:00Z",
          },
          ativo: {
            type: "boolean",
            description: "Status do usuário (true para ativo, false para inativo).",
            example: true,
          },
          tipo_acesso: {
            type: "string",
            description: "Tipo de acesso do usuário (ex: 'admin', 'user').",
            example: "user",
          },
        },
      },
      NovoUsuarioBody: {
        type: "object",
        required: ["nome", "email", "senha"],
        properties: {
          nome: {
            type: "string",
            description: "Nome completo do novo usuário.",
            example: "Maria Oliveira",
          },
          email: {
            type: "string",
            format: "email",
            description: "Endereço de e-mail do novo usuário (único).",
            example: "maria.olivera@example.com",
          },
          senha: {
            type: "string",
            description: "Senha do novo usuário.",
            example: "senhaSegura123",
          },
          telefone: {
            type: "string",
            nullable: true,
            description: "Número de telefone do novo usuário.",
            example: "5511998765432",
          },
          foto_perfil: {
            type: "string",
            nullable: true,
            description: "URL da foto de perfil do novo usuário.",
            example: "http://example.com/fotos/maria.jpg",
          },
          data_cadastro: {
            type: "string",
            format: "date-time",
            nullable: true,
            description: "Data e hora do cadastro do usuário. Se não fornecido, o backend pode gerar automaticamente.",
            example: "2024-06-13T15:30:00Z",
          },
        },
      },
      AtualizacaoUsuarioBody: {
        type: "object",
        required: ["nome", "email", "senha", "telefone", "foto_perfil", "data_cadastro"],
        properties: {
          nome: { type: "string", example: "João Silva Atualizado" },
          email: { type: "string", example: "joao.atualizado@example.com" },
          senha: { type: "string", example: "nova_senha_segura" },
          telefone: { type: "string", example: "5511912345678" },
          foto_perfil: { type: "string", example: "http://example.com/fotos/joao_novo.jpg" },
          data_cadastro: { type: "string", format: "date-time", example: "2024-01-01T10:00:00Z" },
        },
      },
      AtualizacaoParcialUsuarioBody: {
        type: "object",
        properties: {
          nome: { type: "string", example: "João Silva Jr." },
          email: { type: "string", format: "email", example: "joao.junior@example.com" },
          senha: { type: "string", description: "Nova senha (será criptografada).", example: "senhaUltraSecreta" },
          telefone: { type: "string", example: "5511999998888" },
          foto_perfil: { type: "string", nullable: true, example: "http://example.com/fotos/joao_junior.jpg" },
          data_cadastro: { type: "string", format: "date-time", example: "2024-01-01T10:00:00Z" },
          ativo: { type: "boolean", example: false },
        },
        minProperties: 1,
      },
      LoginBody: {
        type: "object",
        required: ["email", "senha"],
        properties: {
          email: { type: "string", format: "email", example: "sesia@sesi.br" },
          senha: { type: "string", example: "123" },
        },
      },
      LoginResponse: {
        type: "object",
        properties: {
          message: { type: "string", example: "Login realizado com sucesso" },
          token: { type: "string", description: "Token JWT para autenticação.", example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." },
          id_usuario: { type: "integer", example: 1 },
          nome: { type: "string", example: "João Silva" },
          email: { type: "string", example: "joao@example.com" },
          tipo_acesso: { type: "string", example: "adm" },
        },
      },

      // --- Schemas de Eventos ---
      Evento: {
        type: "object",
        properties: {
          id_evento: {
            type: "integer",
            description: "ID único do evento.",
            example: 1,
          },
          nome: {
            type: "string",
            description: "Nome do evento.",
            example: "Workshop de Node.js",
          },
          descricao: {
            type: "string",
            description: "Descrição detalhada do evento.",
            example: "Um workshop intensivo sobre desenvolvimento backend com Node.js.",
          },
          data_inscricao: {
            type: "string",
            format: "date",
            description: "Data limite para inscrição no evento.",
            example: "2025-12-31",
          },
          tipo: {
            type: "string",
            description: "Tipo de evento (ex. 'online', 'presencial', 'gratuito', 'pago').",
            example: "online",
          },
          status: {
            type: "string",
            description: "Status atual do evento (ex. 'aberto', 'fechado', 'cancelado').",
            example: "aberto",
          },
          link_pagamento: {
            type: "string",
            nullable: true,
            description: "Link para a página de pagamento do evento, se aplicável.",
            example: "https://pagamento.exemplo.com/evento1",
          },
        },
      },
      NovoEvento: {
        type: "object",
        required: ["nome", "descricao", "data_inscricao", "tipo", "status"],
        properties: {
          nome: {
            type: "string",
            description: "Nome do evento.",
            example: "Jogo de Vôlei Beneficente",
          },
          descricao: {
            type: "string",
            description: "Descrição detalhada do evento.",
            example: "Partida de vôlei para arrecadar fundos para caridade.",
          },
          data_inscricao: {
            type: "string",
            format: "date",
            description: "Data limite para inscrição no evento.",
            example: "2025-11-15",
          },
          tipo: {
            type: "string",
            description: "Tipo de evento.",
            example: "gratuito",
          },
          status: {
            type: "string",
            description: "Status atual do evento.",
            example: "aberto",
          },
        },
      },
      NovoEventoComLink: {
        type: "object",
        required: ["nome", "descricao", "data_inscricao", "tipo", "status", "link_pagamento"],
        properties: {
          nome: {
            type: "string",
            description: "Nome do evento.",
            example: "Conferência Anual de Volei",
          },
          descricao: {
            type: "string",
            description: "Descrição detalhada do evento.",
            example: "Conferência sobre técnicas avançadas de vôlei.",
          },
          data_inscricao: {
            type: "string",
            format: "date",
            description: "Data limite para inscrição no evento.",
            example: "2025-10-01",
          },
          tipo: {
            type: "string",
            description: "Tipo de evento.",
            example: "pago",
          },
          status: {
            type: "string",
            description: "Status atual do evento.",
            example: "aberto",
          },
          link_pagamento: {
            type: "string",
            nullable: true,
            description: "Link para a página de pagamento do evento, se aplicável.",
            example: "https://pagamento.exemplo.com/conftech",
          },
        },
      },
      AtualizacaoParcialEvento: {
        type: "object",
        properties: {
          nome: {
            type: "string",
            description: "Novo nome do evento.",
            example: "Workshop de Node.js Avançado",
          },
          descricao: {
            type: "string",
            description: "Nova descrição do evento.",
            example: "Explorando tópicos avançados em Node.js.",
          },
          data_inscricao: {
            type: "string",
            format: "date",
            description: "Nova data limite para inscrição.",
            example: "2026-01-15",
          },
          tipo: {
            type: "string",
            description: "Novo tipo de evento.",
            example: "online",
          },
          status: {
            type: "string",
            description: "Novo status do evento.",
            example: "cancelado",
          },
          link_pagamento: {
            type: "string",
            nullable: true,
            description: "Novo link de pagamento.",
            example: "https://pagamento.exemplo.com/evento1-atualizado",
          },
        },
        minProperties: 1,
      },
      // --- Schemas Comuns ---
      Message: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Uma mensagem descritiva.",
            example: "Operação realizada com sucesso.",
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
            description: "Mensagem de erro.",
            example: "Erro interno do servidor.",
          },
          error: {
            type: "string",
            description: "Detalhes do erro.",
            example: "Database connection failed.",
          },
        },
      },

      // --- Novos Schemas de Esportes ---
      Esporte: {
        type: "object",
        properties: {
          id_esporte: {
            type: "integer",
            description: "ID único do esporte.",
            example: 101,
          },
          nome: {
            type: "string",
            description: "Nome do esporte.",
            example: "Futebol",
          },
          ativo: {
            type: "boolean",
            description: "Status de atividade do esporte (true para ativo, false para inativo).",
            example: true,
          },
        },
      },
      NovoEsporteBody: {
        type: "object",
        required: ["nome"], // Assumindo que id_esporte é gerado ou não é a principal chave aqui
        properties: {
          nome: {
            type: "string",
            description: "Nome do novo esporte.",
            example: "Basquete",
          },
          // id_esporte não incluído aqui se for auto-gerado pelo banco.
          // Se for fornecido pelo cliente, adicione-o como opcional/requerido.
        },
      },
      AtualizacaoEsporteBody: { // Para PUT (atualização completa)
        type: "object",
        required: ["nome"],
        properties: {
          nome: {
            type: "string",
            description: "Novo nome completo do esporte.",
            example: "Natação Sincronizada",
          },
        },
      },
      AtualizacaoParcialEsporteBody: { // Para PATCH (atualização parcial)
        type: "object",
        properties: {
          nome: {
            type: "string",
            description: "Novo nome do esporte.",
            example: "Vôlei de Praia",
          },
          ativo: {
            type: "boolean",
            description: "Status de atividade do esporte.",
            example: false,
          },
        },
        minProperties: 1,
      },
    },
  },
  paths: {
    // === Rotas de Usuários ===
    "/usuarios": {
      post: {
        tags: ["Usuarios"],
        summary: "Cadastrar novo usuário",
        description: "Cria um novo usuário no sistema com criptografia de senha.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/NovoUsuarioBody",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Usuário cadastrado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Usuario",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Usuarios"],
        summary: "Listar e filtrar usuários",
        description: "Lista todos os usuários ou filtra-os com base nos parâmetros de consulta (query parameters) fornecidos. Requer token de autenticação.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            in: "query",
            name: "nome",
            schema: { type: "string" },
            required: false,
            description: "Filtrar usuários pelo nome (busca parcial).",
            example: "Joao",
          },
          {
            in: "query",
            name: "email",
            schema: { type: "string" },
            required: false,
            description: "Filtrar usuários pelo email.",
            example: "joao@example.com",
          },
          {
            in: "query",
            name: "tipo_acesso",
            schema: { type: "string", enum: ["adm", "user"] },
            required: false,
            description: "Filtrar usuários pelo tipo de acesso.",
            example: "user",
          },
          {
            in: "query",
            name: "ativo",
            schema: { type: "boolean" },
            required: false,
            description: "Filtrar usuários pelo status de ativo (true para ativos, false para inativos).",
            example: true,
          },
        ],
        responses: {
          200: {
            description: "Lista de usuários filtrados ou todos os usuários se nenhum filtro for aplicado.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Usuario",
                  },
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/usuarios/login": {
      post: {
        tags: ["Usuarios"],
        summary: "Login do usuário",
        description: "Autentica um usuário com email e senha, retornando um token JWT para futuras requisições.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginBody",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário autenticado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/LoginResponse",
                },
              },
            },
          },
          401: {
            description: "Credenciais inválidas (email ou senha incorretos).",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/usuarios/{id_usuario}": {
      put: {
        tags: ["Usuarios"],
        summary: "Atualizar usuário (completo)",
        description: "Atualiza *todos* os campos de um usuário existente pelo ID. Requer token de autenticação.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id_usuario",
            in: "path",
            required: true,
            schema: { type: "integer", example: 1 },
            description: "ID do usuário a ser atualizado.",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtualizacaoUsuarioBody",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          400: {
            description: "ID inválido ou dados inválidos no corpo da requisição.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          401: { description: "Token inválido ou ausente." },
          404: {
            description: "Usuário não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Usuarios"],
        summary: "Atualizar parcialmente usuário",
        description: "Atualiza um ou mais campos de um usuário existente pelo ID. Requer token de autenticação.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id_usuario",
            in: "path",
            required: true,
            schema: { type: "integer", example: 1 },
            description: "ID do usuário a ser atualizado.",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtualizacaoParcialUsuarioBody",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Usuário atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Usuario",
                },
              },
            },
          },
          400: {
            description: "Nenhum campo fornecido para atualização ou ID inválido.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          401: { description: "Token inválido ou ausente." },
          404: {
            description: "Usuário não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Usuarios"],
        summary: "Desativar usuário",
        description: "Desativa um usuário existente, alterando o campo 'ativo' para FALSE. Requer token de autenticação.",
        security: [{ bearerAuth: [] }],
        parameters: [
          {
            name: "id_usuario",
            in: "path",
            required: true,
            schema: { type: "integer", example: 1 },
            description: "ID do usuário a ser desativado.",
          },
        ],
        responses: {
          200: {
            description: "Usuário desativado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          400: {
            description: "ID inválido.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          401: { description: "Token inválido ou ausente." },
          404: {
            description: "Usuário não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    
    // === Rotas de Eventos ===
    "/eventos": {
      get: {
        summary: "Lista e filtra eventos",
        tags: ["Eventos"],
        parameters: [
          {
            in: "query",
            name: "nome",
            schema: { type: "string" },
            required: false,
            description: "Filtrar eventos pelo nome (busca parcial).",
            example: "",
          },
          {
            in: "query",
            name: "tipo",
            schema: { type: "string", enum: ["gratuito", "pago"] }, // Ajustado conforme a solicitação
            required: false,
            description: "Filtrar eventos pelo tipo (ex: 'gratuito', 'pago').", // Ajustado
            example: "gratuito", // Ajustado
          },
          {
            in: "query",
            name: "status",
            schema: { type: "string", enum: ["aberto", "fechado", "cancelado"] },
            required: false,
            description: "Filtrar eventos pelo status (ex: 'aberto', 'fechado', 'cancelado').",
            example: "aberto",
          },
          {
            in: "query",
            name: "data_inscricao_antes_de",
            schema: { type: "string", format: "date" },
            required: false,
            description: "Filtrar eventos com data de inscrição anterior a esta data.",
            example: "2025-12-01",
          },
          {
            in: "query",
            name: "data_inscricao_depois_de",
            schema: { type: "string", format: "date" },
            required: false,
            description: "Filtrar eventos com data de inscrição posterior a esta data.",
            example: "2025-01-01",
          },
        ],
        responses: {
          200: {
            description: "Uma lista de eventos filtrados ou todos os eventos se nenhum filtro for aplicado.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    type: "object", // Definindo o tipo como objeto
                    properties: { // Definindo as propriedades diretamente
                      id_usuario: { type: "integer", example: 1 },
                      nome: { type: "string", example: "João Silva" },
                      email: { type: "string", example: "joao@example.com" },
                      tipo_acesso: { type: "string", example: "adm" },
                      ativo: { type: "boolean", example: true },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      post: {
        summary: "Cadastra um novo evento",
        tags: ["Eventos"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/NovoEvento",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Evento cadastrado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Evento",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/eventos/{id}": {
      get: {
        summary: "Busca um evento pelo ID",
        tags: ["Eventos"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "integer",
            },
            required: true,
            description: "ID do evento a ser buscado.",
          },
        ],
        responses: {
          200: {
            description: "Detalhes do evento.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Evento",
                },
              },
            },
          },
          404: {
            description: "Evento não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      patch: {
        summary: "Atualiza parcialmente um evento",
        tags: ["Eventos"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "integer",
            },
            required: true,
            description: "ID do evento a ser atualizado.",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtualizacaoParcialEvento",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Evento atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Evento",
                },
              },
            },
          },
          400: {
            description: "Nenhum campo para atualizar.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          404: {
            description: "Evento não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      put: {
        summary: "Atualiza todos os campos de um evento",
        tags: ["Eventos"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "integer",
            },
            required: true,
            description: "ID do evento a ser atualizado.",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/NovoEventoComLink",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Evento atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Evento",
                },
              },
            },
          },
          404: {
            description: "Evento não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Deleta um evento pelo ID",
        tags: ["Eventos"],
        parameters: [
          {
            in: "path",
            name: "id",
            schema: {
              type: "integer",
            },
            required: true,
            description: "ID do evento a ser deletado.",
          },
        ],
        responses: {
          200: {
            description: "Evento deletado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          404: {
            description: "Evento não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    
    // === Novas Rotas de Esportes ===
    "/esportes": {
      post: {
        tags: ["Esportes"],
        summary: "Cadastra um novo esporte",
        description: "Adiciona um novo esporte ao sistema.",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/NovoEsporteBody",
              },
            },
          },
        },
        responses: {
          201: {
            description: "Esporte cadastrado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Esporte",
                },
              },
            },
          },
          500: {
            description: "Erro ao cadastrar esporte.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      get: {
        tags: ["Esportes"],
        summary: "Lista esportes ativos",
        description: "Retorna uma lista de todos os esportes que estão ativos no sistema. Pode ser usado para filtrar por nome.",
        parameters: [
          {
            in: "query",
            name: "nome",
            schema: { type: "string" },
            required: false,
            description: "Filtrar esportes pelo nome (busca parcial).",
            example: "Fute",
          },
        ],
        responses: {
          200: {
            description: "Uma lista de esportes ativos.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Esporte",
                  },
                },
              },
            },
          },
          500: {
            description: "Erro ao listar esportes.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/esportes/{id_esporte}": {
      put: {
        tags: ["Esportes"],
        summary: "Atualiza um esporte (completo)",
        description: "Atualiza todos os campos de um esporte existente pelo ID.",
        parameters: [
          {
            name: "id_esporte",
            in: "path",
            required: true,
            schema: { type: "integer", example: 101 },
            description: "ID do esporte a ser atualizado.",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtualizacaoEsporteBody",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Esporte atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Esporte",
                },
              },
            },
          },
          404: {
            description: "Esporte não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Erro ao atualizar esporte.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Esportes"],
        summary: "Atualiza parcialmente um esporte",
        description: "Atualiza um ou mais campos de um esporte existente pelo ID.",
        parameters: [
          {
            name: "id_esporte",
            in: "path",
            required: true,
            schema: { type: "integer", example: 101 },
            description: "ID do esporte a ser atualizado.",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/AtualizacaoParcialEsporteBody",
              },
            },
          },
        },
        responses: {
          200: {
            description: "Esporte atualizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Esporte",
                },
              },
            },
          },
          400: {
            description: "Nenhum campo fornecido para atualização.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          404: {
            description: "Esporte não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Erro ao atualizar esporte.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        summary: "Desativa um esporte",
        description: "Altera o status 'ativo' de um esporte para `false`.",
        parameters: [
          {
            name: "id_esporte",
            in: "path",
            required: true,
            schema: { type: "integer", example: 101 },
            description: "ID do esporte a ser desativado.",
          },
        ],
        responses: {
          200: {
            description: "Esporte desativado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          404: {
            description: "Esporte não encontrado.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Message",
                },
              },
            },
          },
          500: {
            description: "Erro ao desativar esporte.",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
  },
};

const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: ["./src/routes/*.js"], // Certifique-se de que este caminho está correto para seus arquivos de rota
});

export default swaggerSpec;