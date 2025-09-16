import api from "./axios";
import { unwrap } from "./unwrap";

export async function getGroups(){ return unwrap(await api.get("/api/groups")); }
export async function getGroupById(id){ return unwrap(await api.get(`/api/groups/${id}`)); }
