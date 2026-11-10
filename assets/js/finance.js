import { plans } from '../data/plans.js';
import { simulate } from './finance.js';
const money = value => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const select = document.querySelector('#plan');
if (select) {
  const published = plans.filter(plan => plan.ativo);
  published.forEach(plan => select.add(new Option(`${plan.nome} · ${money(plan.credito)}`, plan.id)));
  const month = document.querySelector('#month');
  function render() {
    const plan = published.find(plan => plan.id === select.value);
    month.max = plan.parcelas;
    month.value = Math.min(Number(month.value), plan.parcelas);
    document.querySelector('#month-value').textContent = `${month.value}º mês`;
    document.querySelector('#plan-info').textContent = `${plan.tipo} · ${plan.administradora} · ${plan.parcelas} parcelas`;
    document.querySelector('#monthly').textContent = money(plan.mensalidade);
    document.querySelector('#credit').textContent = money(plan.credito);
    document.querySelector('#assumptions').textContent = `Correção estimada: ${plan.correcao}% a.a. · Lance: ${plan.lance}% do crédito corrigido · Venda: ${plan.venda}% do crédito disponível.`;
    const result = simulate(plan, Number(month.value));
    const labels = { corrected: 'Crédito corrigido', embedded: 'Lance embutido', available: 'Crédito disponível', sale: 'Venda estimada', paid: 'Parcelas pagas', profit: 'Resultado bruto', roi: 'Retorno bruto simples' };
    document.querySelector('#metrics').replaceChildren(...Object.entries(labels).map(([key, label]) => {
      const card = document.createElement('article'); card.className = 'metric';
      const title = document.createElement('h3'); title.textContent = label;
      const value = document.createElement('p');
      value.textContent = key === 'roi' ? result[key].toLocaleString('pt-BR', { maximumFractionDigits: 2, minimumFractionDigits: 2 }) + '%' : money(result[key]);
      if (key === 'profit' || key === 'roi') value.className = result[key] >= 0 ? 'positive' : 'negative';
      card.append(title, value); return card;
    }));
  }
  select.addEventListener('change', render); month.addEventListener('input', render); render();
}
const list = document.querySelector('#admin-plans');
if (list) plans.forEach(plan => {
  const row = document.createElement('tr');
  [plan.nome, plan.tipo, money(plan.credito), money(plan.mensalidade), `${plan.parcelas} meses`, plan.ativo ? 'Ativo' : 'Inativo'].forEach(value => {
    const cell = document.createElement('td'); cell.textContent = value; row.append(cell);
  }); list.append(row);
});
