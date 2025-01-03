---
slug : mysql-my-easy-problems-solutions
---

## Q. report the first name, last name, city, and state of each person in the `Person` table. If the address of a `personId` is not present in the `Address` table, report `null` instead.


**Input**
```
Person
+----------+----------+-----------+
| personId | lastName | firstName |
+----------+----------+-----------+
Address
+-----------+----------+---------------+------------+
| addressId | personId | city          | state      |
+-----------+----------+---------------+------------+
```

**Output**
```
+-----------+----------+---------------+----------+
| firstName | lastName | city          | state    |
+-----------+----------+---------------+----------+
```

#### Solution.

```mysql
Select p.firstName, p.lastName, a.city, a.state
    FROM Person p
    LEFT JOIN Address a ON p.personId=a.personId;
-- ✅
```
OR

```Mysql
Select p.firstName, p.lastName, a.city, a.state
	FROM Person p
	NATURAL LEFT JOIN Address a;
-- ✅
```

if `FULL OUTER JOIN` ❌ Extra Right Table  `Address` data, for which  `Person` not exist in  Left Table
if `RIGHT JOIN` ❌ Missed Left table `Person` data, for which `Address` not exist in Right Table
IF `LEFT JOIN` ✅

---
## Q. Write a solution to find the second highest **distinct** salary from the `Employee` table. If there is no second highest salary, return `null (return None in Pandas)`.

The result format is in the following example.

**Example 1:**

**Input:** 
```
Employee table:
+----+--------+
| id | salary |
+----+--------+
| 1  | 100    |
| 2  | 200    |
| 3  | 300    |
+----+--------+
```

**Output:** 
```
+---------------------+
| SecondHighestSalary |
+---------------------+
| 200                 |
+---------------------+
```

**Solution:**

Order by (sort) salaries in descending order,  and skips the first  (`OFFSET 1`), then Fetch the Top value (`LIMIT 1`) i.e. 2nd Largest
```Mysql
Select salary as SecondHighestSalary  from Employee
Order by Salary DESC
LIMIT 1 OFFSET 1 # Offset N-1 = 2nd -1 = 1

-- ❌ If Second Highest Salary Not Exist, It doesnot Return `NULL`
-- ⬇️ 
 ```

If `N` exceeds the number of rows, the subquery returns `NULL`.
``` MySQL
Select (Select salary  from Employee
Order by Salary DESC
LIMIT 1 OFFSET 1) as SecondHighestSalary

-- ❌ It Doesn't considering Distinct value. for exam it return 100 for It salary = (100, 100, 50 , 10) not 50 
-- ⬇️
```

use the `DISTINCT` keyword 
```Mysql
Select (Select Distinct salary  from Employee
Order by Salary DESC
LIMIT 1 OFFSET 1) as SecondHighestSalary
-- ✅
```

---
## Q. Write a solution to find the employees who earn more than their managers.


**Input:** 
```
Employee table:
+----+-------+--------+-----------+
| id | name  | salary | managerId |
+----+-------+--------+-----------+
| 1  | Joe   | 70000  | 3         |
| 2  | Henry | 80000  | 4         |
| 3  | Sam   | 60000  | Null      |
| 4  | Max   | 90000  | Null      |
+----+-------+--------+-----------+
```

**Output:** 
```
+----------+
| Employee |
+----------+
| Joe      |
+----------+
```

**Solutions:**

Without using join (My 😃)
```Mysql
Select name as Employee 
	from employee e1 
	where salary > (Select salary 
		from employee 
		where id = e1.managerId);
```

using join (GPT 🤖)
```mysql
SELECT e1.name AS Employee
FROM Employee e1
JOIN Employee e2
  ON e1.managerId = e2.id
WHERE e1.salary > e2.salary;
```

---


### Q. Write a solution to report all the duplicate emails. Note that it's guaranteed that the email field is not NULL.


**Input:** 
```
Person table:
+----+---------+
| id | email   |
+----+---------+
| 1  | a@b.com |
| 2  | c@d.com |
| 3  | a@b.com |
+----+---------+
```

```
**Output:** 
+---------+
| Email   |
+---------+
| a@b.com |
+---------+
```

**Solution:**

using `Join` (My 😃)
```Mysql
Select Distinct p1.email as Email
from Person p1
join Person p2
    on p1.id!=p2.id
where p1.email=p2.email;
```

Using `Group` and `Having` (GPT 🤖)
```mysql
SELECT email
FROM Person
GROUP BY email
HAVING COUNT(email) > 1;
```

---

### Q. Write a solution to find all customers who never order anything.

> Left Join ⭐


**Example 1:**

**Input:** 
```
Customers table:
+----+-------+
| id | name  |
+----+-------+
| 1  | Joe   |
| 2  | Henry |
| 3  | Sam   |
| 4  | Max   |
+----+-------+
```

```
Orders table:
+----+------------+
| id | customerId |
+----+------------+
| 1  | 3          |
| 2  | 1          |
+----+------------+
```

**Output:** 
```
+-----------+
| Customers |
+-----------+
| Henry     |
| Max       |
+-----------+
```

**Solution:**

My + gpt same 😃
```mysql
Select name as Customers
from customers c
left join orders o
    on c.id = o.customerId
    where customerId IS NULL; # or `o.id IS NULL`
```

**Learnings:**
`customerId = NULL` ❌
`customerId IS NULL` ✅

---

### Q. Write a solution to **delete** all duplicate emails, keeping only one unique email with the smallest `id`. ⭐
> `delete`

Note:  write a `DELETE` statement and not a `SELECT` one.

**Example 1:**

**Input:** 
```
Person table:
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
| 3  | john@example.com |
+----+------------------+
```

**Output:** 
```
+----+------------------+
| id | email            |
+----+------------------+
| 1  | john@example.com |
| 2  | bob@example.com  |
+----+------------------+
```

**Solution:**

`using` Conditional Join
```mysql
DELETE p1
FROM person p1
JOIN person p2
  ON p1.email = p2.email
  AND p1.id > p2.id;
```

using `Where` on Cross Join
```mysql
Delete p2
from person p1
Join person p2
where p1.email=p2.email AND p2.id>p1.id
```

In case we have to write `select` statement
```mysql
Select MIN(id), email from person group by email
```

---

### Q. Write a solution to find all dates' `id` with higher temperatures compared to its previous dates (yesterday).

**Example 1:**

**Input:** 

```
Weather table:
+----+------------+-------------+
| id | recordDate | temperature |
+----+------------+-------------+
| 1  | 2015-01-01 | 10          |
| 2  | 2015-01-02 | 25          |
| 3  | 2015-01-03 | 20          |
| 4  | 2015-01-04 | 30          |
+----+------------+-------------+
```

**Output:** 
```
+----+
| id |
+----+
| 2  |
| 4  |
+----+
```

**Solutions:**

Without using `DATE_ADD()` OR `DATE_SUB` (My Ans)
```Mysql
Select w2.id from weather w1
join weather w2
on (w1.recordDate=w2.recordDate - INTERVAL 1 day) AND w2.temperature>w1.temperature;
```

Using `DATE_SUB()`
```mysql
SELECT w1.id
FROM Weather w1
JOIN Weather w2
  ON DATE_ADD(w2.recordDate, INTERVAL 1 DAY) = w1.recordDate
WHERE w1.temperature > w2.temperature;

```

**Learnings ⭐**
```mysql
SELECT CURDATE()-1 ; # ERROR ❌
```

Previous Day
```MYSQL
SELECT CURDATE() - INTERVAL 1 DAY; # previous day ✅
# or
SELECT DATE_SUB(CURDATE(), INTERVAL 1 DAY); # Using Subtract previous day ✅
```

Next Day
```MYSQL
SELECT CURDATE() + INTERVAL 1 DAY; # Next day ✅
# or
SELECT DATE_ADD(CURDATE(), INTERVAL 1 DAY); # Using Add Next day ✅
```
