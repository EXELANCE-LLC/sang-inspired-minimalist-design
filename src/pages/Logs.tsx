import Navigation from "@/components/Navigation";

const Logs = () => {
  const logEntries = [
    {
      date: "2024-01-15",
      title: "Starting a new journey",
      content: "Today marks the beginning of something beautiful. Excited to share my thoughts and experiences here."
    },
    {
      date: "2024-01-10", 
      title: "Design inspiration",
      content: "Found some amazing minimalist design patterns that really speak to me. Sometimes less truly is more."
    },
    {
      date: "2024-01-05",
      title: "Hello world",
      content: "First entry in this space. Looking forward to documenting the creative process and sharing insights."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Navigation />
      
      <main className="pt-32 pb-16 px-8">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-light text-foreground mb-12 text-center">
            Logs
          </h1>
          
          <div className="space-y-8">
            {logEntries.map((entry, index) => (
              <article 
                key={index}
                className="bg-card rounded-2xl p-8 shadow-soft hover-float"
              >
                <div className="flex items-center mb-4">
                  <time className="text-sm text-muted-foreground bg-muted px-3 py-1 rounded-full">
                    {entry.date}
                  </time>
                </div>
                
                <h2 className="text-xl font-medium mb-4 text-foreground">
                  {entry.title}
                </h2>
                
                <p className="text-muted-foreground leading-relaxed">
                  {entry.content}
                </p>
              </article>
            ))}
          </div>
        </div>
      </main>
      
      <footer className="text-center pb-8">
        <p className="text-sm text-muted-foreground">
          © 2024 — Made with love
        </p>
      </footer>
    </div>
  );
};

export default Logs;