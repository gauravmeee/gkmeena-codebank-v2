
# JOINS

##### 1. INNER JOIN
- **Definition**: Returns only the rows where there is a match in both tables.
- **Use Case**: When you only need data that exists in both tables.
    ```sql
    SELECT p.firstName, p.lastName, a.city
    FROM Person p
    INNER JOIN Address a ON p.PersonId = a.PersonId;
    ```
##### 2. LEFT JOIN (LEFT OUTER JOIN)
- **Definition**: Returns all rows from the left table and the matched rows from the right table. If there is no match, `NULL` is returned for columns from the right table.
- **Use Case**: When you need all data from the left table regardless of matches in the right table.
    ```sql
    SELECT p.firstName, p.lastName, a.city
    FROM Person p
    LEFT JOIN Address a ON p.PersonId = a.PersonId;
    ```  
##### 3. RIGHT JOIN (RIGHT OUTER JOIN)
- **Definition**: Returns all rows from the right table and the matched rows from the left table. If there is no match, `NULL` is returned for columns from the left table.
- **Use Case**: When you need all data from the right table regardless of matches in the left table.
    ```sql
    SELECT p.firstName, p.lastName, a.city
    FROM Person p
    RIGHT JOIN Address a ON p.PersonId = a.PersonId;
    ```

##### 4. FULL OUTER JOIN
- **Definition**: Returns all rows from both tables. When there is no match, `NULL` is returned for columns from the table without a match.
- **Use Case**: When you need all records from both tables, whether or not they have matches.
    ```sql
    SELECT p.firstName, p.lastName, a.city
    FROM Person p
    FULL OUTER JOIN Address a ON p.PersonId = a.PersonId;
    ```
##### 5. CROSS JOIN
- **Definition**: Returns the Cartesian product of the two tables, meaning every row from the first table is joined with every row from the second table.
- **Use Case**: Rarely used, but useful for generating combinations of rows from two tables.
    ```sql
    SELECT p.firstName, a.city
    FROM Person p
    CROSS JOIN Address a;
    ```
    

##### 6. SELF JOIN
- **Definition**: Joins a table to itself, which can be useful for comparing rows within the same table.
- **Use Case**: When you need to find relationships within a single table.
    ```sql
    SELECT e1.EmployeeName, e2.EmployeeName
    FROM Employee e1
    JOIN Employee e2 ON e1.ManagerId = e2.EmployeeId;
    ```

---
# Case Sensitivity

Whether SQL is case-sensitive or not depends on the database system and the specific collation settings used.

#### Collation

- **Collation** in SQL refers to a set of rules that determine how data is sorted and compared in a database.
- It specifies how characters are compared, which affects operations like `ORDER BY`, `WHERE`, and `JOIN`. 
- Collation is crucial for managing data in different languages and for case-sensitivity.

**Components of Collation**
1. Character Set: ex `utf8` , `latin1`
2. Collation Name: `utf8_general_ci` or `utf8_bin`
3. Case Sensitivity:  `CS` for case-insensitivity, `CI` for case-insensitive (e.g. `a` & `A`)
4. Accent Sensitivity: `AS` for accent-sensitivity , `AI` for accent-insensitivity (e.g. `é` vs. `e`)

**Examples Collation**
- `utf8_general_ci` : `CI` & `AI`
- `utf8_bin` : `CS` & `AS`
- `SQL_Latin1_General_CP1_CI_AS` (SQL Server) : `CI` & `AS`


#### Case Sensitivity in SQL Database

##### 1. **MySQL** : 
- Case sensitivity depends on the collation of the columns or the database
- By default, string comparisons in MySQL are **case-insensitive** (e.g., `utf8_general_ci` collation).
- However, column collation can be set to **case-sensitive** (e.g., `utf8_bin` collation).
##### 2. **SQL Server** : 
- Case sensitivity is determined by the collation settings of the columns or database.
- `CI` in collation (e.g., `SQL_Latin1_General_CP1_CI_AS`) stands for **Case Insensitive**.
- `CS` in collation (e.g., `SQL_Latin1_General_CP1_CS_AS`) stands for **Case Sensitive**.

##### 3. **Oracle**: 
- Comparisons are case-sensitive by default. To make them case-insensitive, you can use functions like `UPPER()` or `LOWER()`.
##### 4. **PostgreSQL**: 
- By default, it is **case-sensitive** when comparing strings.


**Summary :**
MySQL - String comparison `CI` & Column Collation `CS`
SQL Server - Depends on Setting
Oracle - Comparisons are `CS`
PostgreSQL - String Comparison `CS`


