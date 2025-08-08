# Online Food Ordering Application

This project is an online food ordering web application that allows customers to browse a menu and purchase food items. It is built using Node.js and EJS for templating.

## Project Structure

```
online-food-ordering
├── src
│   ├── controllers
│   │   └── foodController.js
│   ├── models
│   │   └── food.js
│   ├── routes
│   │   └── foodRoutes.js
│   ├── views
│   │   ├── index.ejs
│   │   ├── menu.ejs
│   │   └── cart.ejs
│   └── app.js
├── public
│   ├── css
│   │   └── style.css
│   └── js
│       └── main.js
├── package.json
└── README.md
```

## Features

- View a menu of food items
- Add items to a shopping cart
- Checkout process for purchasing food

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript)
- CSS for styling

## Setup Instructions

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/online-food-ordering.git
   ```

2. Navigate to the project directory:
   ```
   cd online-food-ordering
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the application:
   ```
   npm start
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Usage

- Navigate through the menu to view available food items.
- Click on items to add them to your cart.
- View your cart to see selected items and proceed to checkout.

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes. 

## License

This project is licensed under the MIT License.