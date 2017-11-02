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
  "blog_post" varchar(5000) not null,
  "created" date
);

INSERT INTO "users" ("name")
VALUES ('Alex'),('Betty'),('Craig'),('Daniella');

INSERT INTO "posts" ("user_id", "title", "image_url", "blog_post", "created")
VALUES
('1', 'Cats are awesome', 'https://farm8.staticflickr.com/7142/6509910925_5d6e04628c.jpg',
'Freak human out make funny noise mow mow mow mow mow mow success now attack human wake up human for food at 4am. Freak human out make funny noise mow mow mow mow mow mow success now attack human throwup on your pillow, so give me attention or face the wrath of my claws, find empty spot in cupboard and sleep all day i can haz if it smells like fish eat as much as you wish. Attack feet pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now lie in the sink all day but use lap as chair. Shake treat bag chew on cable yet purr. A nice warm laptop for me to sit on licks paws wake up human for food at 4am. Chew on cable cat slap dog in face. Sleep meowing chowing and wowing. Thinking longingly about tuna brine eat from dog''s food go into a room to decide you didn''t want to be in there anyway so intrigued by the shower, for lick face hiss at owner, pee a lot, and meow repeatedly scratch at fence purrrrrr eat muffins and poutine until owner comes back behind the couch, for leave fur on owners clothes. Cat slap dog in face. Hunt anything that moves. ', '2017-10-31'),

('2', 'I''m more of a dog person', 'https://farm4.staticflickr.com/3373/3600836516_ab924c6729.jpg',
'Come and play. Everything''s A-OK. Friendly neighbors there that''s where we meet. Can you tell me how to get how to get to Sesame Street! Love exciting and new. Come aboard were expecting you. Love life''s sweetest reward Let it flow it floats back to you. They were four men living all together yet they were all alone. Sunday Monday Happy Days. Tuesday Wednesday Happy Days. Thursday Friday Happy Days.Saturday what a day. Groovin'' all week with you. These days are all Happy and Free. These days are all share them with me oh baby.', '2017-11-01'),

('3', 'Want to see my new cat?', 'https://farm8.staticflickr.com/7451/9997095645_82c7275849.jpg',
'If it smells like fish eat as much as you wish. Has closed eyes but still sees you. Instead of drinking water from the cat bowl, make sure to steal water from the toilet throw down all the stuff in the kitchen sniff sniff adventure always but howl on top of tall thing, or proudly present butt to human for dream about hunting birds. Have my breakfast spaghetti yarn crash against wall but walk away like nothing happened sleep on keyboard. Stare at ceiling howl on top of tall thing leave fur on owners clothes mark territory. Steal the warm chair right after you get up spill litter box, scratch at owner, destroy all furniture, especially couch, but sniff other cat''s butt and hang jaw half open thereafter. Find a way to fit in tiny box. Pushes butt to face cats go for world domination but sit in window and stare oooh, a bird, yum and licks paws inspect anything brought into the house spread kitty litter all over house yet stare at wall turn and meow stare at wall some more meow again continue staring . Wack the mini furry mouse sit in window and stare oooh, a bird, yum unwrap toilet paper sleep hunt anything that moves. Eat half my food and ask for more. Knock over christmas tree sleep on dog bed, force dog to sleep on floor pet right here, no not there, here, no fool, right here that other cat smells funny you should really give me all the treats because i smell the best and omg you finally got the right spot and i love you right now. ', '2017-10-30'),

('4', 'Dogs are awesome', 'https://farm5.staticflickr.com/4004/4451707157_15d8e883ff.jpg',
'Straight ahead and on the track now. We''re gonna make our dreams come true. Baby if you''ve ever wondered - wondered whatever became of me. I''m living on the air in Cincinnati. Cincinnati WKRP. So lets make the most of this beautiful day. Since we''re together. They call him Flipper Flipper faster than lightning. No one you see is smarter than he. Baby if you''ve ever wondered - wondered whatever became of me. I''m living on the air in Cincinnati. Cincinnati WKRP." Come and play. Everything''s A-OK. Friendly neighbors there that''s where we meet. Can you tell me how to get how to get to Sesame Street.', '2017-10-31');
