tarefas = []

def mostrar_tarefas():
    if not tarefas:
        print("\n📭 Nenhuma tarefa cadastrada.")
    else:
        print("\n📌 Suas tarefas:")
        for i, tarefa in enumerate(tarefas):
            print(f"{i + 1}. {tarefa}")

while True:
    print("\n==== LISTA DE AFAZERES ====")
    print("1 - Adicionar tarefa")
    print("2 - Ver tarefas")
    print("3 - Remover tarefa")
    print("4 - Sair")

    opcao = input("Escolha uma opção: ")

    if opcao == "1":
        nova = input("Digite a nova tarefa: ")
        tarefas.append(nova)
        print("✅ Tarefa adicionada!")

    elif opcao == "2":
        mostrar_tarefas()

    elif opcao == "3":
        mostrar_tarefas()
        try:
            numero = int(input("Digite o número da tarefa para remover: "))
            removida = tarefas.pop(numero - 1)
            print(f"🗑️ Tarefa '{removida}' removida!")
        except:
            print("⚠️ Número inválido!")

    elif opcao == "4":
        print("👋 Saindo... Até mais!")
        break

    else:
        print("❌ Opção inválida!")