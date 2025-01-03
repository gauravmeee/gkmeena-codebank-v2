---
slug : mysql-key-points-gpt-notes
---

---
#### Types of Joins

**Inner Join** = Intersection
- `INNER JOIN`
- or just `JOIN`

**Left Outer Join** = Inner Join + Left 
- `LEFT OUTER JOIN`
- or just `LEFT JOIN` 

**Right Outer Join** = Inner Join + Right
- `RIGHT OUTER JOIN`
- or just `RIGHT JOIN` 

**Outer Join** = Inner Join + Left + Right = Union
- `FULL OUTER JOIN`
- or just `FULL JOIN`
- or just `OUTER JOIN`

---
#### Natural Join

- A `NATURAL JOIN` automatically joins tables based on *columns with the same name* and compatible data types in both tables.
- It eliminates the need to write `ON tableA.column = tableB.column`. i.e. it matches columns with the same name

**Natural + Inner Join** :`NATURAL JOIN`. 
**Natural + Left Jon** : `NATURAL LEFT JOIN`. 
**Natural + Right Jon** : NATURAL RIGHT JOIN`. 
**Natural + Full Outer Join** : `NATURAL FULL JOIN` or  `NATURAL FULL OUTER JOIN`. 

**Note**: 
- `NATURAL JOIN` Not supported by Many browsers such as `SQL Server`, `Oracle`, `SQLite`
- `NATURAL JOIN` can be risky if the table structures change over time. If new columns are added with the same name as existing columns, those columns will automatically be included in the join condition, which may lead to unexpected results. This is why many developers prefer to use explicit join conditions with `INNER JOIN`, `LEFT JOIN`, etc., to have full control over which columns are used for joining.

---
#### Comments in SQL

- Single-line comments  -> `--` and  `#` (only for MySQL))
- Multi-line comments -> `/* ... */`)

---
#### Order of Keyword

In SQL the order of keywords matters
-  `NATURAL LEFT JOIN`. ✅ 
- `LEFT NATURAL JOIN`. ❌ Syntax Error

----
#### IS NULL

In SQL, when checking for a `NULL` value, you should use the `IS NULL` or `IS NOT NULL` operator, not the `=` operator.

`customerId = NULL` ❌
`customerId IS NULL` ✅
