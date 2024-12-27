export default function Hero() {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Discover the Best AI Tools
        </h1>
        <p className="text-xl mb-8 text-blue-100">
          Explore our curated collection of AI-powered tools to enhance your workflow
        </p>
        <div className="flex justify-center gap-8 text-center">
          <div>
            <div className="text-3xl font-bold">100+</div>
            <div className="text-blue-100">AI Tools</div>
          </div>
          <div>
            <div className="text-3xl font-bold">10+</div>
            <div className="text-blue-100">Categories</div>
          </div>
          <div>
            <div className="text-3xl font-bold">1000+</div>
            <div className="text-blue-100">Monthly Users</div>
          </div>
        </div>
      </div>
    </div>
  );
} 