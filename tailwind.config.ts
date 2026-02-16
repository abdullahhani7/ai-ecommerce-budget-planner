import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    // المسارات الافتراضية لـ Next.js
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    
    // أضفنا هذا المسار خصيصاً لأن ملفاتك داخل مجلد يبدأ بـ _
    "./app/_components/**/*.{js,ts,jsx,tsx,mdx}",
    
    // في حال كنت تستخدم مجلد src
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // يمكنك إضافة ألوانك الخاصة هنا لاحقاً
      colors: {
        primary: "#ffcc00",
      },
    },
  },
  plugins: [],
};

export default config;