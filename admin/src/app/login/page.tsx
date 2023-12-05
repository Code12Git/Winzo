"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { publicRequest } from "@/helpers/axios";
import { AuthError, Login } from "@/types/types";

function Login() {
	const router = useRouter();
	const [credentials, setCredentials] = useState<Login>({
		email: "",
		password: "",
	});
	const [errors, setErrors] = useState<AuthError>({});

	useEffect(() => {
		const userString = localStorage.getItem("user");
		const tokenString = localStorage.getItem("token");

		if (userString && tokenString) {
			const user = JSON.parse(userString);
			const token = JSON.parse(tokenString);
			if (user.user.Role === "SuperAdmin" && token) {
				router.push("/");
			}
		}
	}, [router]);

	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setCredentials((prev) => ({ ...prev, [name]: value }));
	};

	const loginHandler = async (
		e: React.MouseEvent<HTMLButtonElement, MouseEvent>
	) => {
		e.preventDefault();
		try {
			const response = await publicRequest.post("/auth/login", credentials);
			const admin = response.data.user.Role;

			if (typeof window !== "undefined") {
				localStorage.setItem("user", JSON.stringify(response.data));
				localStorage.setItem("token", JSON.stringify(response.data.token));
			}

			const userName = response.data.user.name;

			if (admin === "SuperAdmin") {
				toast.success(`Welcome Back, ${userName}!`);
				router.push("/");
				if (typeof window !== "undefined") {
					window.location.reload();
				}
			} else {
				router.push("/login");
				toast.error("You are not allowed to access this page");
			}
		} catch (err: any) {
			const inputerror = err.response.data.errors;
			const error = err.response.data.message;
			toast.error(error);
			setErrors(inputerror);
		}
	};

	return (
		<section className="p-10 mt-24">
			<Toaster />
			<div className="grid grid-cols-1 lg:grid-cols-2">
				<div className="relative flex items-end px-4 pb-10 pt-60 sm:px-6 sm:pb-16 md:justify-center lg:px-8 lg:pb-24">
					<div className="absolute inset-0">
						<Image
							className="h-full w-full rounded-md object-cover object-top"
							src="/assets/login/login.avif"
							alt=""
							width={600}
							height={600}
						/>
					</div>
					<div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
					<div className="relative">
						<div className="w-full max-w-xl xl:mx-auto xl:w-full xl:max-w-xl xl:pr-24">
							<h3 className="text-4xl font-bold text-white flex justify-center">
								Bet Master{" "}
							</h3>
							<ul className="mt-10 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
								<li className="flex items-center space-x-3">
									<div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
										<svg
											className="h-3.5 w-3.5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											></path>
										</svg>
									</div>
									<span className="text-lg font-medium text-white">
										{" "}
										Commercial License{" "}
									</span>
								</li>
								<li className="flex items-center space-x-3">
									<div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
										<svg
											className="h-3.5 w-3.5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											></path>
										</svg>
									</div>
									<span className="text-lg font-medium text-white">
										{" "}
										Unlimited Exports{" "}
									</span>
								</li>
								<li className="flex items-center space-x-3">
									<div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
										<svg
											className="h-3.5 w-3.5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											></path>
										</svg>
									</div>
									<span className="text-lg font-medium text-white">
										{" "}
										120+ Coded Blocks{" "}
									</span>
								</li>
								<li className="flex items-center space-x-3">
									<div className="inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500">
										<svg
											className="h-3.5 w-3.5 text-white"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
											fill="currentColor"
										>
											<path
												fillRule="evenodd"
												d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
												clipRule="evenodd"
											></path>
										</svg>
									</div>
									<span className="text-lg font-medium text-white">
										{" "}
										Design Files Included{" "}
									</span>
								</li>
							</ul>
						</div>
					</div>
				</div>
				<div className="flex items-center justify-center px-4 py-10 sm:px-6 sm:py-16 lg:px-8 lg:py-24">
					<div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
						<h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">
							Admin
						</h2>

						<form action="#" method="POST" className="mt-8">
							<div className="space-y-5">
								<div>
									<label
										htmlFor=""
										className="text-base font-medium text-gray-900"
									>
										{" "}
										Email address{" "}
									</label>
									<div className="mt-2">
										<input
											className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
											type="email"
											name="email"
											value={credentials.email}
											onChange={changeHandler}
											placeholder="Email"
										></input>
									</div>
									{errors?.email && (
										<p className="text-red-700">{errors.email}</p>
									)}
								</div>
								<div>
									<div className="flex items-center justify-between">
										<label
											htmlFor=""
											className="text-base font-medium text-gray-900"
										>
											{" "}
											Password{" "}
										</label>
										<a
											href="#"
											title=""
											className="text-sm font-semibold text-black hover:underline"
										>
											{" "}
											Forgot password?{" "}
										</a>
									</div>
									<div className="mt-2">
										<input
											className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
											type="password"
											name="password"
											value={credentials.password}
											onChange={changeHandler}
											placeholder="Password"
										></input>
									</div>
									{errors?.password && (
										<p className="text-red-700">{errors.password}</p>
									)}
								</div>
								<div>
									<button
										type="button"
										onClick={loginHandler}
										className="inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white hover:bg-black/80"
									>
										Login <ArrowRight className="ml-2" size={16} />
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
export default Login;
