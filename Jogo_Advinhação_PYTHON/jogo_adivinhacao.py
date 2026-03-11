import random
from rich.console import Console
from rich.panel import Panel
from rich.prompt import IntPrompt
from rich.progress import track
from colorama import Fore, Style

console = Console()


def titulo():
    console.clear()
    console.print(
        Panel.fit(
            "🎮 [bold cyan]JOGO DA ADIVINHAÇÃO PRO[/bold cyan] 🎮\n[white]Tenta descobrir o número secreto[/white]",
            border_style="green",
        )
    )


def escolher_dificuldade():
    console.print("\n[bold yellow]Escolha a dificuldade:[/bold yellow]")
    console.print("1️⃣  Fácil (10 tentativas)")
    console.print("2️⃣  Médio (7 tentativas)")
    console.print("3️⃣  Difícil (5 tentativas)")

    while True:
        escolha = IntPrompt.ask("\nDigite a opção", choices=["1", "2", "3"])

        if escolha == 1:
            return 10
        elif escolha == 2:
            return 7
        else:
            return 5


def jogar():
    titulo()

    numero_secreto = random.randint(1, 100)
    tentativas_max = escolher_dificuldade()
    tentativas = 0

    console.print("\n🤖 Estou pensando em um número entre [bold]1 e 100[/bold]...\n")

    while tentativas < tentativas_max:

        try:
            chute = IntPrompt.ask("🎯 Seu palpite")

            tentativas += 1

            if chute < numero_secreto:
                console.print("📉 [yellow]Muito baixo![/yellow]")
            elif chute > numero_secreto:
                console.print("📈 [yellow]Muito alto![/yellow]")
            else:
                console.print(
                    f"\n🏆 [bold green]BOA! Você acertou em {tentativas} tentativas![/bold green]"
                )
                return

            console.print(
                f"📊 Tentativas restantes: [bold]{tentativas_max - tentativas}[/bold]"
            )

        except:
            console.print("[red]Digite um número válido![/red]")

    console.print(
        f"\n💀 [bold red]Fim de jogo![/bold red]\nO número era [bold]{numero_secreto}[/bold]"
    )


def main():
    while True:
        jogar()

        console.print("\n🔁 Jogar novamente?")
        opcao = console.input("[s/n]: ").lower()

        if opcao != "s":
            console.print("\n👊 Valeu por jogar!")
            break


if __name__ == "__main__":
    main()