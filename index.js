const express= require('express');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello from Node.js shubham app!');
});

app.get('/product', (req, res) => {
  res.json({
    products: [
      {
        id: '1',
        name: 'Julian',
        price: 5
      },{
      id: '2',
        name: 'Julian',
        price: 2
      }
    ]
  })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
