DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT FROM pg_database WHERE datname = 'cosy') THEN
        CREATE DATABASE cosy;
    END IF;
END $$;