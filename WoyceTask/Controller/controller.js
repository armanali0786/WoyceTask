// INSERT USER DATA
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'employees',
  port: 3307
});

connection.connect(function (error) {
  if (error) {
    console.log(error);
  } else {
    console.log('Database Connected!');
  }
});

exports.postAddEmployee = function (req, res, next) {
  var employee_id = req.body.employee_id;
  var employee_name = req.body.employee_name;
  var email = req.body.email;
  var mobileno = req.body.mobileno;
  var address = req.body.address;
  var country = req.body.country;
  var sql = 'INSERT INTO employees (employee_id, employee_name, email, mobileno, address, country) VALUES (?, ?, ?, ?, ?, ?)';
  var values = [employee_id, employee_name, email, mobileno, address, country];
  connection.query(sql, values, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred while adding an employee.');
    } else {
      res.send('Employee Added Successfully');
    }
  });
};

// SHOW USER DATA
exports.getShow = function (req, res, next) {
  var sql = 'SELECT * FROM employees';
  connection.query(sql, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred while retrieving data.');
    } else {
      res.render('show', { users: results });
    }
  });
};

// DELETE USER DATA
exports.getDeleteEmployee = function (req, res, next) {
  var id = req.params.id;
  var sql = 'DELETE FROM employees WHERE employee_id = ?';
  connection.query(sql, id, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred while deleting an employee.');
    } else {
      res.redirect('/show');
    }
  });
};

// Edit USER DATA
exports.getEditEmployee = function (req, res, next) {
  var id = req.params.id;
  var sql = 'SELECT * FROM employees WHERE employee_id = ?';
  connection.query(sql, id, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred while retrieving employee data.');
    } else {
      res.render('edit', { users: results });
    }
  });
};

// UPDATE USER DATA
exports.getUpdateEmployee = function (req, res, next) {
  var id = req.params.id;
  var employee_id = req.body.employee_id;
  var employee_name = req.body.employee_name;
  var email = req.body.email;
  var mobileno = req.body.mobileno;
  var address = req.body.address;
  var country = req.body.country;

  var sql = 'UPDATE employees SET employee_id = ?, employee_name = ?, email = ?, mobileno = ?, address = ?, country = ? WHERE employee_id = ?';
  var values = [employee_id, employee_name, email, mobileno, address, country, id];
  
  connection.query(sql, values, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500).send('An error occurred while updating the employee.');
    } else {
      res.send('Employee Updated Successfully');
    }
  });
};



exports.getShow = function (req, res, next) {
    const page = req.query.page || 1; // Get the requested page from the query parameters
    const limit = 10; // Number of results per page
    const offset = (page - 1) * limit; // Calculate the offset for pagination
  
    // Retrieve paginated employee data from the database
    const sql = 'SELECT * FROM employees LIMIT ? OFFSET ?';
    const values = [limit, offset];
    connection.query(sql, values, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred while retrieving data.');
      } else {
        res.render('show', { users: results });
      }
    });
  };
  
  // SEARCH USER DATA
  exports.getSearchEmployee = function (req, res, next) {
    const searchTerm = req.query.q || ''; 
    // Search for employees matching the search term
    const sql = 'SELECT * FROM employees WHERE employee_name LIKE ?';
    const searchTermWithWildcard = '%' + searchTerm + '%';
    const values = [searchTermWithWildcard];
    connection.query(sql, values, function (err, results) {
      if (err) {
        console.log(err);
        res.status(500).send('An error occurred while searching for employees.');
      } else {
        res.render('search', { users: results, searchTerm: searchTerm });
      }
    });
  };
  