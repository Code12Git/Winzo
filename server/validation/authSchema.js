import vine from "@vinejs/vine";

export const registerSchema = vine.object({
	name: vine.string().minLength(6).trim(),
	phone: vine.string().minLength(7).maxLength(15),
	password: vine.string().minLength(8).maxLength(32).confirmed(),
});

export const loginSchema = vine.object({
	phone: vine.string().minLength(7).maxLength(15),
	password: vine.string().minLength(8).maxLength(32),
});

export const passwordReset = vine.object({
	phone: vine.string().minLength(7).maxLength(15),
	password: vine.string().minLength(8).maxLength(32).confirmed(),
});
