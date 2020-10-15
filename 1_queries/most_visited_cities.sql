SELECT P.city, COUNT(R.id) as total_reservations 
FROM reservations R
JOIN properties P ON P.id = R.property_id
GROUP BY P.city
ORDER BY total_reservations DESC
