type LogLevel = 'error' | 'warn' | 'info' | 'debug';

const LOG_LEVELS: Record<LogLevel, number> = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLevel: LogLevel = (process.env.LOG_LEVEL as LogLevel) || (process.env.NODE_ENV === 'production' ? 'info' : 'debug');

function shouldLog(level: LogLevel): boolean {
  return LOG_LEVELS[level] <= LOG_LEVELS[currentLevel];
}

function formatMessage(level: LogLevel, message: string, meta?: Record<string, unknown>): string {
  const timestamp = new Date().toISOString();
  const metaStr = meta ? ` ${JSON.stringify(meta)}` : '';
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${metaStr}`;
}

/** Strip sensitive fields from metadata before logging */
function sanitize(meta?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!meta) return undefined;
  const sensitive = ['password', 'token', 'secret', 'authorization', 'jwt_secret'];
  const cleaned = { ...meta };
  for (const key of Object.keys(cleaned)) {
    if (sensitive.some((s) => key.toLowerCase().includes(s))) {
      cleaned[key] = '[REDACTED]';
    }
  }
  return cleaned;
}

const logger = {
  error(message: string, meta?: Record<string, unknown>) {
    if (!shouldLog('error')) return;
    console.error(formatMessage('error', message, sanitize(meta)));
  },

  warn(message: string, meta?: Record<string, unknown>) {
    if (!shouldLog('warn')) return;
    console.warn(formatMessage('warn', message, sanitize(meta)));
  },

  info(message: string, meta?: Record<string, unknown>) {
    if (!shouldLog('info')) return;
    console.log(formatMessage('info', message, sanitize(meta)));
  },

  debug(message: string, meta?: Record<string, unknown>) {
    if (!shouldLog('debug')) return;
    console.log(formatMessage('debug', message, sanitize(meta)));
  },
};

export default logger;
