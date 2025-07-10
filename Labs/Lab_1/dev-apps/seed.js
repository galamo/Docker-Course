const mysql = require("mysql2/promise");
const { faker } = require("@faker-js/faker");

async function fetchCustomers() {
  // Create a connection to the MySQL database
  const connection = await mysql.createConnection({
    host: "18.236.174.222", // Change to your DB host
    user: "root", // Change to your DB user
    password: "root", // Change to your DB password
    database: "northwind", // Make sure this DB exists
  });

  try {
    const [rows] = await connection.execute("SELECT * FROM customers");
    console.log("Customers:", rows);
  } catch (err) {
    console.error("Error fetching customers:", err.message);
  } finally {
    await connection.end();
  }
}

async function insertRandomCustomer() {
  const connection = await mysql.createConnection({
    host: "18.236.174.222", // Change to your DB host
    user: "root", // Change to your DB user
    password: "root", // Change to your DB password
    database: "northwind", // Make sure this DB exists
  });

  // Generate fake customer data
  const customer = {
    company: faker.company.name(),
    first_name: faker.person.fullName(),
    last_name: faker.person.jobTitle(),
  };

  const sql = `
    INSERT INTO customers 
    (company, last_name, first_name)
    VALUES (?, ?, ?)
  `;

  try {
    const [result] = await connection.execute(sql, ["a", "b", "c", "d"]);
    console.log(`✅ Inserted customer ${customer.CustomerID}`);
  } catch (err) {
    console.error("❌ Failed to insert customer:", err.message);
  } finally {
    await connection.end();
  }
}

// insertRandomCustomer();
fetchCustomers();


function generateStudents(){}
function generateCourses(){}
function gennerateGrades(){}

