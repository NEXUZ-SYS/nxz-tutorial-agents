---
type: checkpoint
outputFile: squads/nxz-backoffice-processes/pipeline/data/briefing-gaps-resolved.md
---

# Step 03: Resolução de Lacunas do Briefing

## Context

A Ana Análise (Step 02) identificou lacunas no briefing original que impedem o mapeamento avançar com qualidade. Antes de passar para o Mário Mapeador, precisamos respostas do usuário para os gaps **critical** e **high** listados em `briefing-analysis.md` → seção `Gaps Identificados`.

O pipeline neste ponto já sabe:
- Problem Statement consolidado.
- Stakeholders e SIPOC preliminares.
- AS-IS narrativo inicial.
- Success Criteria do TO-BE.
- Lista de gaps priorizados.

O que falta: respostas concretas (ou decisão explícita de deferir) para cada gap crítico/high.

## Perguntas ao Usuário

**Lista dinâmica** — as perguntas vêm da tabela `Gaps Identificados` em `briefing-analysis.md`. Para cada gap com criticidade **critical** ou **high**:

1. Apresente o gap ao usuário com o seguinte formato:
   ```
   Gap #{n} ({criticidade}) — {título curto do gap}
   Justificativa: {texto do campo Justificativa}
   Pergunta: {texto do campo Pergunta sugerida}
   ```
2. Aguarde a resposta. Aceite três tipos de retorno:
   - **Resposta direta** (texto livre do usuário).
   - **Deferir** — o usuário responde "deferir" / "não sei agora" / "N/A" → marcar para registro em "Gaps intencionalmente não-respondidos".
   - **Contextualizar mais** — o usuário pede para a Ana reformular ou fornecer mais contexto antes de responder. Peça o detalhe necessário e volte à pergunta.

3. Itens com criticidade **medium** e **low** só devem ser perguntados se o usuário explicitamente solicitar ("quero cobrir todos os gaps"). Caso contrário, registre-os como não-respondidos com motivo "prioridade baixa — seguirá com assumption".

## Formato de Registro

O checkpoint grava em `squads/nxz-backoffice-processes/pipeline/data/briefing-gaps-resolved.md`:

```markdown
# Briefing Gaps Resolved — {data-ISO}

Referência: briefing-analysis.md (versão {hash ou timestamp})

## Gaps Respondidos

### Gap #{n} — {título}
- **Criticidade:** {critical|high|medium|low}
- **Pergunta:** {texto original}
- **Resposta do usuário:**
  {resposta literal em parágrafo ou lista}
- **Impacto no desenho:** {como esta resposta destrava mapeamento / RACI / KPI}

---
(repetir bloco acima para cada gap respondido)

## Gaps Intencionalmente Não-Respondidos

### Gap #{n} — {título}
- **Criticidade:** {critical|high|medium|low}
- **Motivo do deferimento:** {diferido / N/A / prioridade baixa / aguardando decisão externa}
- **Assumption assumida pelo squad:** {texto claro da hipótese que Mário/Paula usarão no lugar da resposta}
- **Revalidar em:** {step ou momento futuro, ex.: "Step 06 — Aprovação do Desenho"}

---
Registrado em: {timestamp-ISO-8601}
```

O bloco `Assumption assumida pelo squad` é obrigatório para gaps critical/high não-respondidos — ele entra como premissa no `process-flow.md` e no PDD.
