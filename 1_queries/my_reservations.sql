SELECT P.*,R.*,AVG(rating) as average_rating
FROM reservations R 
JOIN properties P ON R.property_id = P.id
JOIN property_reviews PR on P.id = R.property_id
WHERE R.guest_id = 4 AND end_date < now()
GROUP BY P.id,R.id
ORDER BY R.start_date
LIMIT 10;