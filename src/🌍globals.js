import { createLogger, gradients, LogLevel } from "elysiatech/logger";
import { LOGGER_NAME } from "./🔒constants";
import { ASSERT as _ASSERT } from "elysiatech/asserts";
import { EventQueue, EventQueueMode } from "elysiatech/events";
import { run as _run } from "elysiatech/errors";

export const _LOGGER = createLogger(LOGGER_NAME, {
	color: gradients.sunset,
	level: LogLevel.Debug,
});

const _eventQueue = new EventQueue;
_eventQueue.mode = EventQueueMode.Immediate;

globalThis.LogLevel = LogLevel;
globalThis.LOGGER = _LOGGER
globalThis.ASSERT = _ASSERT
globalThis.Events = _eventQueue;
globalThis.run = _run;
