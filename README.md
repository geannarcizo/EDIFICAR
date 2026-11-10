# Edificar Consórcios — Etapa 1

Protótipo local em HTML5, CSS3 e JavaScript com dados fictícios. Não existe conexão Supabase, autenticação ou persistência. Nenhuma publicação foi realizada.

## Estrutura

```text
index.html                  Simulador público demonstrativo
admin/index.html            Prévia administrativa somente leitura
assets/css/styles.css       Identidade visual e responsividade
assets/data/plans.js         Planos fictícios (mensalidades explícitas)
assets/js/app.js             Interações e apresentação
assets/js/finance.js         Cálculo ilustrativo isolado
tests/finance.test.js        Verificação do exemplo financeiro
package.json                Comando de testes, sem dependências
docs/etapa-1.md              Roteiro de revisão e próximos passos
docs/referencia-anterior.html Cópia integral do HTML anterior
supabase.sql                Arquivo anterior, preservado, ainda não validado
```

## Executar no Windows

1. Instale Python 3 pelo site oficial (python.org). Habilite o Python Launcher durante a instalação.
2. Abra o PowerShell na pasta do projeto, por exemplo:

```powershell
cd C:\Projetos\EDIFICAR
py -3 --version
py -3 -m http.server 8000 --bind 127.0.0.1
```

3. Acesse `http://127.0.0.1:8000` no navegador. A prévia administrativa está em `/admin/`.
4. Encerre com `Ctrl+C` no PowerShell.

Se `py` não existir mas `python --version` indicar Python 3, substitua `py -3` por `python`. Se a porta estiver ocupada, use 8001 no comando e no navegador. Não abra o HTML por duplo clique: os módulos JavaScript exigem servidor HTTP.

Não é necessário instalar pacotes, executar `npm install`, criar `.env` ou fornecer chaves. A aplicação desta etapa não faz chamadas externas. Node.js 20 ou superior é opcional, apenas para os testes automatizados:

```powershell
node --test tests/finance.test.js
```

## Limites desta entrega

- Prévia administrativa acessível publicamente, contendo apenas dados fictícios; não é uma área protegida.
- Nenhum botão de CRUD, login, gráfico, comparativo ou PDF foi apresentado como funcional.
- Seleção de plano e mês atualiza indicadores usando um modelo demonstrativo. A validação financeira contratual continua pendente.
- Correção composta: crédito × (1 + taxa anual / 100)^(mês / 12). Não é previsão do índice nem confirmação das regras da administradora.
- Mensalidade vem do cadastro e permanece fixa neste modelo; não inclui reajustes ou despesas.
- Verde indica resultado positivo; vermelho indica negativo.
- Não foi fornecido logotipo ou material gráfico externo aprovado. Foram mantidos o conceito azul-marinho, tons claros e verde do HTML anterior, cujo conteúdo foi preservado para referência. A marca usa texto e o ícone de imóvel é um desenho vetorial de interface, não um novo logotipo.
- `supabase.sql` pertence à versão anterior. Não execute nesta etapa; será revisado na etapa de banco e segurança.
- A cópia HTML em `docs` é histórica e contém dependências externas; não faz parte do novo fluxo. Uma hospedagem futura deverá publicar apenas os arquivos da aplicação selecionados, sem documentação, testes ou SQL.

A estrutura estática pode ser preparada para Firebase Hosting ou equivalente posteriormente; não há configuração de deploy nem publicação nesta etapa.
