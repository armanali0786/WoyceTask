const router = require('express').Router();
const controller = require('../Controller//controller');


router.post('/add_employee',controller.postAddEmployee)

router.get('/show', controller.getShow);

router.get('/delete/:id', controller.getDeleteEmployee);

router.post('/edit/:id', controller.getEditEmployee);

router.post('/update/:id', controller.getUpdateEmployee);


router.get('/pagination', controller.getShow);


router.post('/seacrh', controller.getSearchEmployee);

module.exports = router;