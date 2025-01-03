> 12-12-2024

# SQL

DDL, DML
DCL -> Grant, Revoke
TCL -> Commit, Rollback, Savepoint


## DML
---


**order of SQL clauses matters in a query**
- Order: SELECT -> FROM -> WHERE -> GROUP BY -> HAVING -> ORDER BY -> LIMIT


Database support Limit : Mysql, postgre, SQL lite.
Database support Top: Microsoft sql server `SELECT Top 100 *`
Database which not support both : Oracle -> `FETCH FIRST` or `ROWNUM`
Database which support both : None

**`;` is not always required**:
- Required in executing multiple sql statements in one script
- in database like PostgreSQL and Oracle semicolon should be use to terminate.


**comment**:
`--` & `/* */`

---

`Select */columnName'
`select Distinct`
`select ALL` -> implicit

`Any/All` in comparison


---

```Mysql
-- In SQL Server, Sybase, MS Access --
SELECT TOP 100 *  FROM TableName;

-- MySQL, MariaDB, PostgreSQL
SELECT *  FROM TableName LIMIT 100;
```

```mysql
SELECT ColumName AS AliasColumnName......
```

```mysql
SELECT IFNULL(ColumnName, 'ValueSubstitute')......
```

---

`WHERE
`
```mysql
...BETWEEN x AND y -- text(start from 'x' to 'y' letter), numeric or datae range
... WHERE ColumnName 
...IN (x, y, z)
...ISNULL
```


```mysql
SELECT * FROM Employees
WHERE Salary > ALL/ANY (SELECT Salary FROM Employees);


-- Value Comparison with ALL: X > ALL (a, b, c) ==> X > a AND X > b AND X > c
-- Here 'Any' will return all salaries except least one.
```

```Mysql
SELECT * FROM Employees
WHERE Salary > ANY (SELECT Salary FROM Employees);

-- Value Comparison with ANY: X > ANY (a, b, c)  ==>  X > a OR X > b OR X > c
-- Here 'Any' will return all salaries except least one.
```

---

`HAVING`

---

`Group By`

The **`GROUP BY`** clause in SQL is used to group rows that have the same values in specified columns into aggregated data, such as sums, averages, counts, etc.

Function 
->Aggregate functions are applied **to each group**, not individual rows. `WHERE` → `GROUP BY` → Aggregations → `HAVING` → `ORDER BY`.

```mysql
SELECT age FROM customers GROUP BY country; -- ❌ Error
SELECT SUM(age) FROM customers GROUP BY country; -- ✅ No Error
```

---

Popular Types of Function (with only popular Example)

- **Scalar Functions**: Operate on single values (rows).
    - Return a single value as output.
    - Examples: `ROUND()`, `LEN()`, `SUBSTRING()`, etc.
    - **Numeric Functions** (e.g., `ROUND()`, `ABS()`, `CEILING()`, `FLOOR()`)
    - **String Functions** (e.g., `UPPER()`, `LOWER()`, `CONCAT()`)
    - **Date Functions** (e.g., `NOW()`, `CURDATE()`, `DATEADD()`)

- **Aggregate Functions**: Operate on groups of rows (typically used with `GROUP BY`).
    - Return a single value for each group.
    - Examples:  `MIN()`, `MAX()`, etc.
    - **Numeric Aggregates** (e.g., `SUM()`, `AVG()`, `COUNT()`)

- **Set Functions**:
    - Work with multiple rows and return a set of rows as the result.
    - Examples: `IN()`, `EXISTS()`, `ANY()`, `ALL()`

---

`COUNT()`
```mysql
...COUNT (*) -- count all rows (include null value)

...COUNT(DISTINCT ColumnName) --  Counts distinct non-NULL values in ColumnName

...COUNT(ALL ColumnName) -- Counts all non-NULL values in ColumnName (default)
```

---

Notes
```
# sql Rules

- Use single quotes (') for string literals in SQL.
- Double quotes are usually reserved for identifiers (e.g., column names)
-  SQL is not white-space sensitive
- `()` enclose queries that include more than one columns, condition, statements, subqueries.
```

---

## DDL

note : content inside  `[]` are optional, if using the content don't use square bracket.
```mysql
SHOW DATABASES

CREATE DATABASE [IF NOT EXISTS] DatabaseName 

DROP DATABASE [IF EXISTS] DatabaseName

USE DatabaseName

```

For Table
```mysql
SHOW TABLES

CREATE TABLE [IF NOT EXISTS] TableName( ColumnName1 DataType [Size] Constraints,...)

DROP TABLE [IF EXISTS] TableName;
```
Datatypes : 
`INT, SMALLINT, BIGINT, DECIMAL(p,s), NUMERIC(p,s), FLOAT(p)`
`CHAR(n), VARCHAR(n), YEAR`
`BOOLEAN`
`DATE, TIME, DATETIME, TIMESTAMP, YEAR`

- `p`: Precision (total number of digits).
- `s`: Scale (number of digits after the decimal point).
- `n`: fixed-length string of `n` characters.


**Constraints:**
- **`PRIMARY KEY`**: Unique and not null.
- **`FOREIGN KEY`**: Enforces referential integrity between tables.
- **`UNIQUE`**: Ensures uniqueness of values in a column.
- **`CHECK`**: Enforces a condition on data values. `CHECK (ColumnName > 0)`
- **`DEFAULT`**: Provides a default value for a column. `DEFAULT 0`
- **`NOT NULL`**: Ensures no null values in a column.
- **`INDEX`**: Improves query performance.

| Feature         | `CHAR(n)`                                                      | `VARCHAR(n)`                                               |
| --------------- | -------------------------------------------------------------- | ---------------------------------------------------------- |
| **Length**      | Fixed length (`n` characters).                                 | Variable length (up to `n` characters).                    |
| **Storage**     | Always stores `n` characters (padded with spaces).             | Stores only the number of characters used.                 |
| **Performance** | May be faster for fixed-length data.                           | More efficient for variable-length data.                   |
| **Use case**    | When the data is always the same length (e.g., country codes). | When the data can vary in length (e.g., names, addresses). |


### DDL Alter Table

```Mysql
ALTER TABLE TableName

...ADD Column ColumnName DataType (Size) <Constraint>
...Modify Column ColumnName DataType (Size) <Constraint> [FIRST]/[AFTER ColumnName2]
...CHANGE OldName NewName DataType (Size) <Constraint>


...Drop Column
...DROP PRIMARY KEY / FOREIGN Key
```

```Mysql
SHOW COLUMNS FROM TableName; -- to view column details of a table

-- Shows the structure of the specified table
DESC TableName;
-- or
DESCRIBE TableName;
```


---

### **`WHERE` vs `HAVING` in SQL**

- **`WHERE`**: Filters rows **before** grouping. Cannot use aggregate functions.
    
    - Example:
        
        ```sql
        SELECT name FROM employees WHERE salary > 50000;
        ```
        
- **`HAVING`**: Filters groups **after** aggregation. Can use aggregate functions.
    
    - Example:
        
        ```sql
        SELECT department, SUM(salary) 
        FROM employees 
        GROUP BY department 
        HAVING SUM(salary) > 100000;
        ```

---
        
Revise : DML: Insert Update, Delete , Join