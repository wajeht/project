import { app } from './app';

const server = app.listen(8080, () => {
	console.log(`Server was started on http://localhost:${8080}`);
});

let isShutdownCompleted = false; // Flag to track the shutdown process

export async function gracefulShutdown() {
	console.log('***** Initiating graceful shutdown. *****');

	server.close(async (err) => {
		if (err) {
			console.error('***** Error closing the server:', err, '*****');
			process.exit(1);
		} else {
			try {
				// If you have any cleanup tasks, perform them here before exiting
				// For example, closing database connections

				console.log('***** Server closed successfully. *****');
				isShutdownCompleted = true; // Update the flag to indicate shutdown completion
				process.exit(0);
			} catch (err) {
				console.error('***** Shutdown error:', err, '*****');
				process.exit(1);
			}
		}
	});

	// Force shutdown if not completed within 30 seconds
	setTimeout(() => {
		if (!isShutdownCompleted) {
			console.error('***** Timeout: Forcefully shutting down. *****');
			process.exit(1);
		}
	}, 30000); // 30 seconds in milliseconds
}

process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('unhandledRejection', async (reason, promise) => {
	console.log('***** Unhandled Rejection at:', promise, 'reason:', reason, '*****');
	await gracefulShutdown();
});
