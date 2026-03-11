import json
import os
from rich.console import Console
from rich.panel import Panel
from rich.table import Table

ARQUIVO = "tarefas.json"
console = Console()
tarefas = []


def carregar_tarefas():
    global tarefas
    if os.path.exists(ARQUIVO):
        with open(ARQUIVO, "r", encoding="utf-8") as f:
            tarefas = json.load(f)
    else:
        tarefas = []


def salvar_tarefas():
    with open(ARQUIVO, "w", encoding="utf-8") as f:
        json.dump(tarefas, f, indent=4, ensure_ascii=False)


def titulo():
    console.clear()
    console.print(
        Panel.fit(
            "📝 [bold cyan]LISTA DE AFAZERES PRO[/bold cyan]\nOrganize sua vida como um dev 😎",
            border_style="green",
        )
    )


def menu():
    console.print("\n[bold yellow]Escolha uma opção:[/bold yellow]")
    console.print("1️⃣  Adicionar tarefa")
    console.print("2️⃣  Ver tarefas")
    console.print("3️⃣  Marcar como concluída")
    console.print("4️⃣  Remover tarefa")
    console.print("5️⃣  Ver progresso")
    console.print("6️⃣  Sair")


def mostrar_tarefas():
    if not tarefas:
        console.print("\n📭 Nenhuma tarefa cadastrada.")
        return

    tabela = Table(title="📌 Suas tarefas")

    tabela.add_column("Nº", justify="center")
    tabela.add_column("Status", justify="center")
    tabela.add_column("Tarefa")

    for i, tarefa in enumerate(tarefas, start=1):

        status = "☑" if tarefa["concluida"] else "☐"

        tabela.add_row(
            str(i),
            status,
            tarefa["texto"]
        )

    console.print(tabela)


def adicionar_tarefa():
    texto = console.input("\n✏️ Digite a tarefa: ")

    if texto.strip() == "":
        console.print("⚠️ Tarefa vazia não pode.")
        return

    tarefas.append({
        "texto": texto,
        "concluida": False
    })

    salvar_tarefas()

    console.print("✅ Tarefa adicionada!")


def concluir_tarefa():

    if not tarefas:
        console.print("⚠️ Não há tarefas.")
        return

    mostrar_tarefas()

    try:
        num = int(console.input("\nDigite o número da tarefa: "))

        tarefas[num-1]["concluida"] = True

        salvar_tarefas()

        console.print("✅ Tarefa marcada como concluída!")

    except:
        console.print("⚠️ Número inválido.")


def remover_tarefa():

    if not tarefas:
        console.print("⚠️ Não há tarefas para remover.")
        return

    mostrar_tarefas()

    try:
        num = int(console.input("\nDigite o número da tarefa: "))

        removida = tarefas.pop(num-1)

        salvar_tarefas()

        console.print(f"🗑️ '{removida['texto']}' removida!")

    except:
        console.print("⚠️ Número inválido.")


def progresso():

    if not tarefas:
        console.print("📭 Nenhuma tarefa cadastrada.")
        return

    total = len(tarefas)
    concluidas = sum(1 for t in tarefas if t["concluida"])

    porcentagem = (concluidas / total) * 100

    console.print(
        Panel(
            f"""
📊 Progresso

Total de tarefas: {total}
Concluídas: {concluidas}

Progresso: {porcentagem:.1f}%
""",
            border_style="cyan"
        )
    )


def main():

    carregar_tarefas()

    while True:

        titulo()
        menu()

        opcao = console.input("\n👉 Escolha: ")

        if opcao == "1":
            adicionar_tarefa()

        elif opcao == "2":
            mostrar_tarefas()

        elif opcao == "3":
            concluir_tarefa()

        elif opcao == "4":
            remover_tarefa()

        elif opcao == "5":
            progresso()

        elif opcao == "6":
            console.print("\n👋 Falou!")
            break

        else:
            console.print("❌ Opção inválida.")

        console.input("\nPressione ENTER para continuar...")


if __name__ == "__main__":
    main()