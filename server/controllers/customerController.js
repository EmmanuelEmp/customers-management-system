const Customer = require('../models/Customer');
const mongoose = require('mongoose');

/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
    const messages = await req.consumeFlash('info');
    const message = await req.consumeFlash('msg');
    const locals = {
        title: 'Nodejs',
        description: 'Free Nodejs User Management System '
    }
    let perPage = 12;
    let page = req.query.page || 1; 
    try{
        const customers = await Customer.aggregate([ {$sort: {updatedAt:   1} } ])
         .skip(perPage * page - perPage)
         .limit(perPage)
         .exec();
        const count = await Customer.count();

        res.render('index', {locals, 
            customers, 
            current: page,
            pages: Math.ceil(count / perPage),
            messages,
            message
        }); 
    } catch (error) {
        console.log(error);
    }
}



// exports.homepage = async (req, res) => {
//         const messages = await req.consumeFlash('info');
//         const locals = {
//             title: 'Nodejs',
//             description: 'Free Nodejs User Management System '
//         }

//         try{
//             const customers = await Customer.find({}).limit(22);
//             res.render('index', {locals, messages, customers}); 
//         } catch (error) {
//             console.log(error);
//         }
// }
 
/**
 * GET/ 
 * New Customer Form
 */

exports.about = async (req, res) => {
        const locals = {
            title: 'About',
            description: 'Free Nodejs User Management System '
        }

        try{
            res.render('about', locals); 
        } catch (error) {
            console.log(error);
        }
}

/**
 * GET/ 
 * New Customer Form
 */

exports.addCustomer = async (req, res) => {

    const locals = {
        title: ' Add New Customer - Nodejs',
        description: 'Free Nodejs User Management System '
    }

    try {
        await Customer.insertMany([
          {
            firstName: "Raddy",
            lastName: "NodeJs",
            tel: "1-353-218-4881",
            email: "raddy@outlook.couk",
            details: "Demo details text.",
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          {
            firstName: "Aphrodite",
            lastName: "Parker",
            tel: "1-857-407-8574",
            email: "quam@protonmail.net",
            details: "Demo details text.",
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          {
            firstName: "Camden",
            lastName: "Perce",
            tel: "(251) 719-5886",
            email: "aliquam.tincidunt.nunc@icloud.net",
            details: "Demo details text.",
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          {
            firstName: "Emi",
            lastName: "Hutchinson",
            tel: "1-878-674-6876",
            email: "aenean.egestas@aol.org",
            details: "Demo details text.",
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          {
            firstName: "Harding",
            lastName: "Cameron",
            tel: "1-935-750-3637",
            email: "non.nisi@outlook.edu",
            details: "Demo details text.",
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          {
            firstName: "Dane",
            lastName: "Kelley",
            tel: "(129) 964-3195",
            email: "morbi@aol.org",
            details: "Demo details text.",
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          {
            firstName: "Emery",
            lastName: "Thornton",
            tel: "(565) 248-4784",
            email: "egestas.blandit.nam@icloud.org",
            details: "Demo details text.",
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          {
            firstName: "Tarik",
            lastName: "Francis",
            tel: "1-679-436-4746",
            email: "lacus@outlook.ca",
            details: "Demo details text.",
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
                {
            firstName: "Rebecca",
            lastName: "Booth",
            tel: "1-548-944-3232",
            email: "sapien@icloud.couk",
            details: "Demo details text.",
            createdAt: Date.now(),
            updatedAt: Date.now()
          },
          {
            firstName: "Solomon",
            lastName: "Larson",
            tel: "(648) 588-4779",
            email: "accumsan.interdum@icloud.net",
            details: "Demo details text.",
            createdAt: Date.now(),
            updatedAt: Date.now()
          }
        ]);
    } catch (error) {
        console.log("err", + error);
    }

    res.render('customer/add', locals)

}

/**
 * POST
 * Create New Customer
 */

exports.postCustomer = async (req, res) => {
    console.log(req.body)

    const newCustomer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        details: req.body.details,
        tel: req.body.tel,   
        email: req.body.email 
    });

    try {
        await Customer.create(newCustomer);
        await req.flash('info', 'New customer has been added')
        res.redirect('/'); 
    } catch (error) {
        console.log(error); 
    }
};

/**
 * GET
 * Customer Data
 */

exports.view = async (req, res) => {

    try {
        const customer =await Customer.findOne({_id: req.params.id})  
    
        const locals = {
            title: 'View Customer',
            description: 'Free Nodejs User Management System '
        };
        res.render('customer/view', {
        locals,
        customer });
    
    } catch (error) {
        console.log(error)
    }
}

/**
 * POST
 * EDIT CUSTOMER
 */
exports.edit = async (req, res) => {

  try {
      const customer =await Customer.findOne({_id: req.params.id})  
  
      const locals = {
          title: 'Edit Customer data ',
          description: 'Free Nodejs User Management System '
      };
      res.render('customer/edit', {
      locals,
      customer });
  
  } catch (error) {
      console.log(error)
  }
} 
/**
 * PUT
 * Update customer
 */
exports.editPost = async (req, res) => {
  try {
    const customer = await Customer.findByIdAndUpdate(req.params.id,{
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        tel: req.body.tel,
        email: req.body.email,
        updatedAt: Date.now()
    })
    res.redirect(`/edit/${req.params.id}`);
    console.log('redirected');
}  catch (error) {
    console.log(error)
} 
}

/**
 * DELETE
 * Delete customer
 */
exports.deleteCustomer = async (req, res) => {
  try {
    await req.flash('msg', 'Customer has been deleted')
    await Customer.deleteOne({ _id: req.params.id})
    res.redirect("/")
  } catch (error) {
    console.log(error)
  }
}

/**
 * GET /
 * Search customer
 */
exports.searchCustomers = async (req, res) => {

  const locals = {
    title: 'Search Customer Data',
    description: 'Free Nodejs User Management System '
}; 
  try {
    let searchTerm = req.body.searchTerm;
    const searchNoSpecialChar = searchTerm.replace(/[^a-zA-Z0-9]/g, "")
    const customers = await Customer.find({
      $or: [
          { firstName: { $regex: new RegExp(searchNoSpecialChar, "i")}},
          { lastName: { $regex: new RegExp(searchNoSpecialChar, "i")}},
      ]
    });
    res.render("search", {
      customers,
      locals
    })
  } catch (error) {
    console.log(error); 
  }
   
}