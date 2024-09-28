/* Perform max on milliseconds.
   Perform min on bytes
   Perform sum on unit price */

SELECT
 	MAX("Milliseconds") AS max_millisecond, -- MAX aggregate function to find maximum value from milliseconds column.
 	MIN("Bytes") AS min_bytes,	-- MIN aggregate function to find minimum value from the bytes column.
 	SUM("UnitPrice") AS total_unit_price -- SUM aggregate function which returns the sum of the unit price column.
FROM
	"Track";


-- Calculate kilobyte / second using bytes and milliseconds from the “Track” table.

SELECT 	
	( "Bytes" / "Milliseconds" * 1000 / 1024 ) AS kBps
FROM   
    "Track";



-- Calculate the count of people by their ‘city’ and sort them alphabetically from the “Employee” table. 

SELECT 
	"City",
	COUNT(*) AS employee_count -- COUNT aggregate function to count the employees count.
FROM 
	"Employee"
GROUP BY 
    "City"
ORDER BY 
    "City";



/* Count the number of invoices in the range of Jan to March 
   of 2009 using the invoice date and also calculate the sum 
   of the total of invoices in that range. */

SELECT 
    COUNT(*) AS invoice_count,
    SUM("Total") AS total_sum
FROM 
    "Invoice"
WHERE 
    "InvoiceDate" >= '2009-01-01' AND "InvoiceDate" < '2009-04-01'; 

