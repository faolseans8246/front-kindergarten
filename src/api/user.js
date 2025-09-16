import api from "./axios";
import { unwrap } from "./unwrap";

export async function getProfile() { return unwrap(await api.get("/api/user/profile")); }
export async function getMyBlockStatus() { return unwrap(await api.get("/api/user/profile/block-status")); }
export async function getUsers() { return unwrap(await api.get("/api/user/users")); }
export async function getUserById(id) { return unwrap(await api.get(`/api/user/users/${id}`)); }
