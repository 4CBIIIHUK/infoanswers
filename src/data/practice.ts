import type { PracticeQuestion, Test } from "./tests";

const code = (source: string) => source.replace(/^\n/, "").replace(/\s+$/, "");

export const practiceQuestions: PracticeQuestion[] = [
  {
    kind: "practice",
    id: "variant-1-1",
    label: "В1·1",
    subsection: "Вариант 1",
    title: "Найти среднее арифметическое положительных элементов.",
    note: "Идем слева направо: S — сумма положительных, K — их количество. Если положительных нет, выводим -1.",
    code: code(`
var
  a: array[1..100] of integer;
  N, i, S, K: integer;
begin
  readln(N);
  for i := 1 to N do
    read(a[i]);
  S := 0;
  K := 0;
  for i := 1 to N do
  begin
    if a[i] > 0 then
    begin
      S := S + a[i];
      K := K + 1;
    end;
  end;
  if K = 0 then
    writeln(-1)
  else
    writeln(S / K);
end.
`),
  },
  {
    kind: "practice",
    id: "variant-1-2",
    label: "В1·2",
    subsection: "Вариант 1",
    title: "Найти количество элементов, которые положительны и не превосходят X.",
    note: "Проверяем условия двумя вложенными if (без and): сначала a[i] > 0, затем a[i] <= X.",
    code: code(`
var
  a: array[1..100] of integer;
  N, i, X, K: integer;
begin
  readln(N);
  for i := 1 to N do
    read(a[i]);
  readln(X);
  K := 0;
  for i := 1 to N do
  begin
    if a[i] > 0 then
    begin
      if a[i] <= X then
        K := K + 1;
    end;
  end;
  writeln(K);
end.
`),
  },
  {
    kind: "practice",
    id: "variant-1-3",
    label: "В1·3",
    subsection: "Вариант 1",
    title: "Найти номер последнего отрицательного элемента.",
    note: "Идем слева направо и каждый раз запоминаем номер отрицательного в Nom. В конце там останется последний.",
    code: code(`
var
  a: array[1..100] of integer;
  N, i, Nom: integer;
begin
  readln(N);
  for i := 1 to N do
    read(a[i]);
  Nom := 0;
  for i := 1 to N do
  begin
    if a[i] < 0 then
      Nom := i;
  end;
  writeln(Nom);
end.
`),
  },
  {
    kind: "practice",
    id: "variant-1-4",
    label: "В1·4",
    subsection: "Вариант 1",
    title: "Определить минимальный элемент и его количество.",
    note: "Нашли элемент меньше Min — обновляем Min и ставим K := 1. Нашли равный — увеличиваем K.",
    code: code(`
var
  a: array[1..100] of integer;
  N, i, Min, K: integer;
begin
  readln(N);
  for i := 1 to N do
    read(a[i]);
  Min := a[1];
  K := 0;
  for i := 1 to N do
  begin
    if a[i] < Min then
    begin
      Min := a[i];
      K := 1;
    end
    else if a[i] = Min then
    begin
      K := K + 1;
    end;
  end;
  writeln(Min);
  writeln(K);
end.
`),
  },
  {
    kind: "practice",
    id: "variant-1-5",
    label: "В1·5",
    subsection: "Вариант 1",
    title: "Найти сумму элементов между K1 и K2.",
    note: "Проходим от K1 до K2 и суммируем только элементы строго между ними: (i > K1) and (i < K2).",
    code: code(`
var
  a: array[1..100] of integer;
  N, i, K1, K2, S: integer;
begin
  readln(N);
  for i := 1 to N do
    read(a[i]);
  readln(K1, K2);
  S := 0;
  for i := K1 to K2 do
  begin
    if (i > K1) and (i < K2) then
      S := S + a[i];
  end;
  writeln(S);
end.
`),
  },
  {
    kind: "practice",
    id: "variant-2-1",
    label: "В2·1",
    subsection: "Вариант 2",
    title: "Найти среднее арифметическое отрицательных элементов.",
    note: "S — сумма отрицательных, K — их количество. Если отрицательных нет, выводим 1.",
    code: code(`
var
  a: array[1..100] of integer;
  N, i, S, K: integer;
begin
  readln(N);
  for i := 1 to N do
    read(a[i]);
  S := 0;
  K := 0;
  for i := 1 to N do
  begin
    if a[i] < 0 then
    begin
      S := S + a[i];
      K := K + 1;
    end;
  end;
  if K = 0 then
    writeln(1)
  else
    writeln(S / K);
end.
`),
  },
  {
    kind: "practice",
    id: "variant-2-2",
    label: "В2·2",
    subsection: "Вариант 2",
    title: "Найти количество элементов, которые положительны и не меньше X.",
    note: "Сначала проверяем a[i] > 0, потом a[i] >= X. Если оба условия верны, K увеличивается.",
    code: code(`
var
  a: array[1..100] of integer;
  N, i, X, K: integer;
begin
  readln(N);
  for i := 1 to N do
    read(a[i]);
  readln(X);
  K := 0;
  for i := 1 to N do
  begin
    if a[i] > 0 then
    begin
      if a[i] >= X then
        K := K + 1;
    end;
  end;
  writeln(K);
end.
`),
  },
  {
    kind: "practice",
    id: "variant-2-3",
    label: "В2·3",
    subsection: "Вариант 2",
    title: "Найти номер последнего положительного элемента.",
    note: "Идем слева направо и перезаписываем Nom при каждом положительном. В конце там останется последний номер.",
    code: code(`
var
  a: array[1..100] of integer;
  N, i, Nom: integer;
begin
  readln(N);
  for i := 1 to N do
    read(a[i]);
  Nom := 0;
  for i := 1 to N do
  begin
    if a[i] > 0 then
      Nom := i;
  end;
  writeln(Nom);
end.
`),
  },
  {
    kind: "practice",
    id: "variant-2-4",
    label: "В2·4",
    subsection: "Вариант 2",
    title: "Определить максимальный элемент и его количество.",
    note: "Нашли элемент больше Max — обновляем Max и ставим K := 1. Нашли равный — увеличиваем K.",
    code: code(`
var
  a: array[1..100] of integer;
  N, i, Max, K: integer;
begin
  readln(N);
  for i := 1 to N do
    read(a[i]);
  Max := a[1];
  K := 0;
  for i := 1 to N do
  begin
    if a[i] > Max then
    begin
      Max := a[i];
      K := 1;
    end
    else if a[i] = Max then
    begin
      K := K + 1;
    end;
  end;
  writeln(Max);
  writeln(K);
end.
`),
  },
  {
    kind: "practice",
    id: "variant-2-5",
    label: "В2·5",
    subsection: "Вариант 2",
    title: "Найти произведение элементов между K1 и K2.",
    note: "P начинается с 1. Умножаем только элементы строго между K1 и K2.",
    code: code(`
var
  a: array[1..100] of integer;
  N, i, K1, K2, P: integer;
begin
  readln(N);
  for i := 1 to N do
    read(a[i]);
  readln(K1, K2);
  P := 1;
  for i := K1 to K2 do
  begin
    if (i > K1) and (i < K2) then
      P := P * a[i];
  end;
  writeln(P);
end.
`),
  },
];

export const practiceTest: Test = {
  id: "practice",
  title: "Практика!",
  short: "Практика!",
  subtitle: "Решения задач на массивах",
  description:
    "Два варианта задач по массивам с готовыми программами на Pascal. Сразу переходите к нужному варианту и копируйте код.",
  icon: "array",
  accent: "emerald",
  subsections: [
    { id: "variant-1", title: "Вариант 1" },
    { id: "variant-2", title: "Вариант 2" },
  ],
  questions: practiceQuestions,
};
