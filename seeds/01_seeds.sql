INSERT INTO users(name,email,password) 
SELECT 'Tina', 'tina_mathews@yahoo.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
UNION ALL 
SELECT 'Diya', 'diya2178@hotmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'
UNION ALL
SELECT 'Habibi', 'habibi-jahan@rediffmail.com','$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.';
ALTER SEQUENCE users_id_seq RESTART WITH 1;
------------------------PROPERTIES-------------------------------------------------------------------------------------------------------
INSERT INTO properties(title,description,thumbnail_photo_url,cover_photo_url,cost_per_night,parking_spaces,number_of_bathrooms,number_of_bedrooms,country,street,city,province,post_code,active,owner_id) 
SELECT 'Luxurious Condominium','description1',
'https://unsplash.com/photos/OtXADkUh3-I', 'https://unsplash.com/photos/HOyiWTo0Am8',
120,1,1,1,'Canada','21 Bay Drive','Missisauga','Ontario','G2V5K9',true,2
UNION ALL
SELECT 'Entire guest suite','description2','https://unsplash.com/photos/R-LK3sqLiBw', 'https://unsplash.com/photos/Q2t78AaAz6U',300,1,3,2,'Canada','400 Peter Street','Toronto','Ontario','K3Z9H6',true,2
UNION ALL
SELECT 'Entire Appartment',
'description3','https://unsplash.com/photos/UV81E0oXXWQ', 'https://unsplash.com/photos/vviU2k3SN-s',90,1,1,2,'Canada','37 Marine Drive','Nepean','Ontario','M2B7X9',false,2;

ALTER SEQUENCE properties_id_seq RESTART WITH 1;
-----------------------------------------------RESERVATIONS------------------------------------------------------------------------------
INSERT INTO reservations(start_date,end_date,property_id,guest_id)
VALUES('2018-07-12','2018-08-04',2,1);
INSERT INTO reservations(start_date,end_date,property_id,guest_id)
VALUES('2019-12-25','2019-12-29',1,1);
INSERT INTO reservations(start_date,end_date,property_id,guest_id)
VALUES('2019-05-19','2018-07-19',3,1);
INSERT INTO reservations(start_date,end_date,property_id,guest_id)
VALUES('2017-06-05','2017-09-05',2,3);
INSERT INTO reservations(start_date,end_date,property_id,guest_id)
VALUES('2018-02-25','2018-03-15',2,3);
INSERT INTO reservations(start_date,end_date,property_id,guest_id)
VALUES('2020-07-01','2020-11-07',1,3);
ALTER SEQUENCE reservations_id_seq RESTART WITH 1;

------------------------------------------------PROPERTY---------------------------------------------------------------------------------

INSERT INTO property_reviews(rating,message,guest_id,property_id,reservation_id)
SELECT 3,'message1',1,2,1 UNION ALL
SELECT 2,'message2',1,1,2 UNION ALL
SELECT 5,'message3',1,3,3 UNION ALL
SELECT 5,'message4',3,2,4 UNION ALL
SELECT 5,'message5',3,2,5 UNION ALL
SELECT 4,'message6',3,1,6;

ALTER SEQUENCE property_reviews_id_seq RESTART WITH 1;

