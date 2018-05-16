
export const backendAddr = (() => {
    const env = process.env.STAGE_ENV
    switch (env) {
      case 'staging': return {
        sample:'https://staging.p2shop.com.cn/sample',
      };
      case 'qa': return {
        sample:'https://qa.p2shop.com.cn/sample',
      };
      case 'production': return {
        sample:'https://gateway.p2shop.com.cn/sample',
      };
      default: return {
        sample:'http://localhost:8080',
      };
    }
  })();
  