
#### Largest Value

##### 1. Using Subqueries

**Largest**
```Mysql
SELECT MAX(column_name) AS largest_value 
FROM table_name;
```

**Second Largest**
```Mysql
SELECT MAX(salary) AS second_largest_salary 
FROM employees 
WHERE salary < (
	SELECT MAX(salary) 
	FROM employees);
```


**Nth Largest**
```MySQL
SELECT MAX(column_name) AS nth_largest
FROM table_name
WHERE column_name < (
    SELECT MAX(column_name)
    FROM table_name
    WHERE column_name < (
        SELECT MAX(column_name)
        FROM table_name
        -- Repeat this pattern N-1 times
    )
);
```

##### Using `LIMIT` and `OFFSET`

1.  Sort the values in descending order (`ORDER BY column_name DESC`).
2. Skip the first `(N-1)` values (`OFFSET N-1`) and fetch one row (`LIMIT 1`).

```Mysql
SELECT column_name
FROM table_name
ORDER BY column_name DESC
LIMIT 1 OFFSET N-1;
```

---
#### Print the top 5 rows in SQL

1. **For MySQL & PostgreSQL:**
```sql
SELECT * FROM table_name
LIMIT 5;
```

2. **For SQL Server:**
```sql
SELECT TOP 5 * 
FROM table_name;
```

4. **For Oracle:**
```sql
SELECT * 
FROM table_name
WHERE ROWNUM <= 5;
```
