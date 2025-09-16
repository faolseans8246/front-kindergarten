import api from "./axios";
import { unwrap } from "./unwrap";

export async function getAllKindergartens() { return unwrap(await api.get("/api/kindergarten/get")); }
export async function getKindergartenById(id) { return unwrap(await api.get(`/api/kindergarten/get/${id}`)); }
export async function getMainKindergartens() { return unwrap(await api.get("/api/kindergarten/main")); }
export async function getBranches(parentId) { return unwrap(await api.get(`/api/kindergarten/${parentId}/branches`)); }
export async function getKindergartenBlockStatus(id) { return unwrap(await api.get(`/api/kindergarten/${id}/block-status`)); }
