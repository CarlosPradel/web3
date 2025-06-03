const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'],
  credentials: true,
}));

const onProxyReq = (proxyReq, req, res) => {
  const token = req.cookies.session;
  if (token) {
    proxyReq.setHeader('Authorization', 'Bearer ' + token);
  }
};


app.use('/webproxy', createProxyMiddleware({
  target: 'http://127.0.0.1:8000/api/',
  changeOrigin: true,
  pathRewrite: {
    '^/webproxy': '',
  },
  onProxyReq,
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log('✅ Proxy corriendo en http://localhost:3000');
});
