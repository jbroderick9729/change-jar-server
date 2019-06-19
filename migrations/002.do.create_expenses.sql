CREATE TABLE expenses (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    expense_name TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    modified_at TIMESTAMP NOT NULL DEFAULT now(),
    category INTEGER REFERENCES categories(id) NOT NULL 
);