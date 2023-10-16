import vine from "@vinejs/vine";

export const registerSchema = vine.object({
	username: vine.string().minLength(4).trim(),
	name: vine.string().minLength(6).trim(),
	email: vine.string().email(),
	phone: vine.string().minLength(7).maxLength(15),
	password: vine.string().minLength(8).maxLength(32).confirmed(),
});

export const loginSchema = vine.object({
	email: vine.string().email(),
	password: vine.string().minLength(8).maxLength(32),
});
