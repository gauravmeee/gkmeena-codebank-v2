---
slug : mysql-basic-commands
---

Data Definition Language (DDL): Defines and manages the structure of database objects.
```mysql
 CREATE, ALTER, DROP, TRUNCATE
 USE DESC/ DESCRIBE SHOW
```

Data Manipulation Language (DML): Manipulates data within database tables.
```mysql
SELECT, INSERT, UPDATE, DELETE
```

Data Control Language (DCL): Controls access to data in the database.
```mysql
GRANT, REVOKE
```

Transaction Control Language (TCL): Manages transactions to ensure data integrity.
```mysql
COMMIT, ROLLBACK, SAVEPOINT, SET TRANSACTION
```

---

SQL supports different types of joins: `INNER JOIN`, `LEFT JOIN`, `RIGHT JOIN`, `FULL JOIN`, `CROSS JOIN`.
## `--` or `/* ... */` 
```mysql
-- this is a single line

/* This is a 
Multiline Comment */
```

---
# DDL 
---
#### 1. DDL For Databases

## `SHOW DATABASES`
```Mysql
SHOW DATABASES
```
## `CREATE DATABASE`
```mysql
CREATE DATABASE DatabaseName;
-- or
CREATE DATABASE IF NOT EXISTS DatabaseName;
```

## `DROP DATABASE`
```mysql
DROP DATABASE DatabaseName;
-- or
DROP DATABASE IF EXISTS DatabaseName
```
## `USE`
```mysql
-- Selects the specified database for the current session
USE DatabaseName;
```

## `SHOW TABLES`
```mysql
-- Lists all tables in the currently selected database
SHOW TABLES;
```

## `DROP TABLE`
```mysql
-- Drop Table Commands
DROP TABLE TableName;
-- or
DROP TABLE IF EXISTS TableName;
```

---
#### 2. DDL For Tables

## `CREATE TABLE`
```mysql
CREATE TABLE TableName(
ColumnName1 DataType [Size],
ColumnName2 DataType [Size],...
)
-- or
CREATE TABLE TableName(
ColumnName1 DataType [Size] Constraints,...)
```

`REFERENCE`
```mysql
CREATE TABLE TableName ( ColumnName DataType [Size] 
REFERENCE TableName ColumnName
);
```

`SELECT`
```mysql
-- Create TAble from Existing Table
CREATE TABLE TableName AS
(SELECT ColumnName, ColumnName2 FROM TableName WHERE <Condition>)
```

## `ALTER TABLES`

`ADD`
```mysql
ALTER TABLE TableName
ADD ColumnName DataType (Size) <Constraint>
```

`MODIFY`
```mysql
ALTER TABLE TableName
MODIFY ColumnName DataType (Size)
```

`ORDER BY`
```mysql
-- Places the modified column at the beginning of the ttable
ALTER TABLE TableName MODIFY ColumnName DataType(Size) FIRST;

-- Places the modified column immediately after the specified column.
ALTER TABLE TableName MODIFY ColumnName DataType(Size) AFTER ColumnName2;
```

`CHNAGE`
```mysql
-- Changing ColumnName
ALTER TABLE TableName CHANGE OldName NewName Datatype(Size)
```

`DROP`
```mysql
-- Removing Table Components
ALTER TABLE TableName 
DROP PRIMARY KEY,
DROP FOREIGN KEY,
DROP ColumnName,
```
## `SHOW COLUMNS`
```mysql
-- to view column details of a table
SHOW COLUMNS FROM TableName;
```
##  `DESC` or `DESCRIBE`
```mysql
-- Shows the structure of the specified table (columns, data types, etc.)
DESC TableName;
-- or
DESCRIBE TableName;
```

- Use **`TRUNCATE`** when you need to quickly clear all rows from a table but keep the table structure.
- Use **`DROP`** when you want to permanently delete a table, including its structure.

---
# DML
---

## `SELECT`
```mysql
-- Show all columns
SELECT * FROM TableName;

-- Show specific columns
SELECT ColumnName1, ColumnName2, ColumnName3 FROM TableName;

-- Putting Text in the Query Output
SELECT ColumnName, 'Text' FROM TableName;
```

`DISTINCT`
```mysql
-- Select distinct rows
SELECT DISTINCT * FROM TableName;

-- Select distinct values in a specific column
SELECT DISTINCT ColumnName FROM TableName;
```

`ALL`
```mysql
-- select ALL (ALL is implicit by default)

SELECT ALL * FROM TableName; -- Select all rows
SELECT ALL ColumnName FROM TableName; -- Select all values in a specific column

-- `ALL` as Comparison Operator
SELECT * FROM Employees
WHERE Salary > ALL (SELECT Salary FROM Employees);
-- This query selects employees whose salary is greater than all the salaries
```

`Expression`
```mysql
-- Evaluate a simple expression
SELECT 1 + 6;

-- Evaluate an expression with `FROM dual` (used in Oracle, not needed in MySQL)
SELECT 4 * 3 FROM DUAL;
-- `DUAL` allows you to execute expressions like arithmetic, string manipulations, or system functions without requiring a real table.

-- Scalar expression with a selected field
SELECT ColumnName * 100 FROM TableName;
```

`Top 100 fields`
```sql
-- In SQL Server, Sybase, MS Access --
SELECT TOP 100 *  FROM TableName;

-- MySQL, MariaDB, PostgreSQL
`SELECT *  FROM TableName LIMIT 100;`
```

`AS`
```mysql
-- Using column aliases
SELECT ColumnName AS MyColumnName FROM TableName;
```

`IFNULL`
```mysql
-- Replaces NULL in ColumnName with 'ValueSubstitute'
SELECT IFNULL(ColumnName, 'ValueSubstitute') FROM TableName;
```

`WHERE`
```mysql
-- Filters rows based on specified conditions
SELECT ColumnName
FROM TableName
WHERE <Conditions>;
```

EXAMPLE
```mysql
SELECT *
FROM Employees
WHERE (Bonus + Commission > 10000)
  AND (Department = 'Sales')
  AND (Name LIKE 'J___') 
  AND (YearsExperience IS NOT NULL)
  AND NOT (JobTitle LIKE 'Intern%'); 
```

`<>` : not

`BETWEEN`
```mysql
-- Filters rows where ColumnName is between x and y (inclusive)
... WHERE ColumnName BETWEEN x AND y
```

`IN`
```mysql
-- Filters rows where ColumnName matches any value in the list (x, y, z)
... WHERE ColumnName IN (x, y, z)
```

`LIKE`
```mysql
-- Filters rows where ColumnName starts with '13'
...WHERE ColumnName LIKE '13%'

-- Filters rows where ColumnName has exactly 3 characters
...WHERE ColumnName LIKE "___"
```

`IS NULL`
```mysql
-- Filters rows where ColumnName has a NULL value
...WHERE ColumnName IS NULL;
```

`ORDER BY`
```mysql
-- Sorts the result set in ascending order by ColumnName (default)
SELECT * 
FROM TableName
ORDER By ColumName 
-- or
... ORDER BY ColumnName ASC;


-- Sorts the result set in descending order by ColumnName
... ORDER BY ColumnName DESC;
```

`GROUP BY`
```mysql
-- Groups rows based on unique values in ColumnName1 and calculates an aggregate function for each group
SELECT ColumnName1, AggregateFunction(ColumnName2)
FROM TableName
GROUP BY ColumnName1;


```

`HAVING`
```mysql
-- Filters groups created by the GROUP BY clause based on a condition applied to an aggregate function
SELECT ColumnName1, AggregateFunction(ColumnName2)
FROM TableName
GROUP BY ColumnName1
HAVING AggregateFunction(ColumnName2) < Condition;
```

**Aggregate Functions**

`ROUND()`
```mysql
-- Rounds the values in ColumnName
SELECT ROUND(ColumnName) AS MyColumnName FROM TableName;
```

`AVG()`
```mysql
-- Calculates the average of distinct values in ColumnName
SELECT AVG(DISTINCT ColumnName) FROM TableName;

-- Calculates the average of all values in ColumnName (default)
SELECT AVG(ALL ColumnName) FROM TAbleName;
```

`COUNT()`
```mysql
-- Counts all rows, including those with NULL values (* include null value)
SELECT COUNT(*)  FROM TableName;

-- Counts distinct non-NULL values in ColumnName
SELECT COUNT(DISTINCT ColumnName) FROM TableName;

-- Counts all non-NULL values in ColumnName (default)
SELECT COUNT(ALL ColumnName) FROM TableName; 
```

`MAX()`
```mysql
-- Finds the maximum of distinct values in ColumnName
SELECT MAX(DISTINCT ColumnName) FROM TableName;
```

`MIN()`
```mysql
-- Finds the minimum of distinct values in ColumnName
SELECT MIN(DISTINCT ColumnName) FROM TableName;
```

SUM()`
```mysql
-- Calculates the sum of distinct values in ColumnName
SELECT SUM(DISTINCT ColumnName) FROM TableName;
```

---
## JOIN = Cross(Cartesian) Product + Condition

```
-- Table1
| ID | Name  |
|----|-------|
| 1  | Alice |
| 2  | Bob   |

-- Table2
| Code | Color  |
|------|--------|
| A    | Red    |
| B    | Blue   |

-- Cartesian Product (Cross Join) Result
| ID | Name  | Code | Color |
|----|-------|------|-------|
| 1  | Alice | A    | Red   |
| 1  | Alice | B    | Blue  |
| 2  | Bob   | A    | Red   |
| 2  | Bob   | B    | Blue  |
```

`CROSS JOIN`
```mysql
-- Cartesian product of the two tables.
SELECT Table1.Col1, Table2.Col2
FROM Table1
CROSS JOIN Table2;
-- or Without Cross JOin
SELECT Table1.Col1, Table2.Col2 
FROM Table1, Table2;
```

`NATURAL JOIN`
```mysql
-- automatically joins tables based on all columns with the same names removes duplicate columns from the result.
SELECT *
FROM Table1 
NATURAL JOIN Table2;
-- or
SELECT *
FROM Table1 
INNER JOIN Table2 ON Table1.CommonCol = Table2.CommonCol;
-- or (does not handle duplicate columns automatically).
SELECT * From Table1, Table2 -- 
WHERE Table1.CommonCol = Table2.CommonCol -- 
```

---
## INSERT - UPDATE  - DELETE DATA

## `INSERT INTO`

`VALUES`
```mysql
INSERT INTO TableName ColumnName1 VALUES Value1 ;
-- or
INSERT INTO TableName (ColumnName1, ColumnName2) VALUES (Value1, Value2) ;
```

`SELECT`
```mysql
-- Inserts data into TableName by selecting rows from TableName2 
INSERT INTO TableName1 SELECT * FROM TableName2 WHERE <Conditions>;

-- Inserts specific columns into TableName1 by selecting them from TableName2
INSERT INTO TableName SELECT ColumnName FROM TableName WHERE <Conditions>;
```

## `UPDATE`

`SET`
```mysql
-- Updates the value of ColumnName to Value2 for rows that meet the Condition
UPDATE TableName
SET ColumnName = Value2 WHERE <Condition>;

-- Increments the value of ColumnName by 900 for all rows in TableName
UPDATE TableName
SET ColumnName = ColumnName + 900;
```

## `DELETE`

`FROM`
```mysql
-- Delete All Content
DELETE FROM TableName

-- Delete Specific Rows
DELETE FROM TableName WHERE <Predicate>
```

---

***Notes:***
```
# SQL Rules

- SQL keywords are not case-sensitive.
- Database, table, and column names are *usually not case-sensitive
- An SQL statement must end with a `;` 
- Use single quotes (') for string literals in SQL.
- Double quotes are usually reserved for identifiers (e.g., column names)
- SQL is not white-space sensitive
- Enclose subqueries in parentheses `()` or enclose queries that include more than one columns, condition, statements.
```

```
# Pranthesis '()' uses

- Function Call Max()
- Group Columns Together SELECT (Column1, Column2) FROM TableName;
- Definin Datype Size VARCHAR(100)
- Grouping WHERE Clauses ( Salary > 5000 AND Dept = 'IT') OR (Expression>5);
- Subqueries SELECT * FROM Employee WHERE DepartmentID IN (SELECT ID FROM Departmnets WHERE = 'HR');

# Parenthesis Error
Parentheses are not required around the column definition when adding a single column. ALTER TABLE Employees ADD|Modify Email VARCHAR(100);
```

```
# Operators in SQL

NULL Handeling : IS NULL, IS NOT NULL
Relational Operator : <, >, =, <, >, <=, >=, <>(not equal)
Logical Operator : OR(||), NOT(!), AND(&&)
Arithmetic Operators : +, -, *, /
Wildcards(used with like): `%` for sequence of character, `-` for a single character 
```

```
# Constraints
 
NOT NULL, UNIQUE, PRIMARY KEY, DEFAULT 'Value', CHECK (<Conditions>), REFERENCE  
```

```
# SELECT Format

NOTE: ALL can be used wherever DISTINCT is applicable (default is ALL).
SELECT (ALL/ DISTINCT) (*/ColumnName) FROM TableName;
```