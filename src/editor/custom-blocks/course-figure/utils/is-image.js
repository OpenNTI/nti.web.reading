export default function isImage(file) {
	return /image\//i.test(file.FileMimeType);
}
