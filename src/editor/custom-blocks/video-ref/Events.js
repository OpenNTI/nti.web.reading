import { EventEmitter } from 'events';

const Bus = new EventEmitter();

export const VideoDeleted = 'video-deleted';

export function subscribeTo(event, fn) {
	Bus.addListener(event, fn);

	return () => Bus.removeListener(event, fn);
}

export function emit(event, data) {
	Bus.emit(event, data);
}
