create table item (
  id serial primary key,
  name text not null,
  description text
);

create function search_items(search text) returns setof item as $$
  select i.*
  from item as i 
  where position(search in i.name) > 0 or position(search in i.description) > 0
$$ language sql stable;

comment on function search_items(text) is 'Returns items containing a given search term.';

insert into item (name, description) values
('Item 1', 'Description 1'),
('Item 2', 'Description 2'),
('Item 3', 'Description 3'),
('Item 4', 'Description 4'),
('Item 5', 'Description 5'),
('Item 6', 'Description 6'),
('Item 7', 'Description 7'),
('Item 8', 'Description 8'),
('Item 9', 'Description 9'),
('Item 10', 'Description 10'),
('Item 11', 'Description 11'),
('Item 12', 'Description 12'),
('Item 13', 'Description 13'),
('Item 14', 'Description 14'),
('Item 15', 'Description 15'),
('Item 16', 'Description 16'),
('Item 17', 'Description 17'),
('Item 18', 'Description 18'),
('Item 19', 'Description 19'),
('Item 20', 'Description 20'),
('Item 21', 'Description 21'),
('Item 22', 'Description 22'),
('Item 23', 'Description 23'),
('Item 24', 'Description 24'),
('Item 25', 'Description 25'),
('Item 26', 'Description 26'),
('Item 27', 'Description 27'),
('Item 28', 'Description 28'),
('Item 29', 'Description 29'),
('Item 30', 'Description 30');