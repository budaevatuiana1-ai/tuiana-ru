let paused = false

export function setGlobalRafPaused(v: boolean) { paused = v }
export function isGlobalRafPaused() { return paused }
