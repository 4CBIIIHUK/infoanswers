import type { PracticeQuestion, Test } from "./tests";

const repeatedAndMissingCode = `var
  a: array[1..20] of integer;
  n, i, j, k, povtor, propusk: integer;
begin
  readln(n);
  for i := 1 to n do
    read(a[i]);

  povtor := 0;
  propusk := 0;
  for i := 1 to n do
  begin
    k := 0;
    for j := 1 to n do
      if a[j] = i then
        k := k + 1;
    if k = 2 then
      povtor := i;
    if k = 0 then
      propusk := i;
  end;

  writeln(povtor);
  writeln(propusk);
end.`;

export const practiceQuestions: PracticeQuestion[] = [
  {
    kind: "practice",
    id: "variant-1-1",
    label: "В1·1",
    subsection: "Вариант 1",
    title: "Задача №1",
    points: 3,
    statement:
      "Дан одномерный числовой массив, содержащий N целых чисел. Определить произведение: значение минимального элемента массива и первого элемента массива.",
    fileName: "ПР1-В1-зд1.pas",
    exampleInput: "7\n12 -4 90 0 -5 7 -12",
    exampleOutput: "-144",
    code: `var
  a: array of int64;
  n, i: integer;
  min: int64;
begin
  readln(n);
  SetLength(a, n + 1);
  for i := 1 to n do
    read(a[i]);

  min := a[1];
  for i := 2 to n do
    if a[i] < min then
      min := a[i];

  writeln(min * a[1]);
end.`,
  },
  {
    kind: "practice",
    id: "variant-1-2",
    label: "В1·2",
    subsection: "Вариант 1",
    title: "Задача №2",
    points: 3,
    statement:
      "Дан одномерный числовой массив, содержащий N целых чисел. Найти количество тех элементов массива, значения которых не больше заданного целого числа X.",
    fileName: "ПР1-В1-зд2.pas",
    exampleInput: "7\n12 4 9 0 5 9 15\n9",
    exampleOutput: "5",
    code: `var
  a: array of int64;
  n, i, k: integer;
  x: int64;
begin
  readln(n);
  SetLength(a, n + 1);
  for i := 1 to n do
    read(a[i]);
  readln(x);

  k := 0;
  for i := 1 to n do
    if a[i] <= x then
      k := k + 1;

  writeln(k);
end.`,
  },
  {
    kind: "practice",
    id: "variant-1-3",
    label: "В1·3",
    subsection: "Вариант 1",
    title: "Задача №3",
    points: 3,
    statement:
      "Дан одномерный числовой массив, содержащий N целых чисел. Увеличить значения элементов массива, которые являются четными числами, в 2 раза.",
    fileName: "ПР1-В1-зд3.pas",
    exampleInput: "7\n12 -4 9 1 5 7 24",
    exampleOutput: "24 -8 9 1 5 7 48",
    code: `var
  a: array of int64;
  n, i: integer;
begin
  readln(n);
  SetLength(a, n + 1);
  for i := 1 to n do
    read(a[i]);

  for i := 1 to n do
  begin
    if a[i] mod 2 = 0 then
      a[i] := a[i] * 2;
    write(a[i], ' ');
  end;
end.`,
  },
  {
    kind: "practice",
    id: "variant-1-4",
    label: "В1·4",
    subsection: "Вариант 1",
    title: "Задача №4",
    points: 10,
    statement:
      "Дан массив из N чисел, в котором должны быть все числа от 1 до N, но одно число пропущено, а другое повторяется дважды (N ≤ 20). Найдите оба числа без сортировки массива.",
    fileName: "10 баллов.pas",
    exampleInput: "9\n1 2 3 3 4 5 6 8 9",
    exampleOutput: "3\n7",
    code: repeatedAndMissingCode,
  },
  {
    kind: "practice",
    id: "variant-2-1",
    label: "В2·1",
    subsection: "Вариант 2",
    title: "Задача №1",
    points: 3,
    statement:
      "Дан одномерный числовой массив, содержащий N целых чисел. Определить сумму: значение максимального элемента массива и последнего элемента массива.",
    fileName: "ПР1-В2-зд1.pas",
    exampleInput: "7\n12 -4 90 0 -5 7 -12",
    exampleOutput: "78",
    code: `var
  a: array of int64;
  n, i: integer;
  max: int64;
begin
  readln(n);
  SetLength(a, n + 1);
  for i := 1 to n do
    read(a[i]);

  max := a[1];
  for i := 2 to n do
    if a[i] > max then
      max := a[i];

  writeln(max + a[n]);
end.`,
  },
  {
    kind: "practice",
    id: "variant-2-2",
    label: "В2·2",
    subsection: "Вариант 2",
    title: "Задача №2",
    points: 3,
    statement:
      "Дан одномерный числовой массив, содержащий N целых чисел. Найти количество тех элементов массива, значения которых не меньше заданного целого числа X.",
    fileName: "ПР1-В2-зд2.pas",
    exampleInput: "7\n12 4 9 0 5 9 15\n9",
    exampleOutput: "4",
    code: `var
  a: array of int64;
  n, i, k: integer;
  x: int64;
begin
  readln(n);
  SetLength(a, n + 1);
  for i := 1 to n do
    read(a[i]);
  readln(x);

  k := 0;
  for i := 1 to n do
    if a[i] >= x then
      k := k + 1;

  writeln(k);
end.`,
  },
  {
    kind: "practice",
    id: "variant-2-3",
    label: "В2·3",
    subsection: "Вариант 2",
    title: "Задача №3",
    points: 3,
    statement:
      "Дан одномерный числовой массив, содержащий N целых чисел. Уменьшить значения элементов массива, которые являются нечетными числами, на 10.",
    fileName: "ПР1-В2-зд3.pas",
    exampleInput: "7\n12 -4 9 1 5 7 24",
    exampleOutput: "12 -4 -1 -9 -5 -3 24",
    code: `var
  a: array of int64;
  n, i: integer;
begin
  readln(n);
  SetLength(a, n + 1);
  for i := 1 to n do
    read(a[i]);

  for i := 1 to n do
  begin
    if a[i] mod 2 <> 0 then
      a[i] := a[i] - 10;
    write(a[i], ' ');
  end;
end.`,
  },
  {
    kind: "practice",
    id: "variant-2-4",
    label: "В2·4",
    subsection: "Вариант 2",
    title: "Задача №4",
    points: 10,
    statement:
      "Дан массив из N чисел, в котором должны быть все числа от 1 до N, но одно число пропущено, а другое повторяется дважды (N ≤ 20). Найдите оба числа без сортировки массива.",
    fileName: "10 баллов.pas",
    exampleInput: "9\n1 2 3 3 4 5 6 8 9",
    exampleOutput: "3\n7",
    code: repeatedAndMissingCode,
  },
];

export const practiceTest: Test = {
  id: "practice",
  title: "Практика 25.11",
  short: "Практика 25.11",
  subtitle: "Практическая работа №1. Массивы. 10 класс",
  description:
    "Два варианта по четыре задачи. Сохраните программы в своей папке под указанными именами файлов.",
  icon: "array",
  accent: "emerald",
  subsections: [
    { id: "variant-1", title: "Вариант 1" },
    { id: "variant-2", title: "Вариант 2" },
  ],
  questions: practiceQuestions,
};