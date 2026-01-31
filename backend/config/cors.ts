export default {
  origin: ['http://localhost:3000', 'http://127.0.0.1:3000', 'https://zipo-self.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
