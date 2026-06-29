# Gitea-Pages

Agrega la función de Pages a tu Gitea/Forgejo sin tener que hostearlo en tu servidor.

---

## ¿Como comenzar?

Clona este repositorio a GitHub o a GitLab y modifica el config del index.html para que tenga tus valores reales. Ahora sube tu pagina como un Cloudflare Pages y tu Gitea Pages estara listo.

---

## Modos

- **sub:** Los repos estaran disponibles en USUARIO.dominio/repo o en USUARIO.dominio si el repo es el mismo nombre que el del usuario y la rama es "pages"
- **slash:** Los repos se subiran a dominio/USUAIO/REPO/@RAMA o en dominio/USUARIO/REPO si la rama es pages o en dominio/USUARIO si el repo se llama igual que el usuario y la rama es "pages".

---

# Gitea-Pages

Add Pages functionality to your Gitea/Forgejo instance without having to host it on your server.

---

## How to start?

Create a migration of this repository on GitLab or GitHub y modify the config from the index.html file to have your real values. Now publish it as a Cloudflare Pages and you Gitea Pages will be ready.

---

## Modes

- **sub:** Repos will be on USER.domain/repo or USER.repo if repo name is the same as the user and the branch is "pages".
- **slash:** Repos will be on domain/USER/REPO/@BRANCH, domain/USER/REPO if branch is "pages", domain/USER if repo name is the same as username and branch is "pages".

---

> [!WARNING]
> This proyect is not finished. Some things may not work, but its good enought to work ok. Make sure to use full URL when referring to a file (e.g. domain/file/image.jpg) for it to load well. Do not use "/file/image.jpg"
