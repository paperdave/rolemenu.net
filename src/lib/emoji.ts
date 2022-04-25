const EMOJI_CDN_BASE = `https://twemoji.maxcdn.com/v/latest`;

export function getEmojiImageURL(char: string) {
	const codePoint = char.codePointAt(0).toString(16);
	const url = `${EMOJI_CDN_BASE}/svg/${codePoint}.svg`;
	return url;
}
