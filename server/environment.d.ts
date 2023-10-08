declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT: string;
      DATABASE: string;
      DATABASE_PASSWORD: string;
    }
  }
}

export {};
