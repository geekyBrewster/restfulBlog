CREATE DATABASE "restfulblog";

CREATE TABLE "users" (
  "id" serial primary key,
  "name" varchar(120) not null
);

CREATE TABLE "posts" (
  "id" serial primary key,
  "user_id" int references 'users',
  "title" varchar(100) not null,
  "image_url" varchar(200) not null,
  "blog_post" varchar(500) not null,
  "created" date
);

INSERT INTO "users" ("name")
VALUES ('Alex'),('Betty'),('Craig'),('Daniella');

INSERT INTO "posts" ("user_id", "title", "image_url", "blog_post", "created")
VALUES
('1', 'Cats are awesome', 'https://farm8.staticflickr.com/7142/6509910925_5d6e04628c.jpg',
'This is my first blog post on cats. I really like cats but I''m not great at blogging.', '2017-10-31'),
('2', 'I''m more of a dog person', 'https://farm4.staticflickr.com/3373/3600836516_ab924c6729.jpg',
'While I''ve got nothing against cats, I prefer dogs. Cats don''t listen to you.', '2017-11-01'),
('3', 'Want to see my new cat?', 'https://farm8.staticflickr.com/7451/9997095645_82c7275849.jpg',
'This is George, and I just adopted him. He''s super chill.', '2017-10-30'),
('4', 'Dogs are awesome', 'https://farm5.staticflickr.com/4004/4451707157_15d8e883ff.jpg',
'We really don''t deserve dogs. They are so fluffy!', '2017-10-31');
