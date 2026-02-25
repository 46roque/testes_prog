from flask import Flask, render_template

app = Flask(__name__)

posts = [
    {
        "id": 1,
        "titulo": "Primeiro Post",
        "conteudo": "Esse é meu primeiro post no blog profissional!"
    },
    {
        "id": 2,
        "titulo": "Aprendendo Flask",
        "conteudo": "Flask é leve, poderoso e perfeito pra projetos web."
    }
]

@app.route("/")
def index():
    return render_template("index.html", posts=posts)

@app.route("/post/<int:id>")
def post(id):
    post = next((p for p in posts if p["id"] == id), None)
    return render_template("post.html", post=post)

if __name__ == "__main__":
    app.run(debug=True)