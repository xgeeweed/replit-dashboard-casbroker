import { Pool } from 'pg';

// Database connection configurations
const sourceDB = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'drivervehicle_db',
  password: 'root',
  port: 5432,
});

const targetDB = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'casbroker_db',
  password: 'root',
  port: 5432,
});

async function testConnections() {
  try {
    // Test source database connection
    console.log('Testing source database connection...');
    const sourceResult = await sourceDB.query('SELECT 1');
    console.log('Source database connection successful');
    
    // Check if drivers table exists in source
    console.log('Checking drivers table in source database...');
    const sourceDriversResult = await sourceDB.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables 
        WHERE table_schema = 'public' 
        AND table_name = 'drivers'
      );
    `);
    console.log('Drivers table exists in source:', sourceDriversResult.rows[0].exists);

    if (sourceDriversResult.rows[0].exists) {
      const driversCount = await sourceDB.query('SELECT COUNT(*) FROM drivers');
      console.log('Number of drivers in source:', driversCount.rows[0].count);
      
      // Check column names in source database
      const columnQuery = await sourceDB.query(`
        SELECT column_name 
        FROM information_schema.columns 
        WHERE table_name = 'drivers';
      `);
      console.log('Source database columns:', columnQuery.rows.map(row => row.column_name));
    }

    // Test target database connection
    console.log('Testing target database connection...');
    const targetResult = await targetDB.query('SELECT 1');
    console.log('Target database connection successful');

  } catch (error) {
    console.error('Error testing connections:', error);
    throw error;
  }
}

async function createTables() {
  try {
    console.log('Creating tables in target database...');
    
    // Create drivers table
    await targetDB.query(`
      CREATE TABLE IF NOT EXISTS "Driver" (
        japtu_id VARCHAR(255) PRIMARY KEY,
        full_name VARCHAR(255),
        phone_number VARCHAR(255),
        email VARCHAR(255),
        dob DATE,
        drivers_license_number VARCHAR(255),
        national_id VARCHAR(255),
        status VARCHAR(50),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Create externalusers table
    await targetDB.query(`
      CREATE TABLE IF NOT EXISTS "ExternalUser" (
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
    `);

    // Create vehicles table with UUID
    await targetDB.query(`
      CREATE TABLE IF NOT EXISTS "Vehicle" (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        driver_id VARCHAR(255) REFERENCES "Driver"(japtu_id),
        make VARCHAR(255),
        model VARCHAR(255),
        year INTEGER,
        color VARCHAR(50),
        license_plate VARCHAR(255),
        vin VARCHAR(255),
        insurance_provider VARCHAR(255),
        insurance_policy_number VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log('Tables created successfully');
  } catch (error) {
    console.error('Error creating tables:', error);
    throw error;
  }
}

async function syncDatabases() {
  try {
    // Test connections first
    await testConnections();

    // Create tables
    await createTables();

    // Start a transaction in target database
    await targetDB.query('BEGIN');

    // Log the current count before syncing
    const beforeCount = await targetDB.query('SELECT COUNT(*) FROM "Driver"');
    console.log('Drivers count before sync:', beforeCount.rows[0].count);

    // Sync drivers data
    console.log('Fetching drivers from source database...');
    const driversResult = await sourceDB.query(`
      SELECT 
        japtu_id,
        full_name,
        phone_number,
        email,
        dob,
        drivers_license as drivers_license_number,
        national_id,
        status,
        created_at,
        updated_at
      FROM drivers
    `);

    console.log('Found drivers in source DB:', driversResult.rows.length);

    for (const driver of driversResult.rows) {
      console.log('Processing driver:', {
        japtu_id: driver.japtu_id,
        phone_number: driver.phone_number,
        drivers_license: driver.drivers_license_number // Log license number for verification
      });
      
      await targetDB.query(`
        INSERT INTO "Driver" (
          japtu_id, full_name, phone_number, email, dob,
          drivers_license_number, national_id, status,
          created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        ON CONFLICT (japtu_id) DO UPDATE SET
          full_name = EXCLUDED.full_name,
          phone_number = EXCLUDED.phone_number,
          email = EXCLUDED.email,
          dob = EXCLUDED.dob,
          drivers_license_number = EXCLUDED.drivers_license_number,
          national_id = EXCLUDED.national_id,
          status = EXCLUDED.status,
          updated_at = EXCLUDED.updated_at
      `, [
        driver.japtu_id,
        driver.full_name,
        driver.phone_number,
        driver.email,
        driver.dob,
        driver.drivers_license_number,
        driver.national_id,
        driver.status,
        driver.created_at,
        driver.updated_at
      ]);
    }

    // Log the count after syncing drivers
    const afterDriversCount = await targetDB.query('SELECT COUNT(*) FROM "Driver"');
    console.log('Drivers count after sync:', afterDriversCount.rows[0].count);

    // Sync vehicles data
    console.log('Fetching vehicles from source database...');
    const vehiclesResult = await sourceDB.query(`
      SELECT * FROM vehicles
    `);

    console.log('Found vehicles:', vehiclesResult.rows.length);

    // Sync externalusers data
    console.log('Fetching external users from source database...');
    const externalUsersResult = await sourceDB.query(`
      SELECT 
        "UserID" as id,
        "UserName" as full_name,
        "CompanyCode" as company_code,
        "CompanyName" as company_name,
        "Company Type Code" as company_type,
        "CompanyTypeName" as role,
        "TIN" as tax_id,
        "CellPhoneNo" as phone_number,
        "Email" as email,
        "Status" as status
      FROM drivervehicle_db54.externalusers
    `);

    console.log('Found external users:', externalUsersResult.rows.length);

    // Insert external users
    for (const user of externalUsersResult.rows) {
      console.log('Processing external user:', {
        full_name: user.full_name,
        email: user.email
      });

      await targetDB.query(`
        INSERT INTO "ExternalUser" (
          id, full_name, company_code, company_name,
          company_type, role, tax_id, phone_number,
          email, status, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
        ON CONFLICT (id) DO UPDATE SET
          full_name = EXCLUDED.full_name,
          company_code = EXCLUDED.company_code,
          company_name = EXCLUDED.company_name,
          company_type = EXCLUDED.company_type,
          role = EXCLUDED.role,
          tax_id = EXCLUDED.tax_id,
          phone_number = EXCLUDED.phone_number,
          email = EXCLUDED.email,
          status = EXCLUDED.status,
          updated_at = CURRENT_TIMESTAMP
      `, [
        user.id,
        user.full_name,
        user.company_code,
        user.company_name,
        user.company_type,
        user.role,
        user.tax_id,
        user.phone_number,
        user.email,
        user.status
      ]);
    }

    // Create placeholder drivers for vehicles
    for (const vehicle of vehiclesResult.rows) {
      if (vehicle.driver_id) {
        const driverExists = await targetDB.query(`
          SELECT 1 FROM "Driver" WHERE japtu_id = $1
        `, [vehicle.driver_id]);

        if (driverExists.rows.length === 0) {
          const phoneNumber = vehicle.vehicle_owner_phone_number || '';
          console.log('Creating placeholder driver:', {
            japtu_id: vehicle.driver_id,
            name: vehicle.vehicle_owner_full_name,
            phone: phoneNumber
          });
          
          await targetDB.query(`
            INSERT INTO "Driver" (
              japtu_id, full_name, phone_number, email, dob,
              drivers_license_number, national_id, status,
              created_at, updated_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
            ON CONFLICT (japtu_id) DO NOTHING
          `, [
            vehicle.driver_id,
            vehicle.vehicle_owner_full_name || 'Placeholder Driver',
            phoneNumber,
            '',
            null,
            '',
            vehicle.vehicle_owner_national_id || '',
            'PLACEHOLDER'
          ]);
        }
      }
    }

    // Insert vehicles
    for (const vehicle of vehiclesResult.rows) {
      console.log('Processing vehicle:', {
        reg_number: vehicle.vehicle_reg_number,
        driver_id: vehicle.driver_id
      });

      await targetDB.query(`
        INSERT INTO "Vehicle" (
          driver_id, make, model, year, color,
          license_plate, vin, insurance_provider,
          insurance_policy_number, created_at, updated_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        ON CONFLICT (id) DO UPDATE SET
          driver_id = EXCLUDED.driver_id,
          make = EXCLUDED.make,
          model = EXCLUDED.model,
          year = EXCLUDED.year,
          color = EXCLUDED.color,
          license_plate = EXCLUDED.license_plate,
          vin = EXCLUDED.vin,
          insurance_provider = EXCLUDED.insurance_provider,
          insurance_policy_number = EXCLUDED.insurance_policy_number,
          updated_at = EXCLUDED.updated_at
      `, [
        vehicle.driver_id,
        vehicle.make,
        vehicle.model,
        vehicle.year,
        vehicle.color,
        vehicle.license_plate,
        vehicle.vin,
        vehicle.insurance_provider,
        vehicle.insurance_policy_number,
        vehicle.created_at,
        vehicle.updated_at
      ]);
    }

    // Final counts
    const finalDriversCount = await targetDB.query('SELECT COUNT(*) FROM "Driver"');
    const finalVehiclesCount = await targetDB.query('SELECT COUNT(*) FROM "Vehicle"');
    console.log('Final counts:', {
      drivers: finalDriversCount.rows[0].count,
      vehicles: finalVehiclesCount.rows[0].count
    });

    // Commit transaction
    await targetDB.query('COMMIT');
    console.log('Database sync completed successfully');
  } catch (error) {
    // Rollback on error
    await targetDB.query('ROLLBACK');
    console.error('Error syncing databases:', error);
    throw error;
  } finally {
    // Close connections
    await sourceDB.end();
    await targetDB.end();
  }
}

// Run the sync
syncDatabases().catch(console.error); 