# Desafio custom node n8n
Esse repositório tem um custom node para n8n chamado Random que recebe um input de mínimo e máximo inteiro (ambos inclusos) para retornar um número aleatório usando a API do Random.org.

## Passo a passo para subir a infra do n8n e testar conectores customizados:

### O que você vai precisar:
Você vai precisar ter instalado na sua máquina os seguintes itens:
- Docker compose (faz parte para subir a infra do n8n)
- Node.js
- TypeScript na versão 22 (LTS)

### Instalar as dependências
- Docker compose: seguindo a documentação https://docs.n8n.io/hosting/installation/docker/.
- Node.js: instale seguindo o site oficial https://nodejs.org/pt/download e verifique a instalação com 'node -v'.
- TypeScript na versão 22 (LTS): após instalar o node, execute o 'npm install typescript@22' no terminal, depois verifique a instalação com 'npm -v'.
- Dentro da pasta custom instale todas as dependencias - dando um 'npm install'.
- Instale também o 'npm install n8n-core n8n-workflow --save-dev'.

### Executar o serviço localmente (usando Docker).
- Segundo o repositório disponibilizado na documentação, https://github.com/n8n-io/n8n-hosting/tree/main/docker-compose/withPostgres:
- Para iniciar o n8n, basta iniciar o docker-compose executando o seguinte comando na pasta atual: 'docker compose up -d'.
- Navegue até a pasta C:\Users\kelly\n8n-selfhost\n8n_data\custom\Random (siga o caminho do seu usuário) - e execute 'npx tsc' (para compilar o código TypeScript).
- Depois volte na pasta executando 'cd../../..', e execute 'docker compose restart n8n' (para reiniciar o container do n8n).
- Após isso, acesse o n8n no navegador digitando: http://localhost:5678.
- Para pará-lo, execute: 'docker-compose stop'.

### Configurar o ambiente (variáveis de ambiente, banco de dados, etc.).
- Este projeto utiliza n8n self-hosted com PostgreSQL para armazenar dados de workflows, credenciais e execuções.
- Então não é necessário .env para testes locais, como se diz na documentação; todas as configurações essenciais (DB, porta, timezone) estão no compose.yml. Ele seria usado quando voltado para deploy com domínio e HTTPS.
- O n8n local roda via http://localhost:5678.

### Executar os testes.
- Pesquise pelo workflow no n8n, nesse caso, estipulado como 'Random'.
- Execute o workflow com o botão 'Test step' e veja se a saída contém o número aleatório gerado, por exemplo:
{
"random": 85,
"min": 10,
"max": 100
}
- Se você tiver no seu código 'results.push({ json: { random: randomNumber, min, max } });', ele dará esses três dados acima.

### Qualquer informação adicional que você considere relevante.
- Para usar o Docker compose é necessário verificar se a virtualização está ativa na sua máquina, você pode fazer isso no gerenciador de tarefas > na aba de desempenho → CPU > procure a linha Virtualização e veja se está ativa.
- O Docker Desktop usa o WSL2 (um subsistema do Windows que roda Linux em segundo plano) apenas para gerenciar os containers, para fazer isso, terá que:
  Instalar WSL2, abrindo o PowerShell como administrador e executando: wsl --install
- Adicionar importações da etapa 3.1 segundo a documentação: https://docs.n8n.io/integrations/creating-nodes/build/programmatic-style-node/#step-3-define-the-node-in-the-base-file.


 
