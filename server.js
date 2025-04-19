import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3009;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({
  secret: 'lebanon-motorcycle-marketplace',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Sample motorcycles data (would be in a database in production)
const motorcycles = [
  {
    id: 1,
    title: 'Ducati Panigale V4',
    titleAr: 'دوكاتي بانيغالي V4',
    price: 25000,
    year: 2023,
    location: 'Beirut',
    locationAr: 'بيروت',
    km: 1200,
    type: 'sport',
    typeAr: 'رياضية',
    condition: 'new',
    conditionAr: 'جديدة',
    image: 'https://images.pexels.com/photos/2393816/pexels-photo-2393816.jpeg',
    description: 'Exceptional performance motorcycle with advanced electronics and racing DNA.',
    descriptionAr: 'دراجة نارية ذات أداء استثنائي مع إلكترونيات متطورة وجينات سباق.',
    seller: 'Mohammad Ali',
    contact: '+961 71 123 456'
  },
  {
    id: 2,
    title: 'Harley-Davidson Road King',
    titleAr: 'هارلي ديفيدسون رود كينج',
    price: 32000,
    year: 2022,
    location: 'Jounieh',
    locationAr: 'جونية',
    km: 3500,
    type: 'cruiser',
    typeAr: 'كروزر',
    condition: 'used',
    conditionAr: 'مستعملة',
    image: 'https://images.pexels.com/photos/1413412/pexels-photo-1413412.jpeg',
    description: 'Classic American cruiser with powerful engine and comfortable riding position.',
    descriptionAr: 'كروزر أمريكي كلاسيكي بمحرك قوي ووضعية ركوب مريحة.',
    seller: 'Jean Claude',
    contact: '+961 03 789 012'
  },
  {
    id: 3,
    title: 'Kawasaki Ninja 650',
    titleAr: 'كاواساكي نينجا 650',
    price: 12000,
    year: 2021,
    location: 'Tripoli',
    locationAr: 'طرابلس',
    km: 8000,
    type: 'sport',
    typeAr: 'رياضية',
    condition: 'used',
    conditionAr: 'مستعملة',
    image: 'https://images.pexels.com/photos/2611690/pexels-photo-2611690.jpeg',
    description: 'Perfect balance of performance and comfort for daily riding and weekend fun.',
    descriptionAr: 'توازن مثالي بين الأداء والراحة للقيادة اليومية والمتعة في عطلة نهاية الأسبوع.',
    seller: 'Ahmad Hassan',
    contact: '+961 76 345 678'
  },
  {
    id: 4,
    title: 'Honda Africa Twin',
    titleAr: 'هوندا أفريكا توين',
    price: 18500,
    year: 2022,
    location: 'Zahle',
    locationAr: 'زحلة',
    km: 5200,
    type: 'adventure',
    typeAr: 'مغامرات',
    condition: 'used',
    conditionAr: 'مستعملة',
    image: 'https://images.pexels.com/photos/2519374/pexels-photo-2519374.jpeg',
    description: 'Adventure motorcycle capable of handling any terrain with comfort and reliability.',
    descriptionAr: 'دراجة نارية للمغامرات قادرة على التعامل مع أي تضاريس براحة وموثوقية.',
    seller: 'Charbel Khoury',
    contact: '+961 81 234 567'
  },
  {
    id: 5,
    title: 'Yamaha MT-09',
    titleAr: 'ياماها MT-09',
    price: 14000,
    year: 2023,
    location: 'Sidon',
    locationAr: 'صيدا',
    km: 2100,
    type: 'naked',
    typeAr: 'نايكد',
    condition: 'new',
    conditionAr: 'جديدة',
    image: 'https://images.pexels.com/photos/163210/motorcycles-race-helmets-pilots-163210.jpeg',
    description: 'Powerful naked bike with aggressive styling and excellent handling.',
    descriptionAr: 'دراجة نايكد قوية ذات طراز هجومي ومناورة ممتازة.',
    seller: 'Samir Nasrallah',
    contact: '+961 70 987 654'
  },
  {
    id: 6,
    title: 'BMW R 1250 GS',
    titleAr: 'بي إم دبليو R 1250 GS',
    price: 28000,
    year: 2022,
    location: 'Batroun',
    locationAr: 'البترون',
    km: 9800,
    type: 'adventure',
    typeAr: 'مغامرات',
    condition: 'used',
    conditionAr: 'مستعملة',
    image: 'https://images.pexels.com/photos/2127039/pexels-photo-2127039.jpeg',
    description: 'The ultimate adventure motorcycle with premium features and unmatched reliability.',
    descriptionAr: 'دراجة المغامرات النهائية مع ميزات متميزة وموثوقية لا مثيل لها.',
    seller: 'Elie Mansour',
    contact: '+961 03 456 789'
  }
];

// Route handlers
app.get('/', (req, res) => {
  const lang = req.query.lang || 'en';
  const theme = req.query.theme || 'light';
  res.render('index', { 
    motorcycles,
    lang,
    theme,
    user: req.session.user
  });
});

app.get('/motorcycle/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const motorcycle = motorcycles.find(m => m.id === id);
  const lang = req.query.lang || 'en';
  const theme = req.query.theme || 'light';

  if (!motorcycle) {
    return res.status(404).render('404', { lang, theme });
  }

  res.render('motorcycle-detail', { 
    motorcycle,
    lang,
    theme,
    user: req.session.user
  });
});

app.get('/login', (req, res) => {
  const lang = req.query.lang || 'en';
  const theme = req.query.theme || 'light';
  res.render('login', { lang, theme });
});

app.post('/login', (req, res) => {
  // Simple mock login (would use proper authentication in production)
  req.session.user = {
    id: 1,
    name: req.body.email.split('@')[0],
    email: req.body.email
  };
  res.redirect('/');
});

app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

app.get('/register', (req, res) => {
  const lang = req.query.lang || 'en';
  const theme = req.query.theme || 'light';
  res.render('register', { lang, theme });
});

app.get('/sell', (req, res) => {
  const lang = req.query.lang || 'en';
  const theme = req.query.theme || 'light';
  
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  res.render('sell', { 
    lang, 
    theme,
    user: req.session.user
  });
});

app.get('/favorites', (req, res) => {
  const lang = req.query.lang || 'en';
  const theme = req.query.theme || 'light';
  
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  // In a real app, we'd fetch the user's saved favorites
  const favoriteMotorcycles = motorcycles.slice(0, 3);
  
  res.render('favorites', { 
    motorcycles: favoriteMotorcycles,
    lang, 
    theme,
    user: req.session.user
  });
});

app.get('/about', (req, res) => {
  const lang = req.query.lang || 'en';
  const theme = req.query.theme || 'light';
  res.render('about', { 
    lang, 
    theme,
    user: req.session.user
  });
});

app.get('/contact', (req, res) => {
  const lang = req.query.lang || 'en';
  const theme = req.query.theme || 'light';
  res.render('contact', { 
    lang, 
    theme,
    user: req.session.user
  });
});

app.use((req, res) => {
  const lang = req.query.lang || 'en';
  const theme = req.query.theme || 'light';
  res.status(404).render('404', { lang, theme });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});