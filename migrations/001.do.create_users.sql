CREATE TABLE "budget-allotments" (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    amount DECIMAL(19,4) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT now(),
    category INTEGER REFERENCES categories(id) NOT NULL
);