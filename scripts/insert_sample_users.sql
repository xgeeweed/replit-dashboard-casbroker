INSERT INTO externalusers (
    id, full_name, company_code, company_name, 
    company_type, role, tax_id, phone_number, 
    email, status
) VALUES 
('P0011538805', 'QUAYE PEARL HENRIETTA', '120100', 'ZENITH BANK (GHANA) LIMITED',
'BK', 'Bank', 'C0003167240', '0244766741', 'Pearl.Quaye@zenithbank.com.gh', 'Active'),
('P0035149760', 'ZIBLIM ABDUL-RAZAK', 'FDA', 'FOOD AND DRUGS AUTHORITY',
'MD', 'Ministries, Departments and Agencies', 'V0004956168', '0242962973', 'abdulrazakkziblim@yahoo.com', 'Active'),
('GHA7250814588', 'ZOMETI GABRIEL', 'GLNS', 'GHANA LINK NETWORK SERVICES LIMITED',
'MD', 'Ministries, Departments and Agencies', 'C0005318041', '0243053391', 'gabriel.zometi@ghanalink.com.gh', 'Active')
ON CONFLICT (id) DO NOTHING; 