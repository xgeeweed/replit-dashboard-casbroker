CREATE TABLE IF NOT EXISTS externalusers (
    id VARCHAR(255) PRIMARY KEY,
    full_name VARCHAR(255),
    company_code VARCHAR(255),
    company_name VARCHAR(255),
    company_type VARCHAR(50),
    role VARCHAR(255),
    tax_id VARCHAR(255),
    phone_number VARCHAR(255),
    email VARCHAR(255),
    status VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 