console.log("Meridian Worker starting...");
console.log(`Environment: ${process.env.NODE_ENV ?? "development"}`);
console.log(`Database URL: ${process.env.DATABASE_URL ? "configured" : "not configured"}`);
console.log(`Redis URL: ${process.env.REDIS_URL ? "configured" : "not configured"}`);

function startWorker() {
  console.log("Worker is ready and listening for jobs");
  console.log("Available job types: import_products, generate_descriptions, sync_erp, send_email");
  
  const interval = setInterval(() => {
    console.log(`[${new Date().toISOString()}] Worker heartbeat - no pending jobs`);
  }, 30000);

  process.on("SIGINT", () => {
    console.log("Worker shutting down gracefully...");
    clearInterval(interval);
    process.exit(0);
  });

  process.on("SIGTERM", () => {
    console.log("Worker received SIGTERM, shutting down...");
    clearInterval(interval);
    process.exit(0);
  });
}

startWorker();
