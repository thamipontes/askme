# Ask.Me
React.js and Node.js based survey app! 🤔🗒️❔

# Como contribuir?
## Clonando o repo
Para contribuir, primeiramente você deve clonar esse repositório na sua máquina local ou criar um fork e cloná-lo! Para saber mais sobre:  
https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository

## Sobre a organização do código
Quando você tiver o repositório local disponível, você verá que há duas pastas principais:
- askme-backend
- askme-frontend

Nessas pastas estão os códigos do backend e do frontend, respectivamente.  
Nosso backend utiliza Express.js + Mongoose. Para saber mais sobre:  
- https://expressjs.com/en/starter/hello-world.html (Hello World para Express.js!)
- https://mongoosejs.com/docs/index.html (Quick Start do Mongoose!)

Nosso frontend utiliza React.js. Para saber mais sobre:
- https://reactjs.org/ (página do React.js. Lá, você encontrará um tutorial excelente!)

## Como saber o que posso fazer para ajudar o projeto?
Na aba "Issues", você encontrará as tarefas que estão em andamento! Para mais detalhes, você pode acessar a aba "Projects", que contém um (ou alguns) Kanban que utilizamos para gerenciar essas tarefas. As tarefas devem conter uma especificação boa do que deve ser feito.

## Por onde começar uma tarefa?
Inicialmente, você deve criar uma branch. Para isso, se você for fã de linha de comando, use:
```
git checkout dev
git pull origin dev
git checkout -b feature/I-[número da issue que você tentará resolver]
```
A cada etapa da solução, lembre de criar commits!
```
git add .  -> atenção: você deve estar na raíz do projeto para o "." funcionar!
git commit -m "[mensagem explicando o que foi feito nesse commit]"
```
Quando você quiser fazer upload dos seus commits e torná-los visíveis para outros contribuintes desse projeto, use:

```
git push origin feature/I-[número da issue que você tentará resolver]
```

## E depois que eu conseguir concluir uma tarefa?
Primeiramente, garanta que você escreveu testes para as mudanças que você realizou. Testes são muito importantes para a estabilidade do sistema. Atualmente, utilizamos o Jest (https://jestjs.io/) para escrever testes! Depois que você já tiver testes escritos, suba todas as modificações que você fez, como explicado acima (em "Por onde começar uma tarefa?") e, depois, acessando a aba "Pull Requests", crie um novo pull request que tenha como base a sua branch de trabalho (provavelmente, "feature/I-<número da issue que você tentará resolver>") e como destino a branch "dev". A branch dev é a branch mais movimentada. Ela pode ser um pouco instável, e esse é objetivo. De tempos em tempos, ela será testada e aplicada na branch "main". Assim, primeiramente sua mudanças estarão na dev e, futuramente, serão disponibilizados na main. Espere aprovação do seu Pull Request, pois talvez outros contribuintes solicitem mudanças. 

## Pronto!
Depois disso, tudo certo! Seu PR será aprovado, e você poderá realizar outra tarefa!
