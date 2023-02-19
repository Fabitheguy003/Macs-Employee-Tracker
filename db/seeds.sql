INSERT INTO department (name)
VALUES ("Information technology"),
       ("Marketing"),
       ("Finance"),
       ("Sales"),
       ("Business"),
       ("Human Resource");

INSERT INTO role (title, salary, department_id) 
VALUES  ('Project manager', 86333, 5),
        ('Recruiting agent', 60939 , 6),
        ('Accountant', 70000, 2),
        ('Programmer', 112000, 1),
        ('Software developer', 100000, 1),
        ('Marketer', 90000, 2),
        ('Cashier', 50000, 4),
        ('Insurance agent', 100000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Fabien', 'Acina', 1, NULL),
        ('Lebron', 'James', 2, 1),
        ('Jordan', 'pool', 3, NULL),
        ('Jokic', 'Nikola', 4, 3),
        ('John', 'Smith', 5, NULL),
        ('Stephen', 'Curry', 6, 5),
        ('Blessing', 'Clements', 7, NULL),
        ('Jane', 'Doe', 8, 7),
        ('David', 'Goggling', 9, NULL);
