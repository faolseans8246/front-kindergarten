import api from "./axios";
import { unwrap } from "./unwrap";

export async function adminCreateDirector(dto){ return unwrap(await api.post("/api/admin/directors", dto)); }
export async function adminUpdateDirector(id, dto){ return unwrap(await api.put(`/api/admin/directors/${id}`, dto)); }
export async function adminDeleteDirector(id){ return unwrap(await api.delete(`/api/admin/directors/${id}`)); }
export async function adminBlockDirector(id, reason){ return unwrap(await api.post(`/api/admin/directors/${id}/block`, reason?{reason}:null)); }
export async function adminUnblockDirector(id){ return unwrap(await api.post(`/api/admin/directors/${id}/unblock`)); }

export async function adminCreateKindergarten(dto){ return unwrap(await api.post("/api/admin/kindergartens", dto)); }
export async function adminUpdateKindergarten(id, dto){ return unwrap(await api.put(`/api/admin/kindergartens/${id}`, dto)); }
export async function adminDeleteKindergarten(id){ return unwrap(await api.delete(`/api/admin/kindergartens/${id}`)); }
export async function adminReassignDirector(kindergartenId, directorId){ return unwrap(await api.put(`/api/admin/kindergartens/${kindergartenId}/director/${directorId}`)); }
export async function adminBlockKindergarten(id, reason){ return unwrap(await api.post(`/api/admin/kindergartens/${id}/block`, reason?{reason}:null)); }
export async function adminUnblockKindergarten(id){ return unwrap(await api.post(`/api/admin/kindergartens/${id}/unblock`)); }

export async function adminStatusDirector(id){ return unwrap(await api.get(`/api/admin/status/directors/${id}`)); }
export async function adminStatusKindergarten(id){ return unwrap(await api.get(`/api/admin/status/kindergartens/${id}`)); }
export async function adminStatusGroup(id){ return unwrap(await api.get(`/api/admin/status/groups/${id}`)); }
export async function adminStatusUser(id){ return unwrap(await api.get(`/api/admin/status/users/${id}`)); }
export async function adminStatusChild(id){ return unwrap(await api.get(`/api/admin/status/children/${id}`)); }
