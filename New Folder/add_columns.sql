ALTER TABLE ge
ADD COLUMN cal integer
ADD COLUMN rel Float,

ALTER TABLE hon
DROP COLUMN rel,
DROP COLUMN cal,


SELECT * FROM mdrx

SELECT * 
FROM ge
FULL OUTER JOIN hon 
	ON ge.symbol = hon.symbol
	
	
	
SELECT *
FROM Employee
     FULL OUTER JOIN Departments ON Employee.EmpID = Departments.EmpID;	
	
