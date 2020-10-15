SELECT P.*, AVG(PR.rating) AS average_rating
FROM properties P
JOIN property_reviews PR ON P.id = PR.property_id
WHERE city LIKE '%ancouv%'
GROUP by P.id
HAVING AVG(PR.rating) >= 4
ORDER by P.cost_per_night
LIMIT 10;