const baseUrl=
process.env.NODE_ENV === "production"
? `hrrps://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
: `${process.env.NEXT_PUBLIC_BASE_URL}`;

export default baseUrl;