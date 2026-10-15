# Spec 001 — Cuentas Claras (MVP)

## 1. Contexto
Cuando un grupo de amigos sale, pagan personas distintas por cosas distintas y al final nadie sabe quién le debe a quién. Cuentas Claras registra los gastos y calcula los pagos para quedar a mano.

## 2. Requisitos (EARS)
- **RF-1** CUANDO el organizador agrega un participante, el sistema DEBERÁ añadirlo si su nombre tiene entre 1 y 30 caracteres y no se repite (sin distinguir mayúsculas); si no, DEBERÁ explicar por qué lo rechaza.
- **RF-2** CUANDO el organizador registra o elimina un gasto (descripción, monto, quién pagó y entre quiénes se divide), el sistema DEBERÁ recalcular los saldos.
- **RF-3** SI el monto no es mayor a cero o tiene más de 2 decimales, o falta la descripción o las personas de la división, ENTONCES el sistema DEBERÁ rechazar el gasto con un mensaje claro.
- **RF-4** El sistema DEBERÁ dividir cada gasto en partes iguales en céntimos enteros, dando los céntimos que sobran de uno en uno según el orden en que se agregaron las personas.
- **RF-5** El sistema DEBERÁ mostrar el saldo de cada persona (lo que pagó menos lo que consumió) en formato `S/ 1,234.50`. La suma de los saldos DEBERÁ ser cero.
- **RF-6** El sistema DEBERÁ sugerir los pagos para saldar las deudas usando como máximo N−1 pagos (N = personas con saldo distinto de cero), de mayor a menor monto.

## 3. Fuera de alcance
- Montos distintos por persona, propina, varias monedas.
- Guardar los datos al cerrar el navegador.
- Cuentas de usuario.

## 4. Decisiones de clarificación
| Pregunta | Decisión |
|---|---|
| S/ 10 entre 3, ¿quién paga el céntimo que sobra? | El primero en orden de alta (RF-4) |
| ¿"12,50" con coma es válido? | Sí, coma o punto (RF-3) |
| ¿"El menor número de pagos posible"? | Máximo N−1: el mínimo exacto es un problema NP-difícil (RF-6) |
| ¿"Ana" y "ana" son la misma persona? | Sí (RF-1) |
| ¿Puede pagar alguien que no consumió? | Sí: "pagué la cuenta de otros" (RF-2) |
