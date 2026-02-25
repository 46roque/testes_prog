import random

print("🎮 JOGO DA ADIVINHAÇÃO 🎮")
print("Estou pensando em um número entre 1 e 100...")

numero_secreto = random.randint(1, 100)
tentativas = 0

while True:
    try:
        chute = int(input("Digite seu palpite: "))
        tentativas += 1

        if chute < numero_secreto:
            print("🔼 Muito baixo! Tenta um número maior.")
        elif chute > numero_secreto:
            print("🔽 Muito alto! Tenta um número menor.")
        else:
            print(f"🎉 BOA! Você acertou em {tentativas} tentativas!")
            break

    except ValueError:
        print("⚠️ Digita um número válido, meu parceiro.")