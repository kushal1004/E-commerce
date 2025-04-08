const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

const newspapers = [
  {
    id: 1,
    title: "The Hindustan Times - 1945",
    description: "Automic Bomb against japan!'",
    image: "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2019/08/08/Pictures/_e819af1e-b99f-11e9-98cb-e738ad509720.jpg",
    price: 150,
    category: "English"
  },
  {
    id: 2,
    title: "The Times of India - 1947",
    description: "Birth of India's Freedom ",
    image: "https://images.deccanherald.com/deccanherald%2F2023-08%2Fd0709b6a-9afe-46c5-821c-0abcd30244c5%2FTOI.jpg?auto=format%2Ccompress&fmt=webp&fit=max&format=webp&q=70&w=400&dpr=2",
    price: 130,
    category: "English"
  },
  {
    id: 3,
    title: "The Statesman - 1947",
    description: "The Emergency: Unforgotten Spot in Indian History Since 1975",
    image: "https://www.thestatesman.com/wp-content/uploads/2022/06/Capture-7.png",
    price: 200,
    category: "English"
  },
  {
    id: 4,
    title: "NYT - 1969 Moon Landing",
    description: "First steps on the moon – 'Men Walk On Moon'",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIdcWlTzClXq6SsmXDHnb2v7-W93LKrt9pCA&s",
    price: 180,
    category: "English"
  },
  {
    id: 5,
    title: "Anandabazar -2020",
    description: "Covid-19",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOGbfaRTqPzucg1hVBi0TplRLfpnS7kAKjbQ&s",
    price: 150,
    category: "Bengali"
  }
];

app.get('/api/newspapers', (req, res) => {
  res.json(newspapers);
});

app.get('/api/newspapers/:id', (req, res) => {
  const newspaper = newspapers.find(n => n.id === parseInt(req.params.id));
  if (newspaper) {
    res.json(newspaper);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
});

app.get('/api/newspapers/category/:category', (req, res) => {
  const filtered = newspapers.filter(n =>
    n.category.toLowerCase() === req.params.category.toLowerCase()
  );
  res.json(filtered);
});

app.listen(PORT, () => {
  console.log(`📰 Newspaper API running at http://localhost:${PORT}`);
});
